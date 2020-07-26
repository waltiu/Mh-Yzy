<template>
  <div>
    <info-map-show :propStyle="{width: '100%', height: '70vh'}" @mapReady="mapReady">
      <!-- bar -->
      <div slot="bar">
        <add-card :geoTool="mapinfo" :mapDom="mapDom"></add-card>
      </div>
    </info-map-show>
  </div>
</template>

<script>
import { GeoFences } from '@/_public/map/class/GeoFences'
import addCard from './addCard'
import { GeoTool } from '@/_public/map/class/GeoTool.js'

export default {
  name: 'editOnMap',
  data () {
    return {
      mapDom: {},
      mapinfo: {}
    }
  },
  props: {
    fullData: Object
  },
  components: {
    addCard
  },
  watch: {
    fullData: function (newVal) {
      let info = []
      if (newVal.geofence && newVal.geofence.info) {
        info = newVal.geofence.info.map(item => [item.lng, item.lat])
      } else {
        info = []
      }
      // this.mapDom.setGeo(info)
      this.mapinfo.setGeo(info)
    }
  },
  methods: {
    mapReady (map) {
      this.mapinfo = new GeoTool(map)
      this.mapDom = new GeoFences(map, this)
      // this.mapDom.changeEditStatus(true)

      // this.mapDom.on('finish', (item) => {
      //   this.$emit('returnData', item.map(item => {
      //     return {
      //       lng: item[0],
      //       lat: item[1]
      //     }
      //   }))
      // })

      this.mapinfo.on('finish', (item) => {
        this.$emit('returnData', item.map(item => {
          return {
            lng: item[0],
            lat: item[1]
          }
        }))
      })

      this.$watch('fullData.geofence.info', (newVal) => {
        newVal = newVal ? newVal.map(item => [item.lng, item.lat]) : newVal
        this.$store.commit('setMapStatus', {
          key: 'geoFencesList',
          status: newVal
        })
      }, { deep: true })
    }
  }
}
</script>
