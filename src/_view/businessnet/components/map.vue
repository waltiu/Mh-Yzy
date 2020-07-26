<template>
  <div :style="mapStyle">
    <middle-next-map
      :mapPrefix="'businessnet-map'"
      @mapReady="mapReady"
      :mapStyle="mapStyle"
      :zoom="mapZoom"
      v-loading="reloadingstatus"
      element-loading-text="重载数据中..."
    >
      <div class="map-foat">
        <top-button
          :style="{
          width: mapStyle.width || '100%',
           'flex-wrap': 'wrap'
        }"
          class="button-float"
          :defaultVal="defaultVal"
          :mapInfo="mapInfo"
          @returnData="renderInfo"
        ></top-button>

        <div style="margin-top: 80px; position:relative; float: right; right: 50px; display: flex;">
          <middle-layer-switcher :map="map" @layer-change="reload"></middle-layer-switcher>
          <random-color
            style="margin-left: 10px;"
            :show="showInfoBase"
            @returnColor="(info) => { color = info }"
          ></random-color>
        </div>

        <slot></slot>
      </div>
    </middle-next-map>
  </div>
</template>


<script>
import { LightRoad } from '@/_middle/map/class/showcomplex/lightRoad'
import RandomColor from '../components/color'
import { http } from '@/_command/http';
import topButton from '@/_view/transport/componets/map/button'

export default {
  name: 'showInfoBaseOnMap',
  props: {
    mapStyle: {
      default: () => {
        return {
          width: '55vw',
          height: '65vh'
        }
      },
      type: Object
    },
    fullData: Object,
    showInfo: Array
  },
  watch: {
    showInfo: function (newVal) {
      this.showInfoBase = newVal
    }
  },
  components: {
    RandomColor,
    topButton
  },
  data () {
    return {
      reloadingstatus: false,
      showInfoBase: [],
      map: null,
      color: {},
      defaultVal: {
        'wellLineSection': true,
        'supportLineSection': true,
        'ledUp': true,
        'opticalMultiplexer': true,
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
      }
    }
  },
  computed: {
    mapInfo: function () {
      if (this.showInfoBase && this.showInfoBase.length) {
        return this.showInfoBase
          .map(item => {
            return {
              ...item.mapInfo,
              oc: item.mapInfo.oc.map(i => {
                return {
                  ...i,
                  'color': this.color[item.id] || 'red'
                }
              })
            }
          })
      } else {
        return [
          {
            'wellLineSection': [],
            'supportLineSection': [],
            'ledUp': [],
            'opticalMultiplexer': [],
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
    reload (skey, list, coor) {
      if (this.fullData) {
        this.reloadingstatus = true
        http({
          method: 'get',
          url: `/api/ldsysOpticaleCableWorkNets/${this.fullData.id}`,
          headers: {
            coordinate: coor
          },
        })
          .then(res => res.data)
          .then(res => this.showInfoBase = res.ldsysOpticaleCableWorks)
          .finally(() => this.reloadingstatus = false)
      }
    },
    renderInfo (info) {
      this.mapDom.show(info)
    },
    mapReady (map) {
      this.map = map
      this.mapDom = new LightRoad(map)
    }
  },
}
</script>

<style>
.button-float {
  display: flex;
}
.map-foat {
  z-index: 2000;
  position: relative;
}
</style>
