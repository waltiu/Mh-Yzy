<template>
  <div style="display: flex;">
    <el-button
      :loading="loading"
      v-if="nextaction.action"
      :size="size"
      @click="changeStatus(nextaction.action)"
    >{{ nextaction.name }}</el-button>
    <el-button
      :loading="loading"
      v-if="backaction.action"
      :size="size"
      type="danger"
      @click="changeStatus(backaction.action)"
    >{{ backaction.name }}</el-button>
  </div>
</template>


<script>
import { CableOrder } from '../../lib/cableorder';
import { auth } from '@/_command/excelPermissions';

export default {
  name: 'ChangeOrderStatus',
  props: {
    info: Object,
    size: {
      type: String,
      default: 'mini'
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    eventbus: function () {
      return new CableOrder()
    },
    backaction: function () {
      let action
      let name
      // let permission
      switch (this.info.state) {
        case 'uncommitted':
          action = null
          name = null
          // permission = false
          break;

        case 'unreviewed':
          action = 'orderCommitRollback'
          name = '撤销提交'
          // permission = this.auth('')
          break;

        case 'finish':
          action = 'orderCheckRollback'
          name = '工程审核不通过'
          // permission = this.auth()
          break;

      }

      return {
        // permission,
        action,
        name
      }
    },
    nextaction: function () {
      let action
      let name
      // let permission
      switch (this.info.state) {
        case 'uncommitted':
          action = null
          name = null
          // permission = this.auth()
          // action = 'orderCommit'
          // name = '工单提交'
          break;

        case 'unreviewed':
          action = 'orderCheckPass'
          name = '工程审核通过'
          // permission = this.auth()
          break;

        case 'finish':
          action = null
          name = null
          // permission = this.auth()
          break;

      }
      return {
        // permission,
        action,
        name
      }
    }
  },
  methods: {
    auth: (key) => auth(`xxgdgl.${key}`),
    changeStatus (action) {
      const { changeOrderStatus } = this.eventbus
      this.loading = true

      changeOrderStatus(this.info.id, action)
        .then(res => res.data)
        .then(() => this.$message.success(`${this.info.name} 状态更新成功`))
        .then(() => this.$emit('statusChange', true))
        .catch(this.$message.error)
        .finally(() => this.loading = false)
    }
  }
}
</script>