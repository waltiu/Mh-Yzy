<template>
  <!-- 显示图中的线  -->
  <div style="diaplay: flex;">
    <div v-for="(a, index) in lineNum" :key="index" @click="emitInfo" :style="style"></div>
    <p @click="emitInfo" style="padding-top: 5px; padding-left: 30px;">{{ info.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'cable',
  props: {
    // 单线或双线
    num: {
      default: 0,
      type: Number
    },
    info: Object
  },
  computed: {
    lineNum: function () {
      return [...Array(this.num).keys()]
    },
    style: function () {
      // 虚线或实线
      let lineType = ''
      if (this.info.id || this.info.id > 0) {
        lineType = 'solid'
      } else {
        lineType = 'dashed'
      }
      return { 'margin-left': '8px', float: 'left', border: `2px ${lineType} red`, width: '2px', height: '30px' }
    }
  },
  methods: {
    emitInfo () {
      // this.$emit('returnData', this.info)
    }
  }
}
</script>
