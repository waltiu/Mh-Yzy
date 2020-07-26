<template>
  <div>
    <show-table-info :table="columns" :info="fullData" :type="type"></show-table-info>
  </div>
</template>

<script>

export default {
  name: 'odfAlertPage',
  props: {
    type: String,
    selectArrayShow: Object,
    columns: Array
  },
  data () {
    return {
      loading: true,
      fullData: {}
    }
  },
  watch: {
    selectArrayShow: {
      immediate: true,
      handler: function (newVal) {
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    },
    fullData: function (newVal) {
      return newVal
    },
    columns: function (newVal) {
      return newVal
    }
  }
}
</script>
