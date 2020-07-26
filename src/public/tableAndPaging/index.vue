<template>
  <div>
    <table-components :columns="colums" :data="tableDataShow"></table-components>
    <div style="float: right; margin-top: 10px;">
      <el-pagination
        background
        style="float: right;margin-top: 20px;"
        @size-change="changeSize"
        @current-change="changePage"
        layout="total, prev, next"
        :total="pageStatus.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import tableComponents from '../table/tableComponents.vue'

export default {
  name: 'tableAndPaging',
  props: {
    tableData: {
      default: () => [],
      type: Array
    },
    colums: Array
  },
  components: {
    tableComponents
  },
  data () {
    return {
      pageStatus: {
        size: 10,
        total: 0,
        page: 0
      }
    }
  },
  watch: {
    tableData: {
      handler: function (newVal) {
        this.pageStatus.total = newVal.length
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    tableDataShow: function () {
      if (this._.chunk(this.tableData, this.pageStatus.size)[this.pageStatus.page]) {
        return this._.chunk(this.tableData, this.pageStatus.size)[this.pageStatus.page]
      } else {
        return []
      }
    }
  },
  methods: {
    changePage (page) {
      this.pageStatus.page = page - 1
    },
    changeSize (size) {
      this.size = size
    }
  }
}
</script>
