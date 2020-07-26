<template>
  <div>
    <el-card class="box-card" style="width: 100%;margin-bottom: -15px;padding-bottom: 10px;padding-top: 15px;margin-top: 1px;height: 80px">
      <div style="float: left;margin-right: 5%">
        <p>{{$t('vendorList.business')}}:{{cardData.number}}{{$t('statistics.piece')}}</p>
      </div>
      <div style="float: left;margin-right: 5%">
        <p>{{$t('vendorList.lightPath')}}:{{cardData2.number}}{{$t('statistics.piece')}}</p>
      </div>
      <div style="float: left;margin-right: 5%">
        <p>{{$t('vendorList.oc')}}:{{cardData3.number}}{{$t('statistics.piece')}}</p>
      </div>
    </el-card>
    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.businessStatistics')}}</h3></div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="index"
        :label="$t('statistics.serialNumber')">
      </el-table-column>
      <el-table-column
        prop="serviceType"
        :label="$t('statistics.businessType')">
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

    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.opticalPathStatistics')}}</h3></div>
    <el-table
      v-loading="loading"
      :data="tableData2"
      border
      style="width: 100%">
      <el-table-column
        prop="index"
        :label="$t('statistics.serialNumber')">
      </el-table-column>
      <el-table-column
        prop="type"
        :label="$t('statistics.lightPathType')">
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

    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.opticalCableStatistics')}}</h3></div>
    <el-table
      v-loading="loading"
      :data="tableData3"
      border
      style="width: 100%">
      <el-table-column
        prop="index"
        :label="$t('statistics.serialNumber')">
      </el-table-column>
      <el-table-column
        prop="level"
        :label="$t('statistics.opticalCableType')">
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
  export default {
    name: 'lineRoad',
    data () {
      return {
        cardData: {
          number: '',
          name: ''
        },
        cardData2: {
          number: '',
          name: ''
        },
        cardData3: {
          number: '',
          name: ''
        },
        const: {
          carrierData: {}
        },
        tableData: [
          {
            index: '暂无数据',
            serviceType: '暂无数据',
            number: '暂无数据',
            totalLength: ''
          }
        ],
        tableData2: [
          {
            index: '暂无数据',
            type: '暂无数据',
            number: '暂无数据',
            totalLength: ''
          }
        ],
        tableData3: [
          {
            index: '暂无数据',
            level: '暂无数据',
            number: '暂无数据',
            totalLength: ''
          }
        ],
        loading: true
      }
    },
    mounted () {
      this.getAll()
    },
    methods: {
      getAll: async function () {
        let res = await this.$http.get('/api/ldsysCount/getOpticalCount')
        this.const.carrierData = res.data
        this.cardData = this.const.carrierData.countOCWorkNumberVo // 业务
        this.cardData2 = this.const.carrierData.countOCWayNumberVo // 光路
        this.cardData3 = this.const.carrierData.countOCNumberVo // 光缆
        // 业务統計
        this.tableData = this.const.carrierData.countAllOCWorkNumberByServiceTypeVo.countOCWorkNumberByServiceTypeVoList // 网元

        for (let i = 0; i < this.const.carrierData.countAllOCWorkNumberByServiceTypeVo.countOCWorkNumberByServiceTypeVoList.length; i++) {
          this.tableData[i].index = i + 1
        }

        // 光路統計
        this.tableData2 = this.const.carrierData.countAllOCWayNumberByTypeVo.countOCWayNumberByTypeVoList // 分光器
        for (let i = 0; i < this.const.carrierData.countAllOCWayNumberByTypeVo.countOCWayNumberByTypeVoList.length; i++) {
          this.tableData2[i].index = i + 1
        }
        // 光缆統計
        this.tableData3 = this.const.carrierData.countAllOCNumberByLevelVo.countOCNumberByLevelVoList // 光交
        for (let i = 0; i < this.const.carrierData.countAllOCNumberByLevelVo.countOCNumberByLevelVoList.length; i++) {
          this.tableData3[i].index = i + 1
          this.loading = false
        }
      },
      print () {
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
