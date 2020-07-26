<template>
  <div>
    <el-button
      :type="buttonType"
      @click="change"
      size="small"
      round
      style="margin-left: 10px; margin-top: 10px;"
    >
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'customButton',
  props: {
    // 默认值
    value: Boolean
  },
  data () {
    return {
      status: this.value
    }
  },
  methods: {
    change () {
      this.status = !this.status
      this.$emit('input', this.status)
      this.$emit('change', this.status)
    }
  },
  computed: {
    buttonType: function () {
      if (this.status) {
        return 'primary'
      } else {
        return 'info'
      }
    }
  }
}
</script>
