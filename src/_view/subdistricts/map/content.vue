<template>
  <div v-loading="loading">
    <div>
      <middle-next-map
        :mapPrefix="'subdistricts-map'"
        @mapReady="mapReady"
        :mapStyle="mapStyle"
        :zoom="15"
        :center="info"
      ></middle-next-map>
    </div>
  </div>
</template>

<script>
import { Subdistricts } from '@/_middle/map/class/handle/subdistricts';


export default {
  name: 'ContentPage',
  props: {
    request: Object,
    info: Object
  },
  data () {
    return {
      fullData: {},
      loading: false,
      showInfo: [],
      mapStyle: {
        width: '88vw',
        height: '80vh'
      },
      mapDom: null
    }
  },
  watch: {
    request: {
      immediate: true,
      handler: function () {
        this.loadInfo()
      },
      deep: true
    }
  },
  methods: {
    mapReady (map) {
      this.map = map
      this.mapDom = new Subdistricts(map)
    },
    loadInfo () {
      this.loading = true
      this.request
        .readOneTable({ info: this.info })
        .then(res => { this.fullData = res.data })
        .then(() => { this.mapDom.show([this.fullData]) })
        .finally(() => this.loading = false)
    }
  }
}
</script>
