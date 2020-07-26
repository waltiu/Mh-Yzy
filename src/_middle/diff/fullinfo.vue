<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ODF" prop="odf" v-slot:default="{row}">{{ parseName(row, 'odf') }}</el-table-column>
      <el-table-column label="光缆" prop="oc" v-slot:default="{row}">{{ parseName(row, 'oc') }}</el-table-column>
      <el-table-column label="光交" prop="occ" v-slot:default="{row}">{{ parseName(row, 'occ') }}</el-table-column>
      <el-table-column label="引上" prop="ledUp" v-slot:default="{row}">{{ parseName(row, 'ledUp') }}</el-table-column>
      <el-table-column
        label="引入段"
        prop="ledUpLineSection"
        v-slot:default="{row}"
      >{{ parseName(row, 'ledUpLineSection') }}</el-table-column>
      <el-table-column label="电杆" prop="pole" v-slot:default="{row}">{{ parseName(row, 'pole') }}</el-table-column>
      <el-table-column
        label="杆路段"
        prop="poleLineSection"
        v-slot:default="{row}"
      >{{ parseName(row, 'poleLineSection') }}</el-table-column>
      <el-table-column
        label="撑点"
        prop="support"
        v-slot:default="{row}"
      >{{ parseName(row, 'support') }}</el-table-column>
      <el-table-column
        label="挂墙段"
        prop="supportLineSection"
        v-slot:default="{row}"
      >{{ parseName(row, 'supportLineSection') }}</el-table-column>
      <el-table-column label="井" prop="well" v-slot:default="{row}">{{ parseName(row, 'well') }}</el-table-column>
      <el-table-column
        label="管道段"
        prop="wellLineSection"
        v-slot:default="{row}"
      >{{ parseName(row, 'wellLineSection') }}</el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'FullInfoTable',
  props: {
    tableData: Array
  },
  methods: {
    parseName: (info, key) => info[key] && info[key].name ? info[key].name : '',
  }
}
</script>
