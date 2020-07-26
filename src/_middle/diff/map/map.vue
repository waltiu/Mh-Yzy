<template>
  <div>
    <el-button size="mini" @click="showInMap">{{$t('infoMap.viewMap')}}</el-button>

    <public-alert-page :info="info" :title="$t('infoMap.viewMap')" :width="'90vw'">
      <map-kit :info="info"></map-kit>
    </public-alert-page>
  </div>
</template>

<script>
import MapKit from './mapkit.vue'

export default {
  name: 'DiffMap',
  props: {
    showData: Object
  },
  data () {
    return {
      info: {}
    }
  },
  components: {
    MapKit
  },
  methods: {
    showInMap () {
      this.info = { ...this.showData }
    }
  }
}
</script>
