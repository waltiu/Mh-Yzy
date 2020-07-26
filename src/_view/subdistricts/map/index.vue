<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="() => { show = {...info} }"
    >{{$t('alert.map')}}</el-button>

    <public-alert-page :info="show" :title="$t('infoMap.viewMap')" :width="'90vw'" :top="'5vh'">
      <map-show :request="request" :info="info"></map-show>
    </public-alert-page>
  </div>
</template>

<script>
import MapShow from './content.vue'

export default {
  name: 'ShowInMap',
  props: {
    request: Object,
    info: Object
  },
  components: {
    MapShow
  },
  data () {
    return {
      show: {},
    }
  },
}
</script>
