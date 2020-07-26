<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t('well.browseDetail')"
      :type="type"
      @close="$emit('close')"
      :editTf="editTf"
    >
      <div v-loading="loading">
        <!-- 基础信息 -->
        <el-tabs value="info">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <show-table-info :type="type" :table="columns" :info="fullData"></show-table-info>
            <!-- oc 使用信息 -->

            <oc-port :info="fullData">
              <div
                slot="addText"
                slot-scope="data"
              >{{ fullData.ocCoreInfo[data.data.index] ? fullData.ocCoreInfo[data.data.index].transferSystem : '' }}</div>
            </oc-port>
          </el-tab-pane>

          <el-tab-pane :label="$t('alert.repairLog')" name="fixlog">
            <table-and-paging
              :colums="fixLogColums"
              :tableData="fullData.fixLog ? fullData.fixLog.info : []"
            ></table-and-paging>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import ocPort from '@/public/ocPort'

export default {
  name: 'cableAlertPage',
  props: {
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object, // 要展示的数据
    editTf: {
      default: false,
      type: Boolean
    },
  },
  components: {
    ocPort
  },
  data () {
    return {
      loading: true,
      fullData: {},

      fixLogColums: [
        {
          title: 'alert.malfunctionID', // 故障ID
          key: 'troubleId'
        },
        {
          title: 'alert.malfunctionName', // 故障名称
          key: 'troubleName'
        },
        {
          title: 'alert.operator', // 操作人员名
          key: 'operatorName'
        },
        {
          title: 'alert.status',
          key: 'state'
        },
        {
          title: 'alert.time',
          key: 'time'
        }
      ]
    }
  },
  computed: {
    editMapInfo: function () {
      return this.$store.state.mapEditInfo
    }
  },
  watch: {
    selectArrayShow: {
      immediate: true,
      handler: function (newVal) {
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    },
    editMapInfo: {
      handler: function (newVal) {
        if (newVal && newVal.mapType !== 'cran' && newVal.mapType !== 'machine' && newVal.mapType !== 'subdistricts') {
          this.fullData = newVal
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
