<template>
  <fullscreen ref="fullscreen" @change="fullscreenChange">
    <public-map
      :mapPrefix="mapPrefix"
      @mapReady="upEvent"
      :mapStyle="mapStyle3"
      @dragend="updateCenter"
      @zoomend="updataZoom"
      :center="mapCenter"
      :zoom="mapZoom"
    >
      <div
        :style="{'z-index': '999', position: 'absolute', 'left': '40px', top: '14px', 'display':'flex'}"
      >
        <search-all-location></search-all-location>

        <layer-switcher
          @layer-change="(a,b,c) => { $emit('layer-change', a,b,c) }"
          :map="mapDom"
          :style="{'margin-left': '10px'}"
        ></layer-switcher>
      </div>

      <zoom-control
        :style="{'z-index': '998', position: 'absolute', 'left': '40px', top: '70px',}"
        :map="mapDom"
      ></zoom-control>

      <bar-page
        :mapDom="mapDom"
        v-if="mapDisplayControlStatus.barControl"
        :mapStyle="mapStyle3"
        :style="{'z-index': '999', position: 'absolute', 'right': 0}"
      >
        <div slot="barMenu">
          <slot name="bar"></slot>
        </div>
      </bar-page>

      <div :style="{'z-index': '1001', position: 'absolute', 'bottom': '80px', 'left': '40px'}">
        <div v-if="mapDisplayControlStatus.fullscreenControl">
          <md-button @click="toggle" class="md-fab md-mini md-primary">
            <md-icon>fullscreen</md-icon>
          </md-button>
        </div>

        <div>
          <md-button
            v-if="mapDisplayControlStatus.visibilityControl"
            @click="setPitch"
            class="md-fab md-mini md-primary"
          >
            <md-icon>visibility</md-icon>
          </md-button>
        </div>
      </div>

      <!-- 正在加载 -->
      <div
        v-if="$store.state.infoMapShow.loadingStatus && mapDisplayControlStatus.loadingControl"
        :style="{'z-index': '1001', position: 'absolute', 'bottom': '60px', left: '100px'}"
      >
        <div v-loading="$store.state.infoMapShow.loadingStatus"></div>

        <div style="margin-top: 30px;">
          <center>
            <B>{{$t('public.loading')}}...</B>
            <p>{{ $store.state.infoMapShow.loading }}</p>
          </center>
        </div>
      </div>

      <!-- 插槽 -->
      <div :style="{'z-index': '1001', position: 'absolute'}">
        <slot></slot>
      </div>
    </public-map>
    <!-- 拖拽mark修改经纬度dialog -->
    <change-point />
  </fullscreen>
</template>

<script>

import barPage from './bar'
import changePoint from './changePoint'
import searchAllLocation from './location'
import layerSwitcher from '@/_middle/map/layerswitcher'
import zoomControl from './zoom'

export default {
  name: 'mapLibrary',
  components: {
    barPage,
    changePoint,
    searchAllLocation,
    layerSwitcher,
    zoomControl
  },
  props: {
    propStyle: Object,
    mapPrefix: String,
    center: Object,
    mapDisplayControl: {
      default: () => {
        return {
          zoomControl: true,
          barControl: true,
          fullscreenControl: true,
          visibilityControl: true,
          overviewControl: true,
          loadingControl: true,
          layerSwitcherControl: true
        }
      },
      type: Object
    }
  },
  data () {
    return {
      mapDom: {},
      keyword: '',
      fullscreen: false,
      map: {},
      controlGroup: [
        'zoomControl', 'barControl', 'fullscreenControl', 'visibilityControl', 'overviewControl', 'loadingControl', 'layerSwitcherControl'
      ]
    }
  },
  computed: {
    mapCenter: function () {
      return this.center || this.$store.state.infoMapShow.mapProperty.center
    },
    mapZoom: function () {
      return this.zoom || this.$store.state.infoMapShow.mapProperty.zoom
    },
    // 抹平 undefined
    mapDisplayControlStatus: function () {
      return this.controlGroup.reduce((res, val) => {
        res[val] = this.mapDisplayControl[val] === undefined || this.mapDisplayControl[val]
        return res
      }, {})
    },
    mapStyle3: function () {
      if (this.fullscreen) {
        return { width: '100%', height: '100vh' }
      } else {
        if (this.propStyle) {
          return this.propStyle
        }
        return { width: '100%', height: '88vh' }
      }
    }
  },
  destroyed () {
    // 关闭所有按钮
    this.$store.commit('setAllButtonStatus', false)
    // 销毁组件后自动重置所有显示
    this.$store.commit('setMapStatus', {
      key: 'showInMap',
      status: {}
    })
  },
  methods: {
    setPitch () {
      this.mapDom.animateTo({
        bearing: 0,
        pitch: this.mapDom.getPitch() > 10 ? 0 : 61
      }, { duration: 1000 })
    },
    upEvent (map, group) {
      // 初始化控件状态
      Object.entries(this.mapDisplayControlStatus).forEach(([key, val]) => {
        if (group[key] === undefined) return
        if (val) {
          group[key].show()
        } else {
          group[key].hide()
        }
      })

      this.mapDom = map
      this.$emit('mapReady', map, group)
    },
    toggle () {
      this.$refs['fullscreen'].toggle()
    },
    fullscreenChange (status) {
      this.fullscreen = status
    },
    updateCenter (e) {
      this.$store.commit('setMapCenter', e)
    },
    updataZoom (e) {
      this.$store.commit('setMapZoom', e)
    },
    emitEvent (e) {
      this.$emit('returnEvent', e)
    }
  }
}
</script>
