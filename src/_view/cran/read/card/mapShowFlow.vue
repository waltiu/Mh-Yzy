<template>
  <div>
    <map-show :showInfo="showInfo" :fullData="fullData" :addData="addData"></map-show>
  </div>
</template>

<script>
import mapShow from '../../components/map/map.vue'
export default {
  name: 'mapFlow',
  components: {
    mapShow
  },
  props: {
    defaulData: Object
  },
  data () {
    return {
      showInfo: [],
      fullData: {},
      addData: []
    }
  },
  watch: {
    defaulData: {
      handler: function (NEWvAL) {
        this.fullData = NEWvAL
        this.showInfo = NEWvAL.ldsysOpticalCableWays
        this.addData.push(NEWvAL)
      },
      immediate: true
    }
  },

}
</script>

<style>
</style>