<template>
  <!-- 大型筛选工具, 包含搜索 -->
  <div>
    <div>
      <slot name="button" :bindData="bindData">
        <div style="display: grid;">
          <div style="display: flex;">
            <el-button
              v-if="!onlyDisplay"
              @click="bindData(selected)"
              size="small"
              type="primary"
              style="margin-right: 15px; width: 100px"
            >{{$t('main.selection')}}</el-button>

            <div
              v-if="_.isEmpty(config.display(selected || []))"
              style="margin-top: 4px;"
            >{{$t('main.empty')}}</div>
          </div>

          <div>
            <div v-for="(item, index) in config.display(selected || [])" :key="index">
              <el-tag
                size="medium"
                :closable="!onlyDisplay"
                @close="deleteInfo(index)"
                style="margin-right: 10px; margin-top: 10px;"
              >{{ item }}</el-tag>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <dialog-page
      :info="renderList"
      width="60%"
      :title="$t(title)"
      top="20vh"
      @ok="submit"
      @returnStatus="(status) => {modalreturnStatus = status}"
    >
      <div>
        <el-input
          :placeholder="$t(searchPlaceholder)"
          prefix-icon="el-icon-search"
          v-model="search"
        ></el-input>
      </div>

      <div style="height: 300px; overflow-y: auto;">
        <el-checkbox-group
          :max="max"
          v-model="checkList"
          style="margin-top: 50px; margin-bottom: 20px;"
        >
          <div v-for="(item, index) in renderList" :key="index">
            <el-checkbox
              size="medium"
              :label="$t(item.name)"
              v-if="_.isObject(item)"
              style="display: flex; margin-left: 0px; margin-bottom: 10px;"
            ></el-checkbox>
            <div v-else>{{ item }}</div>
          </div>
        </el-checkbox-group>
      </div>

      <div slot="footer-add" style="margin-right: 10px;">
        <el-button v-if="selectAll" @click="() => {bindAll([])}">{{$t('manage.selectAll')}}</el-button>

        <el-button @click="() => {bindData([])}">{{$t('manage.clearSelected')}}</el-button>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import {
  mapActions as mapSearchActions,
  mapGetters as mapSearchGetters,
  getterTypes,
  actionTypes
} from 'vuex-search'

export default {
  name: 'bigSelectDown',
  props: {
    selectAll: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 1
    },
    onlyDisplay: {
      default: false,
      type: Boolean
    },
    config: Object,
    selected: null,
    title: {
      type: String,
      default: 'infoMap.choice'
    },
    searchPlaceholder: {
      default: 'manage.enterToSearch',
      type: String
    },
    list: Array // 目标列表
  },
  data () {
    return {
      modalreturnStatus: false,
      search: '',
      checkList: [],
      renderList: []
    }
  },
  watch: {
    search: {
      handler: function (newVal) {
        this.searchContacts(newVal)
      }
    },
    list: {
      handler: function (list) {
        this.$store.commit('setTransferSystemList', list)
      }
    },
    resultIds: function (ids) {
      if (!this.modalreturnStatus) return
      let tmp = this.list.filter(item => ids.includes(item.id))
      if (!String(tmp)) {
        tmp = [this.$i18n.t('main.empty')]
      }
      this.renderList = tmp
    }
  },
  methods: {
    bindAll () {
      if (!this._.isEmpty(this.checkList)) {
        this.checkList = []
      } else {
        this.checkList = this.renderList.map(item => item.name)
      }
    },
    bindData (selected = this.selected) {
      if (!this.list && this._.isEmpty(this.list)) {
        this.renderList = [this.$i18n.t('main.empty')]
      } else {
        this.renderList = [...this.list]
      }
      this.checkList = this._.cloneDeep(this.config.display(selected))
    },
    submit () {
      this.$emit('returnData', this.config.result(this.checkList))
    },
    deleteInfo (index) {
      this.$delete(this.checkList, index)
      this.submit()
    },
    ...mapSearchActions('transferSystem', {
      searchContacts: actionTypes.search
    })
  },
  computed: {
    ...mapSearchGetters('transferSystem', {
      resultIds: getterTypes.result,
      isLoading: getterTypes.isSearching
    })
  }
}
</script>

<style scoped>
.el-tag {
  display: inline-table;
  white-space: initial;
}
</style>
