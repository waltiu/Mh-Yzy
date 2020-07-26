<template>
  <div>
    <!-- 表格搜索 -->
    <div style="display: flex;">
      <table-search
        :keys="$options.name"
        @returnSearch="(a) => {pageStatus = {...pageStatus, ...a}}"
      >
        <middle-excel-export-import :type="$options.name" :download="download" :upload="upload"></middle-excel-export-import>
      </table-search>

      <md-attach
        :type="$options.name"
        @add="() => { selectArrayForEditAndAdd = {'add': 0} }"
        @upload="(a) => { selectDownload = {...a} }"
      ></md-attach>
    </div>

    <div>
      <table-page
        :type="$options.name"
        :button="['del', 'map']"
        :page="pageStatus"
        @reload="getTableInfo"
        :columns="tableColumn"
        :tableData="rowData"
      >
        <div slot-scope="data">
          <middle-excel-export-byarray
            v-if="!!data.selectArray.length"
            :type="$options.name"
            style="margin-top: 18px; float: left; margin-left: 10px;"
            :download="download"
            :selectItem="data.selectArray"
          ></middle-excel-export-byarray>
        </div>
      </table-page>

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
  name: 'support',
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
    download (downloadInfo) {
      return [
        {
          name: this.$i18n.t('_view.exportBDData'),
          args: { ...downloadInfo.args, coordinatesType: 'BD' },
          url: downloadInfo.url,
          permission: () => auth('cdgqdgl.r') && auth('excelmanage.export')
        },
        {
          name: this.$i18n.t('_view.exportWGSData'),
          args: { ...downloadInfo.args, coordinatesType: 'WGS' },
          url: downloadInfo.url,
          permission: () => auth('cdgqdgl.r') && auth('excelmanage.export')
        },
        {
          name: this.$i18n.t('_view.exportGCJData'),
          args: { ...downloadInfo.args, coordinatesType: 'GCJ' },
          url: downloadInfo.url,
          permission: () => auth('cdgqdgl.r') && auth('excelmanage.export')
        },
      ]
    },
    upload (info) {
      return [
        {
          name: '导入数据-BD坐标',
          args: { ...info.args, coordinatesType: 'BD' },
          url: info.url,
          permission: () => auth('cdgqdgl.r') && auth('excelmanage.input')
        },
        {
          name: '导入数据-WGS坐标',
          args: { ...info.args, coordinatesType: 'WGS' },
          url: info.url,
          permission: () => auth('cdgqdgl.r') && auth('excelmanage.input')
        },
        {
          name: '导入数据-GCJ坐标',
          args: { ...info.args, coordinatesType: 'GCJ' },
          url: info.url,
          permission: () => auth('cdgqdgl.r') && auth('excelmanage.input')
        },
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
      return [...table, this.tableOperating]
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
