<template>
  <div style="overflow:auto; margin-top: 30px;" @wheel.prevent="mouseWheel" ref="mouseWhell">
    <odf-occ-pic :info="jumpInfo"></odf-occ-pic>
  </div>
</template>

<script>
import odfOccPic from '@/public/odfOccPic'

export default {
  name: 'lightPathPica',
  components: {
    odfOccPic
  },
  props: {
    info: {
      default: () => { },
      type: Object
    }
  },
  computed: {
    jumpInfo: function () {
      // 提交jumpinfo到Vuex, 如果jumpInfo不存在或者为空的时候默认使用模板
      if (!this._.isEmpty(this.info)) {
        this.$store.commit('setAll', this.info)
      } else {
        // 提交使用默认初始化模板
        this.$store.commit('setDefaultLightRoad')
      }
      return this.info ? this.info.jumpInfo : {}
    }
  },
  methods: {
    mouseWheel (e) {
      this.$refs.mouseWhell.scrollLeft = this.$refs.mouseWhell.scrollLeft + e.deltaY
    }
  }
}
</script>
