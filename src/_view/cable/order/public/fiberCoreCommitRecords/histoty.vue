<template>
  <div>
    <public-data-table-view :tableData="info.fiberCoreCommitRecords.info" :column="columnComplex"></public-data-table-view>
  </div>
</template>


<script>
import show from './button'
import { parseTime } from '../../lib/tools';
import showError from '../error/show.vue'

export default {
  name: 'HistoryCommit',
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
          title: '提交时间',
          key: 'timestamp',
          render (h, params) {
            return h('div', parseTime(params.row.timestamp))
          },
        },
        {
          title: '操作',
          render (h, params) {
            return h(show, {
              props: {
                bus: this.bus,
                info: params.row
              }
            })
          },
        }
      ]
    }
  }
}
</script>