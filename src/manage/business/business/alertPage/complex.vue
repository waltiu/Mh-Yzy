<template>
  <div>
    <div style="display: flex; ">
      <filter-in-map class="item-show" :showInfo="resultArray"></filter-in-map>
      <search-result :type="type" class="item-show" :result="resultArray"></search-result>
    </div>
  </div>
</template>

<script>
import FilterInMap from '../editAndAdd/filterinmap.vue'
import SearchResult from '../editAndAdd/searchresult'

export default {
  name: 'EditBusiness',
  components: {
    FilterInMap,
    SearchResult,
  },
  props: {
    fullData: Object,
    type: String
  },
  data () {
    return {
      resultArray: []
    }
  },
  watch: {
    fullData: {
      immediate: true,
      handler: function (newVal) {
        this.resultArray = newVal.ldsysOpticalCableWays
      },
      deep: true
    }
  },
}
</script>

<style>
.item-show {
  margin: 10px;
}
</style>