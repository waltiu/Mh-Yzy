<template>
  <div>
    <public-data-table-view :tableData="info.ldsysFormedJumpFibers" :column="columnComplex"></public-data-table-view>
  </div>
</template>

<script>
import show from './button'
import { unixms2date } from '@/_command/tools';
import showError from '../error/show.vue'

export default {
  name: 'ldsysFormedJumpFibersTable',
  props: {
    bus: Object,
    info: Object
  },
  computed: {
    columnComplex: function () {
      return [
        {
          title: '名称',
          key: 'name'
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
          render (h, params) {
            return h(show, {
              props: {
                info: params.row,
                bus: this.bus
              }
            })
          },
        }
      ]
    }
  }
}
</script>