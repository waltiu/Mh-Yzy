<template>
  <div style="margin-top: 10px;">
    <public-event-table-view :bus="bus" :column="displayColumn"></public-event-table-view>
  </div>
</template>

<script>

export default {
  name: 'TableView',
  props: {
    bus: Object,
    column: Object
  },
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    // 接受两个参数, tableData[item,key], tableData 当数据在ready时候可用
    displayColumn: function () {
      return Object.values(this.column)
        .filter(item => item.table && 'display' in item.table)
        .filter(item =>
          item.table.display(this.tableData[item.key], this.tableData)
        )
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.table
          }
        })
    }
  }
}
</script>
