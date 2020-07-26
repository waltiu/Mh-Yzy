<template>
  <div>
    <el-card>
      <el-date-picker
        v-model="dataVal"
        type="datetimerange"
        value-format="timestamp"
        :range-separator="$t('dynamic.to')"
        :start-placeholder="$t('dynamic.start')"
        :end-placeholder="$t('dynamic.end')"
      ></el-date-picker>

      <el-button
        style="margin-left: 10px;"
        @click="getTableInfo()"
        type="primary"
      >{{$t('dynamic.determine')}}</el-button>
      <el-button @click="() => {dataVal = []}">{{$t('dynamic.reset')}}</el-button>
      <el-button v-if="!_.isEmpty(rowData)" @click="checkOut">{{$t('dynamic.exportData')}}</el-button>
    </el-card>

    <div style="margin-top: 10px;">
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{$t('dynamic.name')}}</span>
          <!-- <span style="float: right; padding: 3px 0" type="text">操作</span> -->
        </div>

        <div v-for="(item, index) in rowData" :key="index">
          <el-card>{{ $t(item.name) }}</el-card>
        </div>

        <div style="margin: 10px 10px 10px;" v-if="_.isEmpty(rowData)">{{$t('dynamic.noData')}}</div>
      </el-card>
      <paging-page :page.sync="pageStatus" :total="total"></paging-page>
    </div>
  </div>
</template>

<script>

export default {
  name: 'orderStatistics',
  data () {
    return {
      dataVal: [],
      rowData: [],
      total: 0,
      pageStatus: {
        size: 10,
        page: 0
      }
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
        startDate: this.dataVal[0],
        endDate: this.dataVal[1]
      }
    }
  },
  mounted: function () {
    this.getTableInfo()
  },
  methods: {
    checkOut () {
      window.location.href = '/api/ldsysOpticalSplitterOrders/excel' + this.$headerToUrl(this.startAndEnd)
    },
    getTableInfo () {
      this.$http.get('/api/ldsysOpticalSplitterOrders/statistics', {
        params: {
          ...this.pageStatus,
          ...this.startAndEnd
        }
      })
        .then((result) => {
          this.rowData = this.$checkOutData(result)
          this.total = result.data.page.totalElements
        })
    }
  }
}
</script>
