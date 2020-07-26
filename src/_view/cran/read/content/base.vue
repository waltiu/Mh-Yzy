<template>
  <div style="display:flex">
    <base-form :tableColumn="tableColumn" :fullData="fullData"></base-form>
    <card style="margin-left:10px" :fullData="fullData"></card>
  </div>
</template>

<script>
import card from './card'
import baseForm from './form'

export default {
  name: 'baseTable',
  props: {
    tableColumn: Array,
    fullData: Object
  },
  components: {
    card,
    baseForm
  },
  data () {
    return {
      formData: {
        lng: '',
        lat: ''

      },
      selectPointInMap: {}
    }
  },
  methods: {
    getLocation (e) {
      this.formData.lng = e.lng
      this.formData.lat = e.lat
    }
  },
  watch: {
    formData: {
      handler: function (newVal) {
        return newVal
      },
      deep: true
    }
  }
}
</script>