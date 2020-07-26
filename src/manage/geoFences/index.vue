<template>
  <div>
    <alert-page
      :columns="$allConfig[$options.name]"
      :selectArrayShow="selectArrayForShow"
      :type="$options.name"
    ></alert-page>

    <table-list
      :type="$options.name"
      :tableButtom="['del', 'map']"
      :tableButtomAttach="tableButtom"
    >
      <div slot-scope="slot">
        <edit-and-add
          @updated="slot.this.getTableInfo()"
          :type="$options.name"
          :tableData="selectArrayForEditAndAdd"
        ></edit-and-add>
      </div>
    </table-list>

    <md-attach
      :info="{upload: {}}"
      :type="$options.name"
      @add="() => { selectArrayForEditAndAdd = {'add': 0} }"
      @upload="(a) => { selectDownload = {...a} }"
    ></md-attach>
  </div>
</template>

<script>
import alertPage from './alertPage'
import editAndAdd from './editAndAdd'

export default {
  name: 'geoFences',
  components: {
    alertPage, editAndAdd
  },
  data () {
    return {
      selectArrayForShow: {},
      selectArrayForEditAndAdd: {},
      tableButtom: {
        title: 'tableSearch.operation',
        tableDisplay: true,
        editDisplay: false,
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
          </div>
      }
    }
  }
}
</script>
