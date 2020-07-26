<template>
  <div>
    <el-dialog
      :append-to-body="appendToBody"
      :top="top"
      :modal="modal"
      :title="title"
      :visible.sync="baseStatus"
      :width="width"
      :before-close="rowHandleClose"
      @close="close"
      :close-on-click-modal="false"
    >
      <slot v-if="baseStatus" :methods="{close, open}"></slot>

      <span slot="footer">
        <slot name="footer" :methods="{close, open}"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isTrue } from '@/_command/tools'

export default {
  name: 'NextAlertPage',
  props: {
    appendToBody: Boolean,
    top: String,
    info: null,
    title: String,
    width: String,
    handleClose: Function,
    modal: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      baseStatus: false
    }
  },
  watch: {
    info: {
      immediate: true,
      handler: function (newVal) {
        this.baseStatus = isTrue(newVal)
      },
      deep: true
    },
    baseStatus: function (newVal) {
      this.$emit('statusChange', newVal)
    }
  },
  methods: {
    rowHandleClose (done) {
      if (this.handleClose) {
        this.handleClose(done)
      } else {
        done()
        this.$emit('close')
      }
    },
    close () {
      this.baseStatus = false
      this.$emit('close')
    },
    open () {
      this.baseStatus = true
      this.$emit('open')
    }
  }
}
</script>
