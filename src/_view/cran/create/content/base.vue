<template>
  <div style="display:flex">
    <base-form
      :tableColumn="tableColumn"
      @submitForm="submitForm"
      @templateInfo="templateInfo"
      style="width:50%"
    ></base-form>
  </div>
</template>

<script>
import baseForm from '../../components/form'

export default {
  name: 'baseTable',
  props: {
    tableColumn: Array
  },
  components: {
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
    },
    templateInfo (info) {
      this.$emit('templateInfo', info)
    },
    submitForm (newVal) {
      this.$emit('submitForm', newVal)
    }
  },
  watch: {
    formData: {
      handler: function (newVal) {
        return newVal
      },
      deep: true
    }
  },

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