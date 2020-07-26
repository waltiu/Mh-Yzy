<template>
  <!-- 公共组件, 用来弹框 -->
  <el-dialog
    top="10vh"
    :modal-append-to-body="false"
    :title="$t('alert.informationView')"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="closeDialog"
  >
    <no-dialog :table="table" :info="info"></no-dialog>

    <slot></slot>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">{{$t('opticalSplitter.determine')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import noDialog from './noDialog'

export default {
  name: 'alrtInfoPage',
  props: {
    table: Array, // 表格表头
    info: Object // 要展示的数据
  },
  components: {
    noDialog
  },
  data: () => ({
    dialogVisible: false
  }),
  watch: {
    info: function (newVal) {
      if (newVal) {
        this.dialogVisible = true
      }
    }
  },
  methods: {
    closeDialog () {
      this.dialogVisible = false
      this.$emit('update:info', null)
    }
  }
}
</script>
