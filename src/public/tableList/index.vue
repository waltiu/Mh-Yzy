<template>
  <div>
    <div style="display: flex;">
      <table-search :keys="type" @returnSearch="(a) => {pageStatus = {...pageStatus, ...a}}">
        <slot :self="this" name="search-bar-attach"></slot>
      </table-search>
    </div>

    <div>
      <table-base
        :type="type"
        :button="tableButtom"
        :page="pageStatus"
        :columns="tableColumn"
        :tableData="rowData"
        @reload="getTableInfo"
      ></table-base>

      <paging-page :page.sync="pageStatus" :total="total"></paging-page>
    </div>

    <slot :this="this"></slot>
  </div>
</template>

<script>
import tableSearch from '@/public/tableSearch'
import PagingPage from '@/public/paging'
import { http } from '@/_command/http';


export default {
  name: 'tableList',
  components: {
    tableSearch,
    PagingPage
  },
  props: {
    table: Object,
    tableButtom: {
      type: Array,
      default: () => []
    },
    tableButtomAttach: {
      type: Object,
      default: () => { }
    },
    type: String
  },
  data () {
    return {
      total: 0,
      rowData: [],
      pageStatus: {
        size: 10,
        page: 0,
        name: '%%'
      }
    }
  },
  computed: {
    tableColumn: function () {
      return [...this.$allConfig[this.type], this.tableButtomAttach]
    }
  },
  methods: {
    getTableInfo () {
      // 重置状态
      this.rowData = [0]
      http.get(this.$pageUrl[this.type].url, {
        params: {
          isFix: false, isFixConfirm: false,
          ...this.pageStatus, ...this.$pageUrl[this.type].args
        }
      })
        .then((res) => {
          this.total = res.data.page.totalElements
          this.rowData = this.$checkOutData(res)
        })
    }
  },
  mounted () {
    this.getTableInfo()
  },
  watch: {
    pageStatus: {
      handler: function () {
        this.getTableInfo()
      },
      deep: true
    }
  }
}
</script>
