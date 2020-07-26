<template>
  <div>
    <div style="display: flex; ">
      <filter-in-map class="item-show" :showInfo="resultArray"></filter-in-map>
      <search-result class="item-show" :result="resultArray" @deleteInfo="deleteInfo"></search-result>
    </div>
    <search-item style="margin: 10px" @returnData="upemit"></search-item>
  </div>
</template>

<script>
import FilterInMap from './filterinmap'
import SearchResult from './searchresult'
import SearchItem from './search'

export default {
  name: 'EditBusiness',
  components: {
    FilterInMap,
    SearchResult,
    SearchItem
  },
  props: {
    fullData: Object
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
        this.resultArray = newVal.ldsysOpticalCableWays || []
      },
      deep: true
    }
  },
  methods: {
    upemit (newVal) {
      this.resultArray.push(newVal)
      this.$emit('returnData', {
        ldsysOpticalCableWays: this.resultArray
      })
    },
    deleteInfo (newVal) {
      this.resultArray = newVal
      this.$emit('returnData', {
        ldsysOpticalCableWays: this.resultArray
      })
    }
  }
}
</script>

<style>
.item-show {
  margin: 10px;
}
</style>