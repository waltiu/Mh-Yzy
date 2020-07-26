<template>
  <div>
    <div class="leftBorder-font">
      <div class="leftBorder-custom"></div>
      <p>{{$t('BResources.businessLink')}}:</p>
    </div>

    <div style="overflow:auto; margin-top: 30px;" @wheel.prevent="mouseWheel" ref="mouseWhell">
      <business-pic :info="linkInfo"></business-pic>
    </div>
  </div>
</template>

<script>
import businessPic from '@/public/businessPic'

export default {
  name: 'lightPathPic',
  components: {
    businessPic
  },
  props: {
    info: {
      default: () => { },
      type: Object
    }
  },
  computed: {
    linkInfo: function () {
      if (!this._.isEmpty(this.info)) {
        let infoaaa = this._.cloneDeep(this.info)
        // 默认Array
        let data = this.info.linkInfo && this.info.linkInfo.node ? this.info.linkInfo.node : []
        let tmp = []

        for (const iterator of data) {
          if (Object.keys(iterator).length) {
            tmp.push(iterator)
          }
        }
        infoaaa.linkInfo = { node: tmp }
        this.$store.commit('setBussinessPathLinkInfo', infoaaa)
        return tmp
      } else {
        return {}
      }
    }
  },
  methods: {
    mouseWheel (e) {
      this.$refs.mouseWhell.scrollLeft = this.$refs.mouseWhell.scrollLeft + e.deltaY
    }
  }
}
</script>
