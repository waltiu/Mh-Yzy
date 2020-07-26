<template>
  <div style="display: flex;">
    <el-progress
      style="width: 95%;"
      :show-text="false"
      :stroke-width="18"
      :percentage="Number(progress)"
      :color="color"
    ></el-progress>
    <span :style="{color: color, 'margin-left': '5px'}">{{ progress }}%</span>
  </div>
</template>

<script>
export default {
  name: 'useRate',
  props: {
    max: {
      type: Number || String,
      default: 80
    },
    progress: {
      type: Number || String,
      default: 0
    }
  },
  computed: {
    color: function () {
      if (this.progress >= this.max) {
        return 'red'
      } else {
        return '#2d8cf0'
      }
    }
  }
}
</script>
