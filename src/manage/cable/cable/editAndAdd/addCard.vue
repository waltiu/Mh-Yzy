<template>
  <!-- 用来CURD多个项目 - 侧栏 -->
  <!--
    // 只监视一个, 请执行add/remove 时候先执行lines, 在执行list 操作.
    // eg:
    // this.$delete(this.lines, index) // lines 移除
    // this.$delete(this.list, index)
  -->
  <div>
    <el-card
      class="box-card unselectable"
      style="padding:  0px; margin-top: 10px;margin-left: 15px"
    >
      <div>
        <!-- 注释旧的自动敷设代码 -->
        <!-- <el-switch style="display: block" v-model="autoModeling" active-color="#409eff" inactive-color="#13ce66" active-text="自动敷设" inactive-text="手动敷设">
        </el-switch>-->
      </div>

      <div style="margin-top: 10px;">
        <el-alert
          v-if="!autoModeling"
          :title="$t('cable.start')"
          type="warning"
          show-icon
          :closable="false"
        ></el-alert>
        <el-alert
          v-if="autoModeling"
          :title="$t('cable.end')"
          type="warning"
          show-icon
          :closable="false"
        ></el-alert>

        <!-- 自动敷设 -->
        <!-- 起始终止井 -->
        <el-card shadow="never" style="margin-top: 10px;" v-show="autoModeling">
          <div>
            {{$t('cable.startingDevice')}}: {{ !_.isEmpty(autoModelingList.deviceStart) ? autoModelingList.deviceStart.name : $t('cable.notSelected') }}
            <el-button
              :disabled="_.isEmpty(autoModelingList.deviceStart)"
              type="danger"
              style="float: right;"
              size="mini"
              icon="el-icon-delete"
              circle
              v-on:click.stop="() => {autoModelingList.deviceStart = {}}"
            ></el-button>
          </div>

          <div style="margin-top: 10px;">
            {{$t('cable.endDevice')}}: {{ !_.isEmpty(autoModelingList.deviceEnd) ? autoModelingList.deviceEnd.name : $t('cable.notSelected') }}
            <el-button
              :disabled="_.isEmpty(autoModelingList.deviceEnd)"
              type="danger"
              style="float: right;"
              size="mini"
              icon="el-icon-delete"
              circle
              v-on:click.stop="() => {autoModelingList.deviceEnd = {}}"
            ></el-button>
          </div>

          <div style="margin-top: 10px;">
            {{$t('cable.startingCarrier')}}: {{ !_.isEmpty(autoModelingList.layingStart) ? autoModelingList.layingStart.name : '未选择' }}
            <el-button
              :disabled="_.isEmpty(autoModelingList.layingStart)"
              type="danger"
              style="float: right;"
              size="mini"
              icon="el-icon-delete"
              circle
              v-on:click.stop="() => {autoModelingList.layingStart = {}}"
            ></el-button>
          </div>

          <div style="margin-top: 10px;">
            {{$t('cable.endCarrier')}}: {{ !_.isEmpty(autoModelingList.layingEnd) ? autoModelingList.layingEnd.name : '未选择' }}
            <el-button
              :disabled="_.isEmpty(autoModelingList.layingEnd)"
              type="danger"
              style="float: right;"
              size="mini"
              icon="el-icon-delete"
              circle
              v-on:click.stop="() => {autoModelingList.layingEnd = {}}"
            ></el-button>
          </div>

          <el-button
            :disabled="_.isEmpty(autoModelingList.layingEnd) || _.isEmpty(autoModelingList.layingEnd)"
            style="margin-top: 10px;"
            type="primary"
            size="small"
            :loading="getAutoModelingListStatus"
            @click="() => {list = [];getAutoModelingList()}"
          >{{$t('cable.startLaying')}}</el-button>
        </el-card>

        <SlickList axis="y" v-model="list" :useDragHandle="true">
          <SlickItem
            style="z-index: 10000"
            v-for="(item, index) in list"
            :index="index"
            :key="index"
          >
            <el-card class="box-card" style="margin-top: 5px;">
              <i v-handle class="el-icon-menu" style="margin-right: 5px;"></i>

              <div v-if="Array.isArray(item)">
                <div v-for="(a, index) of item" :key="index">{{ $t(a.name) }}</div>

                <el-button
                  type="danger"
                  style="float: right;margin-bottom: 10px;"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  v-on:click.stop="remove(index)"
                ></el-button>
              </div>

              <div v-else>
                {{ item.name }}
                <el-button
                  v-if="index === list.length - 1 && autoModeling"
                  type="primary"
                  size="mini"
                  icon="el-icon-arrow-right"
                  :loading="getAutoModelingListStatus"
                  circle
                  @click="() => {getAutoModelingList(item.id)}"
                ></el-button>

                <el-button
                  type="danger"
                  style="float: right;"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  v-on:click.stop="remove(index)"
                ></el-button>

                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  style="float: right;margin-right: 10px;"
                  circle
                  v-on:click.stop="() => {edit = {info: list[index], index: index}}"
                ></el-button>
              </div>
            </el-card>
          </SlickItem>
        </SlickList>
      </div>
    </el-card>
    <line-setting :info="editInfo" @addLine="addLine" @editLine="editLine"></line-setting>

    <select-point
      :lines="list"
      :info="editInfo"
      :autoModelingList="autoModelingList"
      @returnData="bindInfo"
      @selectStartEndPoint="(a) => {autoModelingList = a}"
    ></select-point>
  </div>
