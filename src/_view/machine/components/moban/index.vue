<template>
  <div>
    <component
      :is="currentComponent"
      :type="type"
      :fullData="fullData.detailInfos"
      @submitData="submitData"
    ></component>
  </div>
</template>

<script>
import three from './three/three'
import sixteenA from './siexteenA/sixteenA'
import sixteenB from './siexteenB/sixteenB'
export default {
  name: 'moban',
  props: {
    templateInfo: Object,
    fullData: Object,
    type: [String, Number]
  },
  provide () {
    return {
      id: this
    }
  },

  components: {
    three,
    sixteenA,
    sixteenB
  },
  data () {
    return {
      currentComponent: three
    }
  },
  methods: {
    submitData (info) {
      this.$emit('submitData', {
        detailInfos: info
      })
    }
  },
  watch: {
    templateInfo: {
      handler: function (newVal, oldVal) {
        if (newVal.model === 'FONST1000(1UC)') {
          this.currentComponent = three
        } else if (newVal.model === 'FONST3000(3UC)' && newVal.type === 0) {
          this.currentComponent = sixteenA

        } else if (newVal.model === 'FONST3000(3UC)' && newVal.type === 1) {
          this.currentComponent = sixteenB

        }
        if (!oldVal.machineFrameUseInfos) {
          this.fullData.detailInfos = {}

        }
      },
      deep: true,
      immediate: true
    },

  }


}
</script>

<style>
</style>