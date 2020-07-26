<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="" :label="$t('statistics.businessArea')">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.businessArea')"
      prop="">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.coreEquipmentRoom')"
      prop="核心机房">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.mainConvergenceEquipmentRoom')"
      prop="骨干汇聚机房">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.convergenceEquipmentRoom')"
      prop="汇聚机房">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.fullServiceEquipmentRoom')"
      prop="全业务机房">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.userEquipmentRoom')"
      prop="用户机房">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.baseStation')"
      prop="基站">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.indoorCoverage')"
      prop="室分">
    </el-table-column>
    <el-table-column
     :label="$t('statistics.OLTDevice')"
      prop="OLT设备">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.opticalFiberBox')"
      prop="光交箱">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.1stOpticalFiberBox')"
      prop="一级光交箱">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.2ndOpticalFiberBox')"
      prop="二级光交箱">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.opticalSplitter')"
      prop="分光器">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.1stOpticalSplitter')"
      prop="一级分光器">
    </el-table-column>
    <el-table-column
      :label="$t('statistics.2ndOpticalSplitter')"
      prop="二级分光器">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      tableData: Array
    },
    name: 'serTable',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
