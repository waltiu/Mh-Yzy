<template>
  <div>
    <alert-page
      :columns="$allConfig[$options.name]"
      :selectArrayShow="selectArrayForShow"
      :type="$options.name"
    ></alert-page>

    <table-list
      ref="tablelist"
      :type="$options.name"
      :tableButtom="['del', 'map']"
      :tableButtomAttach="tableButtom"
    >
      <div slot="search-bar-attach" slot-scope="father">
        <switch-status @returnData="(info) => {bindData(info, father)}"></switch-status>
      </div>

      <div slot-scope="father">
        <edit-and-add
          @updated="father.this.getTableInfo()"
          :type="$options.name"
          :tableData="selectArrayForEditAndAdd"
        ></edit-and-add>
      </div>
    </table-list>

    <md-attach
      :type="$options.name"
      @add="() => { selectArrayForEditAndAdd = {'add': 0} }"
      @upload="(a) => { selectDownload = {...a} }"
    ></md-attach>
  </div>
</template>

<script>
import alertPage from './alertPage'
import editAndAdd from './editAndAdd'
import switchStatus from './switchStatus'

export default {
  name: 'error',
  components: {
    alertPage, editAndAdd, switchStatus
  },
  data () {
    return {
      pageStatus: {},
      selectArrayForShow: {},
      selectArrayForEditAndAdd: {},
      tableButtom: {
        title: 'tableSearch.operation',
        tableDisplay: true,
        editDisplay: false,
        width: 400,
        render: (h, params) =>
          <div class>
            {this.$checkPermission(this.$options.name, 'r')
              ? <el-button type="primary" size="mini"
                onClick={() => { this.selectArrayForShow = { ...params.row } }}>{this.$i18n.t('alert.view')}</el-button>
              : ''}
            {this.$checkPermission(this.$options.name, 'u')
              ? <el-button type="primary" size="mini"
                onClick={() => { this.selectArrayForEditAndAdd = { ...params.row } }}>{this.$i18n.t('main.edit')}</el-button>
              : ''}
            {this.$checkPermission(this.$options.name, 'u') && !this.pageStatus.isFix
              ? <el-button type="success" size="mini"
                onClick={() => { this.fixed(params.row) }}>{this.$i18n.t('alert.completeRepair')}</el-button>
              : ''}
            {this.$checkPermission(this.$options.name, 'u') && this.pageStatus.isFix && !this.pageStatus.isFixConfirm
              ? <el-button type="success" size="mini"
                onClick={() => { this.fixedConfirm(params.row) }}>{this.$i18n.t('alert.comfirmRepair')}</el-button>
              : ''}
          </div>
      }
    }
  },
  methods: {
    bindData (info, father) {
      father.self.pageStatus = { ...father.self.pageStatus, ...info }
      this.pageStatus = father.self.pageStatus
    },
    fixed (info) {
      this.$resourceOperating({
        name: this.$options.name,
        type: 'update',
        info: { id: info.id, isFix: true }
      }, e => {
        this.$checkStatus(e)
        this.$refs.tablelist.getTableInfo()
      })
    },
    fixedConfirm (info) {
      this.$resourceOperating({
        name: this.$options.name,
        type: 'update',
        info: { id: info.id, isFixConfirm: true }
      }, e => {
        this.$checkStatus(e)
        this.$refs.tablelist.getTableInfo()
      })
    }
  }
}
</script>
