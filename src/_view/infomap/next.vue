<template>
  <div>
    <public-event-map :mapPrefix="mapPrefix" :zoom="zoom" :center="center" :mapStyle="mapStyle"></public-event-map>
  </div>
</template>


<script>


export default {
  name: 'NextInfoMap',
  computed: {
    mapStyle: function () {
      return {
        width: '100%',
        height: '99vh'
      }
    },
    center: function () {
      return {
        lng: 0,
        lat: 0
      }
    },
    zoom: function () {
      return 18
    },
    mapPrefix: function () {
      return 'INFOMAP-PREFIX'
    }
  }
}
</script>