<template>
  <div>
    <middle-next-map :mapStyle="mapStyle" @mapReady="mapReady" :center="center" :zoom="zoom"></middle-next-map>
  </div>
</template>

<script>
import { areaToZoom, checkMapCenter } from '@/_command/tools'
import { ShowInMap } from '@/_public/map/class/ShowInMap'

export default {
  name: 'showInMapO',
  props: {
    mapStyle: Object,
    // display: [ {info: Object , type: String } ]
    display: Array
  },
  data () {
    return {
      mapDom: {},
      center: null,
      zoom: 18,
    }
  },
  //小地图不显示
  watch: {
    display: function (newVal) {
      this.center = checkMapCenter(newVal[0].info, newVal[0].type)
      if (newVal[0].type === 'geoFences') {
        areaToZoom(newVal[0].info.geofence.info.map(item => [item.lng, item.lat])) * 100
        this.zoom = 12
      }


      let render = new ShowInMap(this.mapDom, this)

      let info = this.display.reduce((res, val) => {
        res[val.type] = res[val.type] || []
        res[val.type].push(val.info)
        return res
      }, {})

      Object.entries(info).forEach(([key, val]) => {
        if (['poleSection', 'pipeSection', 'citedSection', 'supportSection'].includes(key)) {
          key = 'cable'
        }
        render.render(key, val)
      })
    }
  },
  methods: {
    mapReady (map) {
      this.mapDom = map
    }
  },
}
</script>
