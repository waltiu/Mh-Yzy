<template>
  <div>
    <related-point :fullData="fullData" @return-click="openEdit"></related-point>

    <change-info :allowTypes="allowTypes" :changeInfo="ldsysInfo" @returnData="emitData"></change-info>
  </div>
</template>

<script>
import RelatedPoint from './index'
import changeInfo from './change'

export default {
  name: 'RelatedPointWithModel',
  components: {
    RelatedPoint, changeInfo
  },
  props: {
    fullData: Object,
    allowTypes: Array
  },
  data () {
    return {
      ldsysInfo: {},
      index: null
    }
  },
  methods: {
    openEdit (index, info) {
      this.ldsysInfo = { ...info }
      this.index = index
    },
    emitData (info) {
      let returnInfo = this.fullData.ldsysPoints
      returnInfo[this.index] = info
      this.$emit('returnData', {
        ldsysPoints: returnInfo
      })
    }
  },
}
</script>
