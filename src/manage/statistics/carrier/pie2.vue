<template>
  <div>
    <v-pie :data="chartData" :settings="chartSettings"></v-pie>
  </div>
</template>

<script>
  import VPie from 'v-charts/lib/pie.common'
  export default {
    props: {
      tableData4: Array
    },
    components: {
      VPie
    },
    name: 'PieChart2',
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
      for (let i = 0; i < this.tableData4.length; i++) {
        this.chartData.rows.push({ '产权': this.tableData4[i].equity, '数量': this.tableData4[i].number })
      }
    }
  }
</script>
