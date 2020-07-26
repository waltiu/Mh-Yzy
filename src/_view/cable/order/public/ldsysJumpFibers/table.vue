<template>
  <div>
    <public-data-table-view :tableData="tableData" :column="columnComplex"></public-data-table-view>
  </div>
</template>

<script>
import JumpDialog from './button'
import { unixms2date } from '@/_command/tools';
import showError from '../error/show.vue'

export default {
  name: 'JumpFibersTable',
  props: {
    bus: Object
  },
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    columnComplex: function () {
      return [
        {
          title: '业务名称',
          key: 'serviceName'
        },
        {
          title: '定位异常',
          key: 'locationError',
          render (h,p) {
            let type = p.row.locationError ? 'danger' : 'success'
            let text = p.row.locationError ? '异常' : '正常'
            return h(showError, {
              props:{
                type,
                text
              }
            })
          },
          
        },
        {
          title: '修改时间',
          key: 'gmtModified',
          render (h,params) {
            let stat = unixms2date(params.row.gmtModified)
            return h('div', stat)
          },
          
        },
        {
          title: '操作',
          render: (h, params) => {
            return h(JumpDialog, {
              props: {
                bus: this.bus,
                info: params.row
              }
            })
          },
        }
      ]
    }
  },
  watch: {
    bus: {
      immediate: true,
      handler: function () {
        this.bus
          .on('FullChange', res => this.tableData = res.ldsysJumpFibers || [])
      }
    }
  },
}
</script>