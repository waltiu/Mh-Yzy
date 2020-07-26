<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="$t(titleType) + (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))"
      :info="tableData"
      @close="$emit('close')"
    >
      <div v-loading="loading">
        <el-tabs value="info">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <edit-add-info
              :disableArray="disableArray"
              @returnData="(e) => {fullData = e}"
              :columns="columns"
              :tableData="fullData"
            >
              <div slot="ldsysOpticalCrossConnect">
                <odf-auto-compent :fullData="fullData" @returnData="bindData"></odf-auto-compent>
              </div>

              <div slot="baCity" slot-scope="data">
                <select-canton
                  :city.sync="data.fullData.baCity"
                  :country.sync="data.fullData.baCountry"
                  :province.sync="data.fullData.baProvince"
                ></select-canton>
              </div>

              <div slot="baProvince"></div>

              <div slot="baCountry"></div>
            </edit-add-info>
          </el-tab-pane>

          <el-tab-pane :label="$t('opticalSplitter.ports')" name="port">
            <show-ports :editStatus="true" :fullData="fullData" @returnData="(a) => {fullData = a}"></show-ports>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import odfAutoCompent from './odfAutoCompent'
import showPorts from './ports'

export default {
  name: 'opticalSplitterEditAndAdd',
  components: {
    odfAutoCompent,
    showPorts
  },
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number],
    editTf: Boolean
  },
  data () {
    return {
      fresh: true,
      select: '',
      disableArray: [],
      fullData: {},
      loading: false,
      newTableData: null
    }
  },
  computed: {
    titleType: function () {
      return this.$pageUrl[this.type].name
    },
    columns: function () {
      return this.$allConfig[this.type]
    }
  },
  methods: {
    computedDisableArray (args) {
      this.disableArray = this.$computedDisableInfo(args, this.baseDisable, this.fullData)
    },
    bindData (info) {
      this.fullData = { ...this.fullData, ...info }
    },
    submit () {
      if (this.fullData.place === 'outdoor') {
        this.fullData.ldsysOpticalCrossConnect = null

      }
      this.$resourceOperating({
        name: this.type,
        type: this.tableData.add === 0 ? 'create' : 'update',
        info: this.fullData
      }, e => {
        this.$checkStatus(e)
        // 重载表格
        if (this.editTf) {
          this.$store.commit('mapEditInfoUpdate', { ...this.tableData, ...this.fullData })
        }
        this.$emit('reload')
      })
    }
  },
  watch: {
    disableArray: function (newVal) {
      // 新增和编辑的状态
      if (newVal !== undefined) {
        this.$store.commit('getBaUpdate', true)
      } else {
        this.$store.commit('getBaUpdate', false)
      }
    },
    fullData: {
      immediate: true,
      handler: function (newVal) {
        // 这是动态计算的状态, 不可以用来初始化状态
        if (newVal.ldsysMachineRoom && newVal.ldsysMachineRoom.id) {
          this.disableArray = this._.uniq([...this.disableArray, 'lng', 'lat'])
        } else {
          this.disableArray = this.baseDisable
          if (this.tableData.add === undefined) {
            this.disableArray = []
          }
        }
      },
      deep: true
    },
    tableData: {
      handler: function (newVal) {
        // 初始化状态
        if (newVal.add === undefined) {
          this.loading = true
          this.fresh = false
          // 发送请求
          this.$getTableFullInfo(this.type, newVal, (e) => {
            this.fullData = e.data
            this.computedDisableArray()
            this.fresh = true
            this.loading = false
          })
        } else {
          this.fullData = {}
          this.loading = false

        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
