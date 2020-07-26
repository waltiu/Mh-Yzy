<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: {
    bus: Object
  },
  data () {
    return {
      total: 0,
      page: {}
    }
  },
  watch: {
    bus: {
      immediate: true,
      handler: function () {
        this.bindEvent()
      }
    }
  },
  methods: {
    bindEvent () {
      this.bus
        .on('SearchEnd', (res) => {
          res = res.data
          this.page = {
            size: res.page.size,
            page: res.page.number
          }

          this.total = res.page.totalElements

        })
    },
    handleSizeChange (size) {
      this.page.size = size
      this.bus.search(this.page)
    },
    handleCurrentChange (page) {
      this.page.page = page - 1
      this.bus.search(this.page)
    }
  }
}
</script>
