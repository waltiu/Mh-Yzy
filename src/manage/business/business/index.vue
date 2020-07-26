<template>
  <div>
    <!-- 表格搜索 -->
    <div style="display: flex;">
      <table-search
        :keys="$options.name"
        @returnSearch="(a) => {pageStatus = {...pageStatus, ...a}}"
        :attachData="[{title: $t('tableSearch.networkElement'), key: 'ep'}]"
      >
        <middle-excel-export-import :type="$options.name" :download="download" :upload="upload"></middle-excel-export-import>
      </table-search>

      <md-attach
        v-if="!diffRoute"
        :type="$options.name"
        @add="() => { selectArrayForEditAndAdd = {'add': 0} }"
        @upload="(a) => { selectDownload = {...a} }"
      ></md-attach>
    </div>

    <div>
      <slot name="table" :tableData="rowData">
        <table-page
          :type="$options.name"
          :button="diffRoute ? [] : ['del', 'map']"
          :page="pageStatus"
          @reload="getTableInfo"
          :columns="tableColumn"
          :tableData="rowData"
        ></table-page>
      </slot>

      <paging-page :page.sync="pageStatus" :total="total"></paging-page>

      <edit-info
        @reload="getTableInfo()"
        :type="$options.name"
        :tableData="selectArrayForEditAndAdd"
      ></edit-info>
    </div>

    <alert-page
      :columns="$allConfig[$options.name]"
      :selectArrayShow="selectArrayForShow"
      :type="$options.name"
    ></alert-page>
  </div>
</template>

<script>
import tableSearch from '@/public/tableSearch'
import tablePage from '@/public/table'
import editInfo from './editAndAdd'
import PagingPage from '@/public/paging'
import alertPage from './alertPage'
// 表格结构
import table from './tableColumn.js'
import { auth } from '@/_command/excelPermissions'

export default {
  name: 'business',
  props: {
    diffRoute: Boolean,
    diffRouteTable: Object
  },
  components: {
    tableSearch,
    editInfo,
    tablePage,
    PagingPage,
    alertPage
  },
  data () {
    return {
      total: 0,
      rowData: [],
      selectDownload: {},
      selectArrayForShow: {},
      selectArrayForEditAndAdd: {}, // 需要编辑的信息
      pageStatus: {
        size: 10,
        page: 0,
        name: '%%'
      },
      tableOperating: {
        title: 'tableSearch.operation',
        tableDisplay: true,
        editDisplay: false,
        render: (h, params) =>
          <div class>
            {this.$store.getters.getUserRole.includes(this.$userPermission[this.$options.name].key + '.r')
              ? <el-button type="primary" size="mini"
                onClick={() => { this.selectArrayForShow = { ...params.row } }}>{this.$i18n.t('alert.view')}</el-button>
              : ''}
            {this.$store.getters.getUserRole.includes(this.$userPermission[this.$options.name].key + '.u')
              ? <el-button type="primary" size="mini"
                onClick={() => { this.selectArrayForEditAndAdd = { ...params.row } }}>{this.$i18n.t('main.edit')}</el-button>
              : ''}
          </div>
      }
    }
  },
  methods: {
    download: () => [],
    upload (info) {
      return [
        {
          name: '导入Excel 华为设备 保护',
          args: { ...info.args, type: 'HW', isProtect: true },
          url: info.url,
          permission: () => auth("excelmanage.input") && auth("ywgl.r")
        },
        {
          name: '导入Excel 华为设备 工作',
          args: { ...info.args, type: 'HW', isProtect: false },
          url: info.url,
          permission: () => auth("excelmanage.input") && auth("ywgl.r")
        },
        {
          name: '导入Excel 中兴',
          args: { ...info.args, type: 'ZX' },
          url: info.url,
          permission: () => auth("excelmanage.input") && auth("ywgl.r")
        }
      ]
    },
    getTableInfo () {
      // 重置状态
      this.rowData = [0]
      this.$http.get(this.$pageUrl[this.$options.name].url, {
        params: this.$compactObject({ ...this.pageStatus, ...this.$pageUrl[this.$options.name].args })
      })
        .then((res) => {
          this.total = res.data.page.totalElements
          this.rowData = this.$checkOutData(res)
        })
    }
  },
  computed: {
    tableColumn: function () {
      if (this.diffRoute) {
        return [...table, this.diffRouteTable].filter((info) => {
          if (['lengthMap', 'serviceType'].includes(info.key)) {
            return false
          } else {
            return true
          }
        })
      } else {
        return [...table, this.tableOperating]
      }
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
