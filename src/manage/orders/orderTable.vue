<template>
  <!-- 表格, 在上层接受参数 -->
  <div>

    <table-search-bar @returnSearch="(a) => {pageStatus = {...pageStatus, ...a}}">
    </table-search-bar>

    <md-attach :type="'opticalSplitter'" @add="() => { selectArrayForEditAndAdd = {'add': 0} }" @upload="(a) => { selectDownload = {...a} }" :info="{upload: {}}"></md-attach>

    <slot name="table" :tableData="rowData">
      <table-page :type="$options.name" :button="[]" :page="pageStatus" @reload="getTableInfo" :columns="tableColumn" :tableData="rowData"></table-page>
    </slot>

    <paging-page :page.sync="pageStatus" :total="total"></paging-page>

    <edit-and-add @reload="getTableInfo()" :columns="tableColumn" :tableData="selectArrayForEditAndAdd"></edit-and-add>

  </div>

</template>

<script>
import editAndAdd from './editAndAdd'
import tablePage from '@/public/table'

export default {
  name: 'orderTable',
  props: {
    columns: Array,
    type: String
  },
  components: {
    editAndAdd,
    tablePage
  },
  computed: {
    tableColumn: function () {
      return this.columns
    }
  },
  data () {
    return {
      total: 0,
      pageStatus: {},
      rowData: [],
      selectArrayForEditAndAdd: {}
    }
  },
  methods: {
    getTableInfo () {
      this.rowData = [0]
      this.$http.get(this.$orderUrl[this.type].url, {
        params: this.$compactObject({ ...this.pageStatus, ...this.$orderUrl[this.type].args })
      })
        .then((res) => {
          this.total = res.data.page.totalElements
          this.rowData = this.$checkOutData(res)
        })
    }
  },
  mounted () {
    this.getTableInfo()
  }
}
</script>
