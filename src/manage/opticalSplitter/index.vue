<template>
  <div>
    <!-- 表格搜索 -->
    <div style="display: flex;">
      <table-search
        :keys="$options.name"
        @returnSearch="(a) => {pageStatus = {...pageStatus, ...a}}"
      >
        <div style="display: flex;">
          <use-rote-switch @returnData="(a) => {pageStatus = {...pageStatus, ...a}}"></use-rote-switch>
          <middle-excel-export-import :type="$options.name" :download="download" :upload="upload"></middle-excel-export-import>
        </div>
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
      ></table-page>

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
import useRoteSwitch from '@/public/useRate/switch'
import table from './tableColumn.js'
import { auth } from '@/_command/excelPermissions'

export default {
  name: 'opticalSplitter',
  components: {
    alertPage,
    tableSearch,
    editInfo,
    tablePage,
    PagingPage,
    useRoteSwitch
  },
  data () {
    return {
      typeList: [
        'BD',
        'GCJ',
        'WGS'
      ],
      baProvince: [],
      baCity: [],
      baCountry: [],
      exportObj: [],
      exportId: [],
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
          name: '导出Excel',
          args: downloadInfo.args,
          url: downloadInfo.url,
          permission: () => auth('fgq.r') && auth('excelmanage.export')
        },
      ]
    },
    upload (uploadInfo) {
      return [
        {
          name: '导入Excel',
          args: uploadInfo.args,
          url: uploadInfo.url,
          permission: () => auth('fgq.r') && auth('excelmanage.input')
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
    this.$getDepartmentsList(this.$options.name, { baseConfig: this.$allConfig, key: 'sysDepartments' })
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
