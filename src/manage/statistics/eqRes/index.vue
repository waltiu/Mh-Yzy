<template>
  <div>
    <el-card class="box-card" style="width: 100%;margin-bottom: -15px;">
      <div class="text item" style="float: left;margin-right: 5%">
        <p>{{$t('statistics.lightBoxNum')}}: {{cardData.number}}{{$t('statistics.ge')}}</p>
      </div>
      <div class="text item" style="float: left;margin-right: 5%">
        <p>{{$t('statistics.ODFNum')}}: {{cardData2.number}}{{$t('statistics.ge')}}</p>
      </div>
      <div class="text item" style="float: left;margin-right: 5%">
        <p>{{$t('statistics.networkDeviceNum')}}: {{cardData3.number}}{{$t('statistics.ge')}}</p>
      </div>
      <div class="text item" style="float: left;margin-right: 5%">
        <p>{{$t('statistics.opticalSplitterNum')}}: {{cardData4.number}}{{$t('statistics.ge')}}</p>
      </div>
    </el-card>
    <div>
      <h3 style="margin: 30px 0 13px 10px">{{$t('statistics.networkDeviceStatistics')}}</h3>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="index" :label="$t('statistics.serialNumber')"></el-table-column>
      <el-table-column prop="model" :label="$t('statistics.type')"></el-table-column>
      <el-table-column prop="number" :label="$t('statistics.number')"></el-table-column>
    </el-table>

    <div>
      <h3 style="margin: 30px 0 13px 10px">{{$t('statistics.opticalSplitterStatistics')}}</h3>
    </div>
    <el-table v-loading="loading" :data="tableData2" border style="width: 100%">
      <el-table-column prop="index" :label="$t('statistics.serialNumber')"></el-table-column>
      <el-table-column prop="level" :label="$t('statistics.level')"></el-table-column>
      <el-table-column prop="number" :label="$t('statistics.number')"></el-table-column>
    </el-table>

    <div>
      <h3 style="margin: 30px 0 13px 10px">{{$t('statistics.lightBoxStatistics')}}</h3>
    </div>
    <el-table v-loading="loading" :data="tableData3" border style="width: 100%">
      <el-table-column prop="index" :label="$t('statistics.serialNumber')"></el-table-column>
      <el-table-column prop="level" :label="$t('statistics.level')"></el-table-column>
      <el-table-column prop="number" :label="$t('statistics.number')"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'eqRes',
  data () {
    return {
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
        type: ''
      },
      const: {
        carrierData: {}
      },
      tableData: [
        {
          index: '暂无数据',
          model: '暂无数据',
          number: '暂无数据'
        }
      ],
      tableData2: [
        {
          index: '暂无数据',
          level: '暂无数据',
          number: '暂无数据'
        }
      ],
      tableData3: [
        {
          index: '暂无数据',
          level: '暂无数据',
          number: '暂无数据'
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
      let res = await this.$http.get('/api/ldsysCount/getEquipmentCount')
      this.const.carrierData = res.data
      this.cardData = this.const.carrierData.countPointNumberVoList[0] // 光交
      this.cardData2 = this.const.carrierData.countPointNumberVoList[1] // ODF
      this.cardData3 = this.const.carrierData.countPointNumberVoList[2] // 网元
      this.cardData4 = this.const.carrierData.countPointNumberVoList[3] // 分光器
      // 网元设备統計
      this.tableData = this.const.carrierData.countAllPointByModelVo.countPointByModelVoList // 网元
      for (let i = 0; i < this.const.carrierData.countAllPointByModelVo.countPointByModelVoList.length; i++) {
        this.tableData[i].index = i + 1
      }
      // 分光器統計
      this.tableData2 = this.const.carrierData.countAllPointByLevelVo.countAllOSNumberByLevelVo.countOSNumberByLevelVoList // 分光器
      for (let i = 0; i < this.const.carrierData.countAllPointByLevelVo.countAllOSNumberByLevelVo.countOSNumberByLevelVoList.length; i++) {
        this.tableData2[i].index = i + 1
      }
      // 光交接箱統計
      this.tableData3 = this.const.carrierData.countAllPointByLevelVo.countAllOCCNumberByLevelVo.countOCCNumberByLevelVoList // 光交
      for (let i = 0; i < this.const.carrierData.countAllPointByLevelVo.countAllOCCNumberByLevelVo.countOCCNumberByLevelVoList.length; i++) {
        this.tableData3[i].index = i + 1
      }
      this.loading = false
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
