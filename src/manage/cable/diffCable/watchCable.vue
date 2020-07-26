<template>
  <div>
    <dialog-page :info="displayInfo" :title="$t('cable.viewCable')" v-loading="loading">
      <info-map @mapReady="mapReady"></info-map>
    </dialog-page>
  </div>
</template>

<script>
import infoMap from '@/manage/infoMap/mapLibrary.vue'
import { WatchCable } from '@/_public/map/class/WatchCable'

export default {
  name: 'watchCable',
  components: {
    infoMap
  },
  props: {
    displayInfo: Array
  },
  data () {
    return {
      loading: true,
      mapDom: {}
    }
  },
  computed: {
    renderColor () {
      return this.displayInfo.reduce((res, val) => {
        res[val.id] = val.maptalksColor
        return res
      }, {})
    }
  },
  methods: {
    mapReady (map) {
      this.mapDom = new WatchCable(map, this)
      this.mapDom.render(this.displayInfo)
    },
    getAndRender (args) {
      this.$http.post('/api/ldsysOpticalCables/search/findIds', args.map(item => item.id))
        .then((result) => {
          this.loading = false
          let res = result.data.map(item => {
            return {
              ...item,
              maptalksColor: this.renderColor[item.id]
            }
          })
          this.$setMapCenter(result.data[0])
          this.mapDom.render(res)
        })
    }
  },
  watch: {
    displayInfo: function (newVal) {
      this.$nextTick(() => {
        this.getAndRender(newVal)
      })
    }
  }
}
</script>
