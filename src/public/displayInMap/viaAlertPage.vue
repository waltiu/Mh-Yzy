<template>
  <div>
    <div class="leftBorder-font">
      <div class="leftBorder-custom"></div>
      <b>{{$t('alert.map')}}:</b>
    </div>

    <middle-show-in-map :mapStyle="{width: '100%', height: '300px'}" :display="display"></middle-show-in-map>
  </div>
</template>

<script>
import MiddleShowInMap from '@/_middle/showinmap/index.vue'

export default {
  name: 'displayInMapViaAlertPage',
  props: {
    info: Object,
    type: String
  },
  components: {
    MiddleShowInMap
  },
  data () {
    return {}
  },
  computed: {
    display: function () {
      console.log(this.info)
      return [{
        type: this.type,
        info: this.info
      }]
    }
  }
}
</script>
