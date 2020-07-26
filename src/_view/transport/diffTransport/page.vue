<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalElements"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  nameL: "page",
  methods: {
    handleSizeChange (size) {
      this.page.size = size
      this.$emit("pageInfo", this.page)
    },
    handleCurrentChange (page) {
      this.page.page = page - 1
      this.$emit("pageInfo", this.page)

    },
  },
  props: {
    page: Object
  }
}
</script>
