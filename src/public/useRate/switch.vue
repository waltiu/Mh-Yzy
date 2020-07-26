<template>
  <div>
    <el-switch v-model="status"></el-switch>
    <span style="font-size: 10px;">{{$t('opticalSplitter.portOccupancyRate')}}≥80%</span>
  </div>
</template>

<script>
export default {
  name: 'usePateSwicth',
  data () {
    return {
      status: false
    }
  },
  watch: {
    status: function (newVal) {
      if (newVal) {
        this.$emit('returnData', { portUseRate: '0.8' })
      } else {
        this.$emit('returnData', { portUseRate: '' })
      }
    }
  }
}
</script>
