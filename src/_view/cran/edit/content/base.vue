<template>
  <div style="display:flex">
    <base-form
      :tableColumn="tableColumn"
      @submitForm="submitForm"
      @templateInfo="templateInfo"
      :fullData="fullData"
      style="width:40%"
    ></base-form>
    <add-cran :fullData="fullData" @changeInfo="changeInfo" style="width:65%"></add-cran>
  </div>
</template>

<script>
import addCran from './card/index'
import baseForm from '../../components/form'

export default {
  name: 'baseTable',
  props: {
    tableColumn: Array,
    fullData: Object
  },
  components: {
    baseForm,
    addCran
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
    },
    templateInfo (info) {
      this.$emit('templateInfo', info)
    },
    submitForm (newVal) {
      this.$emit('submitForm', newVal)
    },
    changeInfo (newVal) {
      this.$emit('changeInfo', newVal)
    }
  }

}
</script>

<style>
.outDoor {
  position: relative;
  right: 55px;
  margin-top: 20px;
  display: flex;
}
.controlWidth {
  width: 500px;
}
</style>