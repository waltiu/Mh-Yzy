<template>
  <div>
    <slot></slot>

    <div :id="mapClassName" :style="{...mapStyle, 'z-index': '-1'}"></div>
  </div>
</template>

<script>
import * as maptalks from 'maptalks'

export default {
  name: 'mapTools',
  props: {
    mapStyle: Object,
    center: [Object, String],
    zoom: [String, Number],
    type: {
      type: String,
      default: 'WatchMap'
    },
    mapPrefix: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      map: {},
      controlGroup: {
        overviewControl: {},
      },
      mapLayer: [
        new maptalks.TileLayer(this.$i18n.t('infoMap.BDMapStandard'), {
          'urlTemplate': 'http://online4.map.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=300',
          spatialReference: {
            projection: 'baidu'
          },
          'coordinate': 'BD',
          'subdomains': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          'attribution': '&copy; Dreamcatchers'
        }),
        new maptalks.TileLayer(this.$i18n.t('infoMap.BDMapSatelliteMap'), {
          'visible': false,
          'urlTemplate': 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
          'subdomains': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          spatialReference: {
            projection: 'baidu'
          },
          'coordinate': 'BD',
          'attribution': '&copy; Dreamcatchers'
        }),
        new maptalks.TileLayer(this.$i18n.t('infoMap.GoogleVectorMap'), {
          'visible': false,
          'coordinate': 'GCJ',
          'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/GoogleChinaMap/Google/{z}/{x}/{y}.png',
          'attribution': '&copy; <a href="http://ditu.google.cn/">Google</a>'
        }),
        new maptalks.TileLayer(this.$i18n.t('infoMap.GoogleSatelliteMap'), {
          'visible': false,
          'coordinate': 'GCJ',
          'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/GoogleChinaHybridMap/Google/{z}/{x}/{y}.png',
          'attribution': '&copy; <a href="http://ditu.google.cn/">Google</a>'
        }),
        new maptalks.TileLayer(this.$i18n.t('infoMap.GDVectorMap'), {
          'visible': false,
          'coordinate': 'GCJ',
          'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/AMap/Google/{z}/{x}/{y}.png',
          'attribution': '&copy; <a href="http://ditu.google.cn/">Google</a>'
        }),
        new maptalks.TileLayer(this.$i18n.t('infoMap.GDSatelliteMap'), {
          'visible': false,
          'coordinate': 'GCJ',
          'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/AHybridMap/Google/{z}/{x}/{y}.png',
          'attribution': '&copy; <a href="http://map.amap.cn/">AMAP</a>'
        }),
        new maptalks.TileLayer(this.$i18n.t('infoMap.TDVectorMap'), {
          'visible': false,
          'coordinate': 'WGS',
          'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/TiandituMap3857/Google/{z}/{x}/{y}.png',
          'attribution': '&copy; <a href="http://map.amap.cn/">AMAP</a>'
        }),
        new maptalks.TileLayer(this.$i18n.t('infoMap.TDSatelliteMap'), {
          'visible': false,
          'coordinate': 'WGS',
          'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/TiandituHybridMap3857/Google/{z}/{x}/{y}.png',
          'attribution': '&copy; <a href="http://map.amap.cn/">AMAP</a>'
        }),
      ]
    }
  },
  beforeDestroy () {
    this.map.remove()
  },
  computed: {
    mapClassName: function () {
      return 'map' + this.mapPrefix + Math.random()
    },
    centerAndZoom: function () {
      let prop = this.$store.state.infoMapShow.mapProperty
      return {
        center: [prop.center.lng, prop.center.lat],
        zoom: prop.zoom
      }
    }
  },
  watch: {
    '$store.state.infoMapShow.mapProperty': function (newVal) {
      this.map.off('moveend')
      this.map.setCenterAndZoom(
        new maptalks.Coordinate(this.centerAndZoom.center),
        newVal.zoom
      )
    }
  },
  mounted () {
    this.map = new maptalks.Map(this.mapClassName, {
      center: new maptalks.Coordinate(this.centerAndZoom.center),
      zoom: this.centerAndZoom.zoom,
      minZoom: 5,
      maxZoom: 19,
      pitch: 0,
      bearing: 0,
      maxPitch: 61,
      baseLayer: new maptalks.GroupTileLayer('Base TileLayer', this.mapLayer)
    })

    this.initMapControl()

    this.$emit('mapReady', this.map, this.controlGroup)
    this.mapEvent()
  },
  methods: {
    initMapControl () {
      this.controlGroup.overviewControl = new maptalks.control.Overview().addTo(this.map)
      this.controlGroup.overviewControl.hide()
    },
    mapEvent () {
      this.map.on('viewchange', (p) => {
        this.$emit('dragend', new maptalks.Coordinate(p.new.center))
        this.$emit('zoomend', p.new.zoom)
      })
    }
  }
}
</script>

<style>
.maptalks-layer-switcher {
  margin-top: 250px;
}
</style>
