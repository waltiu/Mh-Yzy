<template>
  <div>
    {{$t('bindPort.the')}}
    <el-input min="1" type="number" size="small" style="width: 11%" v-model="select.frame"></el-input>
    {{$t('bindPort.frame')}} / {{$t('bindPort.the')}}
    <el-input min="1" type="number" size="small" style="width: 11%" v-model="select.disc"></el-input>
    {{$t('bindPort.disk')}} / {{$t('bindPort.the')}}
    <el-input min="1" type="number" size="small" style="width: 11%" v-model="select.port"></el-input>
    {{$t('alert.ports')}}
  </div>
</template>

<script>
export default {
  name: 'selectStartEnd',
  props: {
    info: Object
  },
  data () {
    return {
      select: {}
    }
  },
  watch: {
    select: {
      handler: function () {
        if (this.select.frame && this.select.disc && this.select.port) {
          this.computedInfo()
        }
      },
      deep: true
    }
  },
  methods: {
    computedInfo () {
      // 计算属性
      let discNum = 12 // 一盘12个端子
      let frameNum = Number(this.info.rectangleRowNum) // 一框 n 盘
      let preframeNum = (this.select.frame - 1) * (discNum * frameNum) // 框包含的端口数量
      let preDiscNum = (this.select.disc - 1) * discNum // 盘包含的端口数量
      let all = preframeNum + preDiscNum + Number(this.select.port) - 1// 总数
      this.$emit('returnData', all)
    }
  }
}
</script>
