<template>
  <div>
  <v-pie :data="chartData" :settings="chartSettings" :tableData="tableData3"></v-pie>
  </div>
</template>

<script>
  import VPie from 'v-charts/lib/pie.common'
  export default {
    inject: ['reload'],
    props: {
      tableData3: Array
    },
    components: {
      VPie
    },
    name: 'PieChart',
    data () {
      this.chartSettings = {
        dimension: '产权',
        metrics: '数量'
      }
      return {
        chartData: {
          columns: ['产权', '数量'],
          rows: []
        }
      }
    },
    created () {
      for (let i = 0; i < this.tableData3.length; i++) {
        this.chartData.rows.push({ '产权': this.tableData3[i].equity, '数量': this.tableData3[i].number })
      }
    }
  }
</script>
