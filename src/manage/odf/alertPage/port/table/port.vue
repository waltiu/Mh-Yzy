<template>
  <div>
    <odf-occ-port :info="fullData"></odf-occ-port>
  </div>
</template>

<script>
import OdfOccPort from '@/public/OdfOccPort'
export default {
  name: 'portList',
  components: {
    OdfOccPort
  },
  props: {
    fullData: Object
  },
  watch: {
    fullData: function (newVAL) {
      return newVAL
    }
  }

}
</script>

<style>
</style>