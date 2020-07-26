<template>
  <div>
    <base-info-alert
      @close="$emit('close')"
      :columns="columns"
      :selectArrayShow="fullData"
      :type="type"
      :editTf="editTf"
    ></base-info-alert>
  </div>
</template>

<script>
export default {
  name: 'geoFencesAlertPage',
  props: {
    columns: Array,
    selectArrayShow: Object,
    type: String,
    editTf: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      fullData: {}
    }
  },
  watch: {
    editMapInfo: {
      handler: function (newVal) {
        if (newVal && newVal.mapType !== 'cran' && newVal.mapType !== 'machine' && newVal.mapType !== 'subdistricts') {
          this.fullData = newVal
        }
      },
      immediate: true,
      deep: true
    },
    selectArrayShow: {
      handler: function (newVal) {
        this.fullData = newVal
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    editMapInfo: function () {
      return this.$store.state.mapEditInfo
    }
  }

}
</script>
