<template>
  <div>
    <!-- 表格搜索 -->
    <div style="display: flex;">
      <table-search
        :keys="$options.name"
        @returnSearch="(a) => {pageStatus = {...pageStatus, ...a}}"
        :attachData="[
      {title: $t('OS.departmentId'), key: 'departmentId',
      permission: 'bmgl.r',
      list: $checkOutObjFromArray( {key: 'sysDepartments'}, $allConfig[$options.name]).list, filter: (info) => info.id},
      {title: $t('tableSearch.loginName'), key: 'loginName'}
      ]"
      >
        <el-button
          size="mini"
          @click="() => { selectArrayForEditAndAdd = {'add': 0} }"
          type="primary"
          icon="el-icon-plus"
        >{{$t('user.addUser')}}</el-button>
      </table-search>
    </div>

    <div>
      <table-page
        :type="$options.name"
        :button="['del']"
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

export default {
  name: 'user',
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
    getTableInfo () {
      // 重置状态
      this.rowData = [0]
      this.$http.get(this.$pageUrl[this.$options.name].url, {
        params: { ...this.$pageUrl[this.$options.name].args, ...this.pageStatus }
      })
        .then((res) => {
          this.total = res.data.page.totalElements
          this.rowData = this.$checkOutData(res)
          console.log(this.rowData)
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
    // 获取 工程单位list
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
