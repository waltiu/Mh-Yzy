<template>
  <div>
    <middle-next-map
      :mapPrefix="'businessnet-map'"
      @mapReady="mapReady"
      :mapStyle="mapStyle"
      :zoom="mapZoom"
    >
      <middle-filter-button-in-map
        :style="{
          width: mapStyle.width || 'auto',
           'flex-wrap': 'wrap'
        }"
        :defaultVal="defaultVal"
        class="button-float"
        :mapInfo="mapInfo"
        @returnData="renderInfo"
      ></middle-filter-button-in-map>
    </middle-next-map>
  </div>
</template>


<script>
import { LightRoad } from '@/_middle/map/class/showcomplex/lightRoad'

export default {
  name: 'ShowInfoOnMap',
  props: {
    showInfo: Array
  },
  data () {
    return {
      defaultVal: {
        'wellLineSection': true,
        'supportLineSection': true,
        'ledUp': true,
        'equipment': true,
        'poleLineSection': true,
        'ledUpLineSection': true,
        'pole': true,
        'occ': true,
        'odf': true,
        'oc': true,
        'well': true,
        'machineRoom': true,
        'support': true
      },
      mapStyle: {
        width: '55vw',
        height: '45vh'
      }
    }
  },
  computed: {
    mapInfo: function () {
      if (this.showInfo && this.showInfo.length) {
        return this.showInfo.map(item => item.mapInfo)
      } else {
        return [
          {
            'wellLineSection': [],
            'supportLineSection': [],
            'ledUp': [],
            'equipment': [],
            'poleLineSection': [],
            'ledUpLineSection': [],
            'pole': [],
            'occ': [],
            'odf': [],
            'oc': [],
            'well': [],
            'machineRoom': [],
            'support': []
          }
        ]
      }
    },
    mapZoom: function () {
      return 12
    }
  },
  methods: {
    renderInfo (info) {
      this.mapDom.show(info)
    },
    mapReady (map) {
      this.mapDom = new LightRoad(map)
    }
  },
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
