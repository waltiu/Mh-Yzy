<template>
  <div>
    <el-card>
      <el-date-picker
        v-model="dataVal"
        type="datetimerange"
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;工程单位：
      <engineering-unit @returnData="getUnit" :value="initValue"></engineering-unit>&nbsp;&nbsp;&nbsp;&nbsp;工程状态：
      <work-order-status @returnData="getState" :value="initStringValue"></work-order-status>
      <br />
      <br />
      <el-button style="margin-left: 10px; float:right" @click="getTableInfo()" type="primary">确定</el-button>
      <el-button style="float:right" @click="reset()">重置</el-button>
      <el-button v-if="!_.isEmpty(rowData)" @click="checkOut">{{$t('dynamic.exportData')}}</el-button>
    </el-card>

    <div style="margin-top:10px">
      <el-table
        :data="rowData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'names', hasChildren: 'hasChildren'}"
      >
        <el-table-column align="center" prop="name" label="工程名称" width="150"></el-table-column>
        <el-table-column align="center" prop="orderNumber" label="工程号" sortable width="180"></el-table-column>
        <el-table-column align="center" prop="departmentName" label="施工单位名称"></el-table-column>
        <el-table-column align="center" prop="ZHstate" label="工程状态"></el-table-column>
        <el-table-column align="center" prop="name2" label="光交箱或ODF名称" width="180"></el-table-column>
        <el-table-column align="center" prop="numberOfOcc" label="光交箱数量" sortable></el-table-column>
        <el-table-column align="center" prop="numberOfOdf" label="ODF数量"></el-table-column>
        <el-table-column align="center" prop="lastCheckTime" label="审核时间"></el-table-column>
        <el-table-column align="center" prop="finishTime" label="完成时间"></el-table-column>
        <el-table-column align="center" prop="note" label="备注"></el-table-column>
        <!-- //TODO: 
        1．工程状态-->
      </el-table>
      <paging-page :page.sync="pageStatus" :total="total"></paging-page>
    </div>
  </div>
</template>

<script>
import engineeringUnit from '@/_public/form/components/engineeringUnit'
import workOrderStatus from '@/_public/form/components/workOrderStatus'
import { unixs2date } from '@/_command/tools'

export default {
  name: 'orderStatistics',
  components: {
    engineeringUnit,
    workOrderStatus
  },
  data () {
    return {
      dataVal: [],
      rowData: [],
      total: 0,
      departmentId: { 'departmentId': '' },
      state: { 'state': '' },
      initValue: -1,
      initStringValue: '',
      once: 0,
      target: {
        'uncommitted': '待提交',
        'unreviewed': '待审核',
        'finish': '完成',
      },
      pageStatus: {
        size: 10,
        page: 0
      },
    }
  },
  watch: {
    pageStatus: {
      handler: function () {
        this.getTableInfo()
      },
      deep: true
    }
  },
  computed: {
    startAndEnd: function () {
      return {
        startDateLong: this.dataVal ? this.dataVal[0] : '',
        endDateLong: this.dataVal ? this.dataVal[1] : ''
      }
    }
  },
  methods: {
    reset () {
      this.dataVal = []
      this.departmentId.departmentId = ''
      this.initValue--
      this.state.state = ''
      this.initStringValue = this.initStringValue == '0' ? '' : '0'
      this.getTableInfo()
    },
    getUnit (info) {
      this.departmentId.departmentId = info.id
    },
    getState (info) {
      this.state.state = info.id
    },
    checkOut () {
      window.location.href = '/api/ldsysFiberCoreOrders/excelOfStatistics' + this.$headerToUrl(this.startAndEnd) + '&state=' + this.state.state + '&departmentId=' + this.departmentId.departmentId
    },
    getTableInfo () {
      this.$http.get('/api/ldsysFiberCoreOrders/statistics', {
        params: {
          ...this.pageStatus,
          ...this.startAndEnd,
          ...this.departmentId,
          ...this.state
        }
      })
        .then((result) => {
          this.rowData = this.$checkOutData(result)
          this.total = result.data.page.totalElements
          this.rowData.map(item => {
            item.ZHstate = this.target[item.state]
            item.checkTime = item.lastCheckTime
            item.finishtime = item.finishTime
            item.lastCheckTime = unixs2date(item.lastCheckTime)
            item.finishTime = unixs2date(item.finishTime)
            item.names = item.names.map(i => { return { 'name2': i, 'id': this.rowData[0].id++ } })
            if (item.names.length) {
              item.name2 = item.names[0].name2
              item.names.shift()
            }
          })
          if (!this.once) {
            this.once++
            this.reset()
          }

        })
    }
  },
  mounted () {
    this.getTableInfo()
  }
}
</script>