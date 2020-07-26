<template>
  <div style="margin-right: 8px;">
    <data-manager-card></data-manager-card>
    <search-all></search-all>

    <select-city></select-city>

    <slot name="mainBar"></slot>

    <geo-fences></geo-fences>
    <point-card></point-card>
    <section-card></section-card>
    <!-- 杆路 管道 -->
    <line-card></line-card>

    <device-point-card></device-point-card>
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

export default {
  name: 'mainBar',
  components: {
    selectCity,
    lineCard,
    devicePointCard,
    // cableCard,
    sectionCard,
    pointCard,
    dataManagerCard,
    searchAll,
    geoFences
  }
}
</script>
