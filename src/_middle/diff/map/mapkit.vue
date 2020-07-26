<template>
  <div>
    <middle-next-map :mapStyle="mapStyle" @mapReady="mapReady"></middle-next-map>
  </div>
</template>

<script>
export default {
  name: 'MapKit',
  props: {
    info: Object
  },
  data () {
    return {
      mapStyle: {
        width: '86vw',
        height: '60vh'
      },
    }
  },
  methods: {
    mapReady () {

    }
  },
}
</script>
