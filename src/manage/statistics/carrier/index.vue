<template>
  <div v-loading="loading">
  <el-card class="box-card" style="width: 100%;padding-bottom: 10px;padding-top: 5px;margin-top: 1px;margin-bottom: -35px;height: 80px">
    <div style="padding-left:10px;display: inline-block;width: 16%;border-left: grey dashed 1px;height: 36px;float: left;">
      <p>{{$t('infoMap.well')}}:{{cardData.number}}{{$t('statistics.ge')}}</p >
      <p>{{$t('infoMap.pole')}}:{{cardData2.number}}{{$t('statistics.ge')}}</p >
    </div>
    <div style="padding-left:10px;display: inline-block;width: 16%;border-left: grey dashed 1px;height: 36px;float: left;">
      <p>{{$t('infoMap.cited')}}:{{cardData3.number}}{{$t('statistics.ge')}}</p >
      <p>{{$t('infoMap.support')}}:{{cardData4.number}}{{$t('statistics.ge')}}</p >
    </div>
    <div style="padding-left: 10px; display: inline-block; width: 28%; border-left: grey dashed 1px; height: 36px; float: left;">
      <p>{{$t('vendorList.pipe')}}:{{cardData5.number}}{{$t('statistics.piece')}}:{{cardData5.totalLength}}{{$t('statistics.miles')}}</p >
      <p>{{$t('vendorList.poleRoad')}}:{{cardData6.number}}{{$t('statistics.piece')}}:{{cardData6.totalLength}}{{$t('statistics.miles')}}</p >
    </div>
    <div style="padding-left: 10px; display: inline-block; width: 28%; border-left: grey dashed 1px; height: 36px; float: left;">
      <p>{{$t('infoMap.citedSection')}}:{{cardData7.number}}{{$t('statistics.piece')}}:{{cardData7.totalLength}}{{$t('statistics.miles')}}</p >
      <p>{{$t('infoMap.supportSection')}}:{{cardData8.number}}{{$t('statistics.piece')}}:{{cardData8.totalLength}}{{$t('statistics.miles')}}</p >
    </div>
    </el-card>
    <div style="padding-top: 20px"><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.wellStatistics')}}</h3></div>
    <div style="height: 15%">
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      >
      <el-table-column
        prop="index"
        :label="$t('statistics.serialNumber')">
      </el-table-column>
      <el-table-column
        prop="equity"
        :label="$t('infoMap.propertyRight')">
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('statistics.number')">
      </el-table-column>
    </el-table>
    </div>
    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.pipelineStatistics')}}</h3></div>
    <pie-chart v-if="isRouterAlive" :table-data3="tableData3" style="width: 48%;float: right;height: 220px;margin-top: -15px;margin-left: -50px"></pie-chart>
    <el-button @click="click" style="margin: 5px 0 13px 0">{{$t('statistics.wellMap')}}</el-button>
    <el-table
      v-loading="loading"
      :data="tableData3"
      border
      v-bind:style="{'width':isRouterAlive ? '50%':'100%'}">
      <el-table-column
        prop="index"
        :label="$t('statistics.serialNumber')">
      </el-table-column>
      <el-table-column
        prop="equity"
        :label="$t('infoMap.propertyRight')">
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('statistics.number')">
      </el-table-column>
      <el-table-column
        prop="totalLength"
        :label="$t('statistics.length')">
      </el-table-column>
    </el-table>

    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.rodStatistics')}}</h3></div>
    <div>
    <el-table
      v-loading="loading"
      :data="tableData2"
      border>
      <el-table-column
        prop="index"
        :label="$t('statistics.serialNumber')">
      </el-table-column>
      <el-table-column
        prop="equity"
        :label="$t('infoMap.propertyRight')">
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('statistics.number')">
      </el-table-column>
    </el-table>
    </div>
    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.rodRoadStatistics')}}</h3></div>
    <el-button @click="click2" style="margin: 5px 0 13px 0">{{$t('statistics.rodMap')}}</el-button>
    <pie-chart2 v-if="isRouterAlive2" :table-data4="tableData4" style="width: 48%;float: right;height: 220px;margin-top: -30px;margin-left: -50px"></pie-chart2>
    <el-table
      :data="tableData4"
      height="250"
      border
      v-loading="loading"
      style="width: 100%"
      v-bind:style="{'width':isRouterAlive2 ? '50%':'100%'}">
      <el-table-column
        prop="index"
        :label="$t('statistics.serialNumber')">
      </el-table-column>
      <el-table-column
        prop="equity"
        :label="$t('infoMap.propertyRight')">
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('statistics.number')">
      </el-table-column>
      <el-table-column
        prop="totalLength"
        :label="$t('statistics.length')">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import PieChart from './pie'
  import PieChart2 from './pie2'
  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    components: {
      PieChart2,
      PieChart
    },
    name: 'carrier',
    data () {
      return {
        isRouterAlive: false,
        isRouterAlive2: false,
        cardData: {
          number: '',
          type: ''
        },
        cardData2: {
          number: '',
          type: ''
        },
        cardData3: {
          number: '',
          type: ''
        },
        cardData4: {
          number: '',
          type: '',
          totalLength: ''
        },
        cardData5: {
          number: '',
          type: '',
          totalLength: ''
        },
        cardData6: {
          number: '',
          type: '',
          totalLength: ''
        },
        cardData7: {
          number: '',
          type: '',
          totalLength: ''
        },
        cardData8: {
          number: '',
          type: '',
          totalLength: ''
        },
        const: {
          carrierData: {}
        },
        tableData: [
          {
            index: '',
            equity: '',
            number: '暂无数据'
          }
        ],
        tableData2: [
          {
            index: '1',
            equity: '',
            number: '暂无数据'
          }
        ],
        tableData3: [
          {
            index: '1',
            equity: '',
            number: '暂无数据',
            totalLength: '暂无数据'
          }
        ],
        tableData4: [
          {
            index: '1',
            equity: '购买',
            number: '暂无数据',
            totalLength: '暂无数据'
          }
        ],
        loading: true
      }
    },
    created () {
      this.getAll()
    },
    methods: {
      getAll: async function () {
        let res = await this.$http.get('/api/ldsysCount/getLoadBearingCount')
        this.const.carrierData = res.data
        this.cardData = this.const.carrierData.countPointNumberVoList[0] // 井
        this.cardData2 = this.const.carrierData.countPointNumberVoList[1] // 电杆
        this.cardData3 = this.const.carrierData.countPointNumberVoList[2] // 撑点
        this.cardData4 = this.const.carrierData.countPointNumberVoList[3] // 引上
        this.cardData5 = this.const.carrierData.countLineNumberAndLengthVoList[0] // 管道
        this.cardData6 = this.const.carrierData.countLineNumberAndLengthVoList[1] // 杆路
        this.cardData7 = this.const.carrierData.countLineSectionNumberAndLengthVoList[0] // 引上段
        this.cardData8 = this.const.carrierData.countLineSectionNumberAndLengthVoList[1] // 挂墙段

        this.tableData = this.const.carrierData.countAllPointByEquityVoList[0].countPointByEquityVoList // 井
        this.tableData2 = this.const.carrierData.countAllPointByEquityVoList[1].countPointByEquityVoList // 杆
        this.tableData3 = this.const.carrierData.countAllLineByEquityVoList[0].countLineByEquityVoList // 管道
        this.tableData4 = this.const.carrierData.countAllLineByEquityVoList[1].countLineByEquityVoList // 杆路

        // 井资源统计
        for (let i = 0; i < this.const.carrierData.countAllPointByEquityVoList[0].countPointByEquityVoList.length; i++) {
          this.tableData[i].index = i + 1
        }
        // 杆资源统计
        for (let i = 0; i < this.const.carrierData.countAllPointByEquityVoList[1].countPointByEquityVoList.length; i++) {
          this.tableData2[i].index = i + 1
        }
        // 管道资源统计
        for (let i = 0; i < this.const.carrierData.countAllLineByEquityVoList[0].countLineByEquityVoList.length; i++) {
          this.tableData3[i].index = i + 1
        }
        // 杆路资源统计
        for (let i = 0; i < this.const.carrierData.countAllLineByEquityVoList[1].countLineByEquityVoList.length; i++) {
          this.tableData4[i].index = i + 1
        }
        this.loading = false
      },
      click () {
        if (this.isRouterAlive === false) {
          this.isRouterAlive = true
        } else {
          this.isRouterAlive = false
        }
      },
      click2 () {
        if (this.isRouterAlive2 === false) {
          this.isRouterAlive2 = true
        } else {
          this.isRouterAlive2 = false
        }
      }
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
  }
</style>