</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import lineSetting from './lineSetting.vue'
import selectPoint from './selectPoint'

export default {
  directives: { handle: HandleDirective },
  name: 'addCard',
  props: {
    info: Object
  },
  components: {
    selectPoint,
    SlickItem,
    SlickList,
    lineSetting
  },
  data () {
    return {
      backUpData: {},
      getAutoModelingListStatus: false,
      autoModeling: false,
      autoModelingList: { layingStart: {}, layingEnd: {}, deviceStart: {}, deviceEnd: {} },
      list: [],
      edit: {}
    }
  },
  computed: {
    editInfo: function () {
      if (!this._.isEmpty(this.edit)) {
        return { ...this.edit, type: 'edit' }
      } else {
        if (!this._.isEmpty(this.$store.state.infoMap.laying)) {
          let tmp = { ...this.$store.state.infoMap.laying }
          this.$store.commit('setLaying', {})

          if (this.autoModeling) {
            return { info: tmp, type: 'autoModeling' }
          } else {
            return { info: tmp, type: 'add' }
          }
        }
      }
      return {}
    }
  },
  watch: {
    autoModelingList: function () {
      this.$emit('returnData', {
        lines: { lines: this.list },
        surplusInfo: { info: this.list },
        autoModelingList: this.autoModelingList
      })
    },
    autoModeling: function (newVal) {
      if (newVal) {
        this.list = []
      } else {
        let tmp = this._.cloneDeep(this.backUpData)
        this.list = tmp.surplusInfo ? tmp.surplusInfo.info : []
      }
    },
    info: function (newVal) {
      if (this._.isEmpty(this.backUpData)) {
        this.backUpData = this._.cloneDeep(newVal)
      }
      this.list = newVal.surplusInfo ? newVal.surplusInfo.info : []
    },
    list: function () {
      this.$emit('returnData', {
        lines: { lines: this.list },
        surplusInfo: { info: this.list },
        autoModelingList: this.autoModelingList
      })
    }
  },
  methods: {
    bindInfo (info) {
      this.$set(this.list, info.index, info.info)
      // 检查list里是否包含终止点。 如果包含终止点, 停止敷设
      // 检查列表是否包含Array, 如果不包含执行下一步两个点请求
      let includeStatus = false
      for (const iterator of this.list) {
        if (Array.isArray(iterator)) {
          includeStatus = true
        }
      }
      if (!includeStatus && this.list[this.list.length - 1] && this.autoModeling) {
        this.getAutoModelingList(this.list[this.list.length - 1].id, undefined, this.list[this.list.length - 2].id)
      }
    },
    getAutoModelingList (start = this.autoModelingList.layingStart.id, end = this.autoModelingList.layingEnd.id, last) {
      this.getAutoModelingListStatus = true
      this.$api.get({
        url: '/api/ldsysPoints/search/findLinkPointPath',
        args: {
          startId: start,
          endId: end,
          lastId: last
        }
      }, (a) => {
        this.getAutoModelingListStatus = false
        let tmp = []
        for (const [index, iterator] of a.data.entries()) {
          if (index === 0 && this._.isObject(this.list[this.list.length - 1]) && !Array.isArray(this.list[this.list.length - 1])) {
            if (iterator[0].id === this.list[this.list.length - 1].id) {
              continue
            }
          }
          if (iterator.length === 1) {
            tmp.push(iterator[0])
          }
          if (iterator.length > 1) {
            tmp.push(iterator)
          }
        }

        for (const [index, iterator] of tmp.entries()) {
          if (Array.isArray(iterator)) {
            for (const item of iterator) {
              if (item.id === this.autoModelingList.layingEnd.id) {
                this.$set(tmp, index, this.autoModelingList.layingEnd)
                this.$set(tmp, index, this.autoModelingList.layingEnd)
                break
              }
            }
          }
        }

        this.list = [...this.list, ...tmp]
      })
    },
    editLine (a) {
      this.$set(this.list, a.index, a.info)
    },
    addLine (a) {
      this.list.push(a.line)
    },
    remove (index) {
      // 删除 敷设 信息
      this.$delete(this.list, index)
    }
  }
}
</script>
