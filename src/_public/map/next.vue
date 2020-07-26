<template>
  <div :style="{...mapStyle, 'position':'relative'}">
    <slot></slot>
    <div :id="mapClassName" :style="{...mapStyle, 'z-index': '-1'}"></div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import * as maptalks from 'maptalks'
import { mapLayer } from './maptypes.js'

export default {
  name: 'NextMapTools',
  props: {
    mapStyle: Object,
    center: [Array, Object],
    zoom: Number,
    mapPrefix: String
  },
  data () {
    return {
      map: null,
      moveStatus: false,
    }
  },
  computed: {
    mapClassName: function () {
      return `map-${this.mapPrefix}-${Math.random()}`
    },
    centerRaw: function () {
      if (Array.isArray(this.center)) {
        return this.center
      } else {
        return [this.center.lng, this.center.lat]
      }
    }
  },
  watch: {
    center: {
      handler: function () {
        this.moveMap()
      },
      deep: true
    },
    zoom: {
      handler: function () {
        this.zoomMap()
      }, deep: true
    }
  },
  methods: {
    change () {
      this.$emit('change', {
        center: this.map.getCenter(),
        zoom: this.map.getZoom()
      })
    },
    moveMap () {
      let center = this.map.getCenter()
      if (center.x !== this.centerRaw[0] || center.y !== this.centerRaw[1]) {
        this.moveStatus = true
        this.map.animateTo({
          center: this.centerRaw,
          zoom: this.zoom
        }, { duration: 2000 });
        this.moveStatus = false
      }
    },
    zoomMap () {
      let zoom = this.map.getZoom()
      if (zoom !== this.zoom) {
        this.map.animateTo({
          center: this.centerRaw,
          zoom: this.zoom
        }, { duration: 2000 });
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.map = new maptalks.Map(this.mapClassName, {
        center: new maptalks.Coordinate(this.centerRaw),
        zoom: this.zoom,
        minZoom: 5,
        overviewControl: false,
        maxZoom: 20,
        pitch: 0,
        bearing: 0,
        maxPitch: 61,
        baseLayer: new maptalks.GroupTileLayer('Base TileLayer', mapLayer())
      })
      this.map.on('moveend', () => {
        if (!this.moveStatus) {
          this.change()
          this.$emit('moveed', this.map.getCenter())
        }
      })
      this.map.on('zoomend', () => {
        if (!this.moveStatus) {
          this.change()
          this.$emit('zoomend', this.map.getZoom())
        }
      })
      this.$emit('mapReady', this.map)
    })
  }
}
</script>

<style>
.maptalks-layer-switcher {
  margin-top: 250px;
}
</style>
