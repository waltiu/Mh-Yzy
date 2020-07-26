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
  computed: {
    map: function () {
      return new maptalks.Map(this.mapClassName, {
        center: new maptalks.Coordinate(this.centerRaw),
        zoom: this.zoom,
        minZoom: 1,
        overviewControl: false,
        maxZoom: 20,
        pitch: 0,
        bearing: 0,
        maxPitch: 61,
        baseLayer: new maptalks.GroupTileLayer('Base TileLayer', mapLayer())
      })
    },
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
    // map: {
    //   immediate: true,
    //   handler: function () {
    //     this.$emit('mapReady', this.map)
    //   }
    // },
    center: {
      handler: function () {
        this.moveMap()
      },
      deep: true
    },
    zoom: {
      handler: function () {
        this.zoomMap()
      },
      deep: true
    }
  },
  methods: {
    moveMap () {
      let center = this.map.getCenter()
      if (center.x !== this.centerRaw[0] || center.y !== this.centerRaw[1]) {
        this.map.animateTo({
          center: this.centerRaw,
          zoom: this.zoom
        },
          { duration: 2000 });
      }
    },
    zoomMap () {
      let zoom = this.map.getZoom()
      if (zoom !== this.zoom) {
        this.map.animateTo({
          center: this.centerRaw,
          zoom: this.zoom
        },
          { duration: 2000 });
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
.maptalks-layer-switcher {
  margin-top: 250px;
}
</style>
