<template>
  <div style="display: flex">
    <el-input :value="coor ? coor.lat : ''">
      <template v-slot:suffix>
        <i class="el-icon-location-information" @click="() => { location = { 1:1 } }"></i>
      </template>
    </el-input>

    <el-input :value="coor ? coor.lng : ''">
      <template v-slot:suffix>
        <i class="el-icon-location-information" @click="() => { location = { 1:1 } }"></i>
      </template>
    </el-input>

    <public-alert-page :info="location" :title="$t('public.selectPoint')" width="90vw" :modal="false">
      <middle-next-map :mapStyle="mapStyle" @mapReady="mapReady" :center="coor" :zoom="10"></middle-next-map>
    </public-alert-page>
  </div>
</template>

<script>
import { SelectPoint } from '@/_public/map/class/SelectPoint'

export default {
  name: 'SelectPointInMap',
  props: {
    coor: Object
  },
  data () {
    return {
      location: null,
      mapStyle: {
        width: '88vw',
        height: '80vh'
      }
    }
  },
  methods: {
    mapReady (map) {
      if (this.coor) {
        this.mapDom = new SelectPoint(map, this)
        this.mapDom.render(this.coor)
      }

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
    },
    submitPoint (info) {
      this.location = null
      this.$emit('returnData', info)
    }
  }
}
</script>
