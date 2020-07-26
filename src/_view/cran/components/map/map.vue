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
        <topbutton
          :style="{
          width: mapStyle.width || '100%',
           'flex-wrap': 'wrap'
        }"
          class="button-float"
          :mapInfo="mapInfo"
          @returnData="renderInfo"
        ></topbutton>
        <!-- <bar-page
          v-if="fullscreenControl"
          :mapStyle="mapStyle3"
          :mapDom="map"
          :style="{'z-index': '999', position: 'absolute', 'right': 0}"
        >
          <div slot="barMenu">
            <slot name="bar"></slot>
          </div>
        </bar-page>-->
        <div
          v-if="$store.state.infoMapShow.loadingStatus"
          :style="{'z-index': '999', position: 'absolute',top:'650px',left:'20px'}"
        >
          <div v-loading="$store.state.infoMapShow.loadingStatus"></div>

          <div style="margin-top: 30px;">
            <center>
              <B>{{$t('public.loading')}}...</B>
              <p>{{ $store.state.infoMapShow.loading }}</p>
            </center>
          </div>
        </div>

        <slot></slot>
      </div>
    </middle-next-map>
  </div>
</template>


<script>
import { WyIcon } from './icon'
// import barPage from '@/manage/infoMap/bar'
import { LightRoad } from '@/_middle/map/class/showcomplex/lightRoad'
import { http } from '@/_command/http';
import topbutton from './button'
export default {
  name: 'showInfoBaseOnMap',
  components: {
    // barPage,
    topbutton
  },
  props: {
    mapStyle: {
      default: () => {
        return {
          width: '58vw',
          height: '65vh'
        }
      },
      type: Object
    },
    fullData: Object,
    showInfo: Array,
    addData: Array,
    layerContor: Boolean
  },
  watch: {
    showInfo: function (newVal) {
      this.showInfoBase = newVal
      this.map.setZoom(newVal[0].zoom)
      if (newVal[0].centerLng) {
        this.map.setCenter([newVal[0].centerLng, newVal[0].centerLat])
      }
    },
    addData: function (newVal) {
      this.map.removeLayer('devicelay')
      this.Icon = new WyIcon(this.map)
      this.Icon.show(newVal)
    },
    fullData (newVal) {
      if (newVal) {
        this.map.setZoom(newVal.zoom)
        this.map.setCenter([newVal.centerLng, newVal.centerLat])
        if (newVal.centerLng === 0) {


          this.$store.commit('setSysStatus', {
            info: {
              msg: '暂无地图数据！',
              code: '500',
              time: new Date(),
              msgEn: '暂无地图数据！'
            },
            key: 'httpErr',
          })
        }
      }
    },

  },

  data () {
    return {
      reloadingstatus: false,
      showInfoBase: [],
      map: {},
      color: {},
      mapDom: {},
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
      },
      mapStyle3: {
        width: '100%',
        height: '78vh'
      },
      fullscreenControl: true,
      readMap: []
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
      this.readMap = info
      if (this.mapDom) {
        this.mapDom.show(info)

      }
    },
    mapReady (map) {
      this.map = map
      this.mapDom = new LightRoad(map)
      if (this.readMap) {
        this.mapDom.show(this.readMap)

      }
      if (this.addData) {
        this.Icon = new WyIcon(this.map)
        this.Icon.show(this.addData)
      }
      if (this.fullData) {

        if (this.fullData.centerLng === 0) {


          this.$store.commit('setSysStatus', {
            info: {
              msg: '暂无地图数据！',
              code: '500',
              time: new Date(),
              msgEn: '暂无地图数据！'
            },
            key: 'httpErr',
          })
        } else {
          this.map.setZoom(this.fullData.zoom)
          this.map.setCenter([this.fullData.centerLng, this.fullData.centerLat])
        }
      }
    }

  },
  mounted () {
    if (this.showInfo) {
      this.showInfoBase = this.showInfo
    }
    this.$store.commit('setAllButtonStatus', false)
    // 销毁组件后自动重置所有显示
    this.$store.commit('setMapStatus', {
      key: 'showInMap',
      status: {}
    })
    if (this.layerContor) {
      this.fullscreenControl = false
    }
  }
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
