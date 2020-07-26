<template>
  <div>
    <el-pagination
      background
      style="float: right;margin-top: 20px; display: flex;flex-wrap: wrap;"
      :current-page="pageStatus.page + 1"
      :page-size="pageStatus.size"
      @size-change="changePageSize"
      @current-change="changePage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  props: {
    page: Object,
    total: Number
  },
  data: () => ({
    pageStatus: {
      size: 0,
      page: 0
    }
  }),
  methods: {
    changePageSize (args) {
      this.pageStatus.size = args
      this.$emit('update:page', this.pageStatus)
    },
    changePage (args) {
      var tmp = args
      if (tmp !== 0) {
        tmp = args - 1
      }
      this.pageStatus.page = tmp
      this.$emit('update:page', this.pageStatus)
    }
  },
  mounted () {
    this.pageStatus = this.page
  },
  watch: {
    page: function () {
      if (this.page) {
        this.pageStatus = this.page
      }
    }
  }
}
</script>
