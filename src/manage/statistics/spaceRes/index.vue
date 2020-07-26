<template>
  <div>
    <el-card class="box-card" style="width: 100%;margin-bottom: -15px;">
      <div class="text item" style="float: left;margin-right: 5%">
        {{$t('vendorList.machineRooms')}}{{$t('statistics.quantity')}}:{{cardData.number}}{{$t('statistics.ge')}}
      </div>
      <div class="text item" style="float: left;margin-right: 5%">
        {{$t('infoMap.station')}}{{$t('statistics.quantity')}}:{{cardData2.number}}{{$t('statistics.ge')}}
      </div>
    </el-card>
    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.bureauStationStatistics')}}</h3></div>
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
        prop="serviceArea"
        :label="$t('statistics.businessArea')">
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('statistics.number')">
      </el-table-column>
    </el-table>

    <div><h3 style="margin: 30px 0 13px 10px">{{$t('statistics.equipmentRoomStatistics')}}</h3></div>
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
        prop="level"
        :label="$t('statistics.level')">
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('statistics.number')">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    name: 'spaceRes',
    data () {
      return {
        cardData: {
          number: '',
          space_NAME: ''
        },
        cardData2: {
          number: '',
          space_NAME: ''
        },
        const: {
          carrierData: {}
        },
        tableData: [
          {
            index: '暂无数据',
            serviceArea: '暂无数据',
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
        loading: true
      }
    },
    mounted () {
      this.getAll()
    },
    methods: {
      getAll: async function () {
        let res = await this.$http.get('/api/ldsysCount/getSpaceCount')
        this.const.carrierData = res.data
        this.cardData = this.const.carrierData.countMachineRoomNumberVo // 机房
        this.cardData2 = this.const.carrierData.countStationNumberVo // 局站
        // 局站統計
        this.tableData = this.const.carrierData.countAllStationNumberByServiceAreaVo.countStationNumberByServiceAreaVoList // 网元
        for (let i = 0; i < this.const.carrierData.countAllStationNumberByServiceAreaVo.countStationNumberByServiceAreaVoList.length; i++) {
          this.tableData[i].index = i + 1
        }

        // 机房統計
        this.tableData2 = this.const.carrierData.countAllMechineRoomNumberByLevelVo.countMachineRoomNumberByLevelVoList // 分光器
        for (let i = 0; i < this.const.carrierData.countAllMechineRoomNumberByLevelVo.countMachineRoomNumberByLevelVoList.length; i++) {
          this.tableData2[i].index = i + 1
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
