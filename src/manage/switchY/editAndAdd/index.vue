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
            ></edit-add-info>
          </el-tab-pane>

          <el-tab-pane :label="$t('alert.ports')" name="port" v-if="!(tableData.add === 0)">
            <!-- 批量绑定 -->
            <!-- 批量绑定 -->
            <div>
              <batch-bind-port @returnData="bind" :tableData="fullData" @changePort="changePort"></batch-bind-port>
            </div>

            <div class="search" style="display: flex;justify-content: flex-end;">
              <div class="radios">
                <el-button style="margin-right:20px" size="medium " @click="showList">列表显示</el-button>
                <el-button size="medium " @click="portInfo">端口面板</el-button>
                <el-button style="margin-left:20px" size="medium " @click="showPort">端口信息</el-button>
              </div>
            </div>
            <div class="showData">
              <list
                v-show="listShow"
                :page="'edit'"
                @selectPort="(e) => {changeStatus = e}"
                :fullData="fullData"
              ></list>
              <port-info
                v-show="portShow2"
                @selectPort="(e) => {changeStatus = e}"
                :info="fullData"
              ></port-info>
              <odf-occ-port
                :info="fullData"
                @selectPort="(e) => {changeStatus = e}"
                v-show="portShow1"
              ></odf-occ-port>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
    <change-use-status :info="changeStatus" @returnData="bind" :baseData="fullData"></change-use-status>
  </div>
</template>

<script>
import batchBindPort from './batchBindPort'
import OdfOccPort from '@/public/OdfOccPort'
import changeUseStatus from './changeUseStatus'
import portInfo from './portInfo'
// import _ from 'lodash'

import list from '../alertPage/port/table/list'

export default {
  name: 'LightRoadEditAndAdd',
  components: {
    batchBindPort,
    OdfOccPort,
    changeUseStatus,
    portInfo,
    list
  },
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number],
    editTf: Boolean

  },
  data () {
    return {
      // baseDisable: ['occSize', 'rectangleNum', 'rectangleRowNum'],
      baseDisable: ['occSize'],
      disableArray: [],
      fullData: {},
      changeStatus: {},
      formData: {
        name: ''
      },
      loading: false,
      listShow: false,
      portShow1: false,
      portShow2: true,
      justFirst: true,
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
    showList () {
      this.newFullData = this.fullData
      this.portShow1 = false
      this.portShow2 = false
      this.justFirst = false
      this.listShow = true
    },
    showPort () {
      this.newFullData = this.fullData
      this.portShow2 = false
      this.listShow = false
      this.justFirst = false
      this.portShow1 = true
    },
    portInfo () {
      this.newFullData = this.fullData
      this.listShow = false
      this.portShow1 = false
      this.justFirst = false
      this.portShow2 = true
    },
    computedDisableArray (args) {
      this.disableArray = this.$computedDisableInfo(args, this.baseDisable, this.fullData)
    },
    bind () {
      // 防止增加时侧漏
      this.loading = true
      this.$getTableFullInfo(this.type, { id: this.fullData.id }, (e) => {
        this.fullData = e.data
        this.loading = false
      })

    },
    changePort () {
      this.$getTableFullInfo(this.type, this.tableData, (e) => {
        this.fullData = e.data
        this.computedDisableArray()
      })
    },
    submit () {
      // this.fullData = _.omit(this.fullData, ['useInfos'])
      this.fullData.useInfos === null
      // if (this.tableData.add === "create") {
      //   this.fullData.useInfos = new Map()
      // }
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
    fullData: {
      handler: function (newVal) {
        // 这是动态计算的状态, 不可以用来初始化状态
        if (newVal.ldsysMachineRoom && newVal.ldsysMachineRoom.id) {
          this.disableArray = this._.uniq([...this.disableArray, 'lng', 'lat'])
        } else {
          if (this.tableData.add === undefined) {
            this.disableArray = [...this.baseDisable]
          } else {
            this.disableArray = []
          }
        }
      },
      deep: true
    },
    tableData: {
      handler: function (newVal) {
        // 初始化状态
        this.$store.commit('changeDrawArray', "");
        if (newVal.add === undefined) {
          this.loading = true
          this.$getTableFullInfo(this.type, newVal, (e) => {
            this.fullData = e.data
            this.computedDisableArray()
            this.loading = false
          })
        } else {
          this.fullData = {}
          this.loading = false

          this.computedDisableArray()
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
