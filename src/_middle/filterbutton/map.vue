<template>
  <div style="display: flex;">
    <div v-for="item in buttonList" :key="item">
      <float-button
        v-model="formData[item]"
        @change="checkOutData"
      >{{ `${$t($store.state.vendor.vendorName[item].name)} ${showInfo[item].length}` }}</float-button>
    </div>
  </div>
</template>

<script>
import FloatButton from '@/_public/filterbutton/three'

export default {
  name: 'FilterButtonInMap',
  components: {
    FloatButton
  },
  props: {
    defaultVal: Object,
    // [mapInfo, mapInfo]
    mapInfo: [Array, Object]
  },
  data () {
    return {
      formData: {}
    }
  },
  computed: {
    rawInfo: function () {
      if (Array.isArray(this.mapInfo)) {
        return this.mapInfo
      } else {
        return [this.mapInfo]
      }
    },
    buttonList: function () {
      if (this.rawInfo[0]) {
        return Object
          .keys(this.rawInfo[0])
          .filter(item => !['CenterLat', 'CenterLng', 'zoom'].includes(item))
      } else {
        return []
      }
    },
    showInfo: function () {
      return this.rawInfo.reduce((res, val) => {
        Object.entries(val)
          .forEach(([key, val]) => {
            res[key] = res[key] || []
            res[key].push(...val)
          })

        return res
      }, {})
    }
  },
  watch: {
    rawInfo: function () {
      this.checkOutData()
    },

    defaultVal: {
      immediate: true,
      handler: function (newVal) {
        if (!newVal) return
        this.formData = this.buttonList
          .reduce((res, val) => {
            res[val] = !!newVal[val]
            return res
          }, {})
      },
      deep: true
    },
    showInfo: {
      handler: function (newVal) {
        let a = { ...newVal }
        Object.entries(a).map(item => {
          if (item[1].length > 0) {
            this.defaultVal[item[0]] = true
          } else {
            this.defaultVal[item[0]] = false

          }
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    checkOutData () {
      let a = Object
        .entries(this.showInfo)
        .map(([key, val]) => [key, this.formData[key] ? val : []])
      let out = Object.fromEntries(a)
      this.$emit('returnData', out)
    }
  }
}
</script>
