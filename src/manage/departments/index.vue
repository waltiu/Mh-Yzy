<template>
  <!-- 工程单位 -->
  <div>
    <el-button
      type="primary"
      class="el-icon-plus"
      style="margin-bottom: 10px;"
      size="small"
      @click="() => {selectArrayForEditAndAdd = {add: 0}}"
    >{{$t('main.increase')}}</el-button>

    <table-and-paging :colums="colums" :tableData="fullData || []"></table-and-paging>

    <edit-info @reload="getTableInfo()" :type="$options.name" :tableData="selectArrayForEditAndAdd"></edit-info>
  </div>
</template>

<script>
import editInfo from './editAndAdd'

export default {
  name: 'departments',
  components: {
    editInfo
  },
  data () {
    return {
      selectArrayForEditAndAdd: {},
      colums: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: 'tableSearch.operation',
          key: 'troubleId',
          render: (h, params) =>
            <div class>
              <el-button type="primary" style="margin-right:5px" size="mini"
                onClick={() => { this.selectArrayForEditAndAdd = { ...params.row } }}>{this.$i18n.t('main.edit')}</el-button>
              <el-button type="danger" style="margin-right:5px" size="mini"
                onClick={() => { this.deleteItem(params.row) }}>{this.$i18n.t('addZone.delete')}</el-button>
            </div>
        }
      ],
      fullData: []
    }
  },
  methods: {
    deleteItem (info) {
      this.$resourceOperating({
        name: this.$options.name,
        type: 'delete',
        info: info
      }, (a) => {
        this.$checkStatus(a)
        this.getTableInfo()
      })
    },
    getTableInfo () {
      this.$getTablePageInfo({
        type: this.$options.name,
        args: {}
      }, (a) => {
        this.fullData = a.data
      })
    }
  },
  mounted () {
    this.getTableInfo()
  }
}
</script>
