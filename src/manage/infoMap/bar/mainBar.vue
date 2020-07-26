<template>
  <div style="margin-right: 8px;" v-if="update">
    <data-manager-card></data-manager-card>
    <search-all></search-all>

    <select-city></select-city>

    <slot name="mainBar"></slot>

    <geo-fences></geo-fences>
    <point-card></point-card>
    <section-card></section-card>
    <!-- 杆路 管道 -->
    <line-card></line-card>
    <subdistricts-card style="padding-left: 15px; padding-right: 10px" :map="mapDom"></subdistricts-card>

    <device-point-card :mapDom="mapDom"></device-point-card>
  </div>
</template>

<script>

import pointCard from './childrenCard/point'
import sectionCard from './childrenCard/section'
// import cableCard from './childrenCard/cable'
import devicePointCard from './childrenCard/devicesPoint'
import lineCard from './childrenCard/line'
import dataManagerCard from './childrenCard/dataManagerCard'
import searchAll from './button/searchAll/completeAll'
import geoFences from './childrenCard/fences'
import selectCity from './button/selectCity'


import SubdistrictsCard from '@/_view/infomap/resource/subdistricts/index.vue'

export default {
  name: 'mainBar',
  components: {
    selectCity,
    lineCard,
    devicePointCard,
    SubdistrictsCard,
    // cableCard,
    sectionCard,
    pointCard,
    dataManagerCard,
    searchAll,
    geoFences
  },
  props: {
    mapDom: Object,
  },
  data () {
    return {
      update: true
    }
  },

}
</script>
