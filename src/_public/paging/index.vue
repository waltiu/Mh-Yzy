<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: {
    request: Object
  },
  data () {
    return {
      total: 0,
      page: {}
    }
  },
  watch: {
    request: function () {
      this.load()
    }
  },
  mounted () {
    this.load()
    this.request
      .on('SearchEnd', (res) => {
        res = res.data
        this.page = {
          size: res.page.size,
          page: res.page.number
        }

        this.total = res.page.totalElements

      })
  },
  methods: {
    handleSizeChange (size) {
      this.page.size = size
      this.load()
    },
    handleCurrentChange (page) {
      this.page.page = page - 1
      this.load()
    },
    load () {
      let args = this.request.searchlastargs
      this.request
        .search({
          args: {
            ...args,
            ...this.page
          }
        })
    }
  }
}
</script>
