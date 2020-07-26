<template>
  <div>
    <middle-next-map
      :mapPrefix="'businessnet-map'"
      @mapReady="mapReady"
      :mapStyle="mapStyle"
      :zoom="mapZoom"
      :center="center"
    ></middle-next-map>
  </div>
</template>


<script>
import { DeviceRoom } from '@/_middle/map/class/handle/deviceRoom.js'
import { Subdistricts } from '@/_middle/map/class/handle/subdistricts.js'
import { Geofences } from '@/_middle/map/class/handle/geoFences';
import { http } from '@/_command/http';
import { checkOutData } from '@/_command/tools';
import { dottedLineHandle } from './dottedLineHandle'

export default {
  name: 'ShowInfoOnMap',
  props: {
    eventBus: Object
  },
  data () {
    return {
      list: [],
      mapStyle: {
        width: '55vw',
        height: '58vh'
      },
      center: null

    }
  },
  computed: {
    mapZoom: function () {
      return 12
    }
  },

  methods: {
    mapReady (map) {
      this.map = map

      http.get('/api/ldsysGeofences', { params: { page: 0, size: 100000 } })
        .then(checkOutData)
        .then(res => new Geofences(this.map).show(res))
        .then(thismap => thismap.layer.setZIndex(1))

      this.mapDom = new DeviceRoom(map)
      this.mapDom.layer.setZIndex(3)

      this.eventBus.fullData && this.eventBus.fullData.lng && this.eventBus.fullData.lat ?
        new Subdistricts(map)
          .show([this.eventBus.fullData])
          .layer.setZIndex(2)
        : ''

      this.dottedLineDom = new dottedLineHandle(map)


    }
  },
  mounted () {
    this.eventBus
      .on('ToMapToShow', res => {
        this.mapDom.show(res || [])
        if (res && res.length) {
          this.center = { lng: res[0].lng, lat: res[0].lat }
        }
      })
      .on('ToMapToShow', res => { this.list = res })
      .on('ToShowList', roomlist => {

        let res = this.eventBus.fullData
        let start = [Number(res.lng), Number(res.lat)]

        let zz = roomlist
          .map(item => [start, [Number(item.lng), Number(item.lat)]])
        this.dottedLineDom.show(zz)


      })
  }
}
</script>

<style>
.button-float {
  display: flex;
  float: left;
  /* margin-top: 10px; */
  z-index: 2000;
  position: absolute;
}
</style>
