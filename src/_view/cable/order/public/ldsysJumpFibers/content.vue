<template>
  <div>
    <el-tabs value="first">
      <el-tab-pane label="基础信息" name="first">
        <public-content :column="tableColumn" :fullData="infoFull"></public-content>
      </el-tab-pane>
      <el-tab-pane label="成端跳纤" name="sec">
        <ldsys-formed-jump-fibers-table :bus="bus" :info="infoFull"></ldsys-formed-jump-fibers-table>
      </el-tab-pane>
      <el-tab-pane label="历史提交" name="thr">
        <history-commit :bus="bus" :info="infoFull"></history-commit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import historyCommit from '../fiberCoreCommitRecords/histoty'
import ldsysFormedJumpFibersTable from '../ldsysFormedJumpFibers/table.vue'
import { CreaterRedColumn } from '@/_config/create';
import {gmtPick} from '@/_command/data'
import showError from '../error/show.vue'

export default {
  name: 'JumpContentInfo',
  props: {
    bus: Object,
    info: Object
  },
  components: {
    historyCommit,
    ldsysFormedJumpFibersTable
  },
  computed: {
    tableColumn: function () {
      return [
        {
          title: '业务名称',
          key: 'serviceName'
        },
        {
          title: '定位异常',
          key: 'locationError',
          render (h) {
            let type = this.$attrs.value ? 'danger' : 'success'
            let text = this.$attrs.value ? '异常' : '正常'
            return h(showError, {
              props:{
                type,
                text
              }
            })
          },
          
        },
        {
          title: '备注',
          key: 'note'
        },
        CreaterRedColumn
      ]
    },
    infoFull: {
      get: function(){
        return gmtPick(this.info)
      }
    }
  }
}
</script>