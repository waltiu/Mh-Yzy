<template>
  <dialog-page ref="dialog" :info="point" width="85%" top="1vh" :title="$t('public.selectPoint')">
    <info-map-show
      mapPrefix="selectPoint"
      :propStyle="{width: '100%', height: '87vh','border-radius': '12px'}"
      @mapReady="mapReady"
    ></info-map-show>
    <p slot="footer"></p>
  </dialog-page>
</template>

<script>
import { SelectPoint } from '@/_public/map/class/SelectPoint'

export default {
  name: 'selectPointInMap',
  props: {
    point: Object
  },
  data () {
    return {
      infoWindow: {
        coordinate: {},
        mapDom: () => { }
      }
    }
  },
  watch: {
    point: {
      handler: function () {
        if (this.point && this.point.lng && this.point.lat) {
          this.$setMapCenter(this.point)
        }
      },
      deep: true
    },
    open: function () {
      // 设置地图默认中心
      this.$store.commit('setMapCenter', { lng: '123.441443', lat: '41.825903' })
    }
  },
  methods: {
    mapReady (map) {
      map.on('click', (e) => {
        this.$confirm(this.$i18n.t('tableSearch.longitude') + e.coordinate.x + ' , ' + this.$i18n.t('tableSearch.latitude') + ' ' + e.coordinate.y, this.$i18n.t('public.choosePoint'), {
          customClass: 'alertdialog',
          confirmButtonText: this.$i18n.t('dynamic.determine'),
          cancelButtonText: this.$i18n.t('user.cancel'),
          type: 'warning'
        }).then(() => {
          this.submitPoint({
            lng: e.coordinate.x,
            lat: e.coordinate.y
          })
        })
      })
      this.mapDom = new SelectPoint(map, this)
      this.mapDom.render(this.point)
    },
    submitPoint (info) {
      // 关闭弹框
      this.$refs['dialog'].ok()
      this.$emit('returnData', info)
    }
  }
}
</script>
