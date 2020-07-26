<template>
  <div>
    <map-library @mapReady="mapReady"></map-library>
  </div>
</template>

<script>
import mapLibrary from './mapLibrary'
import { WatchMap } from '@/_public/map/class/WatchMap'
// import { Well } from '@/_middle/map/class/handle/well'

export default {
  name: 'infoMapShow',
  components: {
    mapLibrary
  },
  data () {
    return {
      map: {}
    }
  },
  beforeDestroy () {
    // 销毁监听器
    this.map.destroyedWatch()
  },
  mounted () {

  },
  methods: {
    mapReady (map) {
      // 实列化 Map

      this.map = new WatchMap(map, this)
      this.$emit('mapReady', map)
    }
  }
}
</script>
