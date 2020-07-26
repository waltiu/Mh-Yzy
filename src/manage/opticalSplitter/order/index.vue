<template>
  <!-- 表格, 在上层接受参数 -->
  <div>
    <table-search-bar
      preSearchString
      :keys="$options.name"
      :config="'$orderConfig'"
      @returnSearch="(a) => {pageStatus = {...pageStatus, ...a}}"
      :attachData="[
      {title: $t('OS.orderNumber'), key: 'orderNumber'},
      {title: $t('OS.departmentId'), key: 'departmentId',
      permission: 'bmgl.r',
      list: $checkOutObjFromArray( {key: 'departmentId'}, $orderConfig['opticalSplitter']).list, filter: (info) => info.id},
      {title: $t('OS.orderStatus'), key: 'state', list: [{
        id: 'uncommitted',
        name: $t('OS.toBeSubmitted')
      }, {
        id: 'unreviewed',
        name: $t('OS.toBeAudited')
      }, {
        id: 'finish',
        name: $t('OS.complete')
      }], filter: (info) => info.id},
      {title: $t('OS.timesOut'), key: 'isExpire', list: [{
        id: true,
        name: $t('OS.yes')
      }, {
        id: false,
        name: $t('OS.no')
      }]}
      ]"
    >
      <!-- <div style="font-size: 12px;">
        是否超时:
        <el-switch v-model="pageStatus.isExpire"></el-switch>
      </div>-->
    </table-search-bar>

    <md-attach
      :permissionKey="'$orderPermission'"
      :type="'opticalSplitter'"
      @add="() => { selectArrayForEditAndAdd = {'add': 0} }"
      @upload="(a) => { selectDownload = {...a} }"
      :info="{upload: {}}"
    ></md-attach>

    <slot name="table" :tableData="rowData">
      <table-page
        :type="'opticalSplitter'"
        :button="[]"
        :page="pageStatus"
        @reload="getTableInfo"
        :columns="[...$orderConfig['opticalSplitter'], addOne]"
        :tableData="rowData"
      >
        <div slot="errorButton"></div>

        <div slot-scope="selectArray">
          <el-button
            @click="checkOut(selectArray.selectArray)"
            v-if="!_.isEmpty(selectArray.selectArray)"
            style="margin-left: 10px; margin-top: 18px; float: left;"
            size="small"
          >{{$t('opticalSplitter.exportSelected')}}</el-button>
        </div>
      </table-page>
    </slot>

    <paging-page :page.sync="pageStatus" :total="total"></paging-page>

    <edit-and-add
      @reload="getTableInfo()"
      :type="$options.name"
      :columns="$orderConfig['opticalSplitter']"
      :tableData="selectArrayForEditAndAdd"
    ></edit-and-add>

    <alert-page
      @close="getTableInfo()"
      :columns="$orderConfig['opticalSplitter']"
      :selectArrayShow="selectArrayForShow"
      :type="$options.name"
    ></alert-page>
  </div>
</template>

<script>
import { http } from '@/_command/http';
import editAndAdd from './editAndAdd'
import tablePage from '@/public/table'
import alertPage from './alertPage'

export default {
  name: 'opticalSplitter',
  components: {
    editAndAdd,
    tablePage,
    alertPage
  },
  data () {
    return {
      total: 0,
      pageStatus: {
        size: 10,
        page: 0,
        orderNumber: '',
        departmentId: '',
        name: '%%',
        isExpire: undefined
      },
      selectArrayForShow: {},
      rowData: [],
      deleteArray: [],
      selectArrayForEditAndAdd: {},
      addOne: {
        title: 'tableSearch.operation',
        tableDisplay: true,
        editDisplay: false,
        align: 'center',
        width: 200,
        render: (h, params) =>
          <div style="display: flex">
            {this.$store.getters.getUserRole.includes(this.$orderPermission[this.$options.name].key + '.r')
              ? <el-button type="primary" size="mini"
                onClick={() => { this.selectArrayForShow = { ...params.row } }}>{this.$i18n.t('alert.view')}</el-button>
              : ''}
            {this.$store.getters.getUserRole.includes(this.$orderPermission[this.$options.name].key + '.u')
              ? <el-button type="primary" size="mini"
                onClick={() => { this.selectArrayForEditAndAdd = { ...params.row } }}>{this.$i18n.t('main.edit')}</el-button>
              : ''}
            {this.$store.getters.getUserRole.includes(this.$orderPermission[this.$options.name].key + '.d')
              ? <el-button type="danger" size="mini"
                onClick={() => { this.deleteArray = { ...params.row } }}>{this.$i18n.t('addZone.delete')}</el-button>
              : ''}
          </div>
      }
    }
  },
  watch: {
    pageStatus: {
      handler: function () {
        this.getTableInfo()
      },
      deep: true
    },
    deleteArray: function (newVal) {
      if (newVal) {
        this.deleteAlert([newVal])
        this.deleteArray = null
      }
    }
  },

  methods: {
    checkOut (args) {
      let fin = args.map(item => Number(item.id))
      this.$http.post('/api/ldsysOpticalSplitterOrders/excelDownloadIds', fin, {
        responseType: 'blob'
      })
        .then((response) => {
          this.$downloadFile(response)
        })
    },
    deleteAlert ([newVal]) {
      this.$confirm(this.$i18n.t('business.delete') + this.$i18n.t('business.entry'), {
        type: 'warning'
      }).then(() => {
        http.delete(`/api/ldsysOpticalSplitterOrders/${newVal.id}`)
          .then(
            this.getTableInfo()
          )      })
    },
    getTableInfo () {
      this.rowData = [0]
      this.$http.get(this.$orderUrl['opticalSplitter'].url, {
        params: { ...this.pageStatus, ...this.$orderUrl['opticalSplitter'].args }
      })
        .then((res) => {
          this.total = res.data.page.totalElements
          this.rowData = this.$checkOutData(res)
          // for (let i = 0; i <= this.rowData.length; i++) {
          //   if (this.rowData[i].isBindQRCode === '已绑定') {
          //     this.rowData[i].isBindQRCode = 'yes'
          //   } else {
          //     this.rowData[i].isBindQRCode = 'no'
          //   }
          // }
        })

    }
  },
  mounted () {
    this.getTableInfo()
    // 获取 工程单位list
  }
}
</script>
