<template>
  <!-- 选择ODF, 光交可用端口, 传入useInfos后自动识别信息, 完成分片, 分型号的传递 -->
  <dialog-page :info="rowInfo" :modal="false" :title="$t('opticalSplitter.selectPort')">
    <div v-loading="loading">
      <show-port :info="rawUseInfo" @selectPort="selectPort"></show-port>
    </div>

    <div slot="footer"></div>
  </dialog-page>
</template>

<script>
import showPort from '@/public/OdfOccPort/lightRoad.vue'

export default {
  name: 'selectPort',
  props: {
    info: Object
  },
  components: {
    showPort
  },
  data () {
    return {
      rowInfo: {},
      loading: true,
      rawUseInfo: {}
    }
  },
  methods: {
    selectPort (args) {
      // if (args.type === 'use') {
      this.$emit('selectPort', args.show)
      this.rowInfo = {}
      // }
    },
    computedArray (num) {
      if (num) {
        return [...Array(Number(num)).keys()]
      } return []
    },
    getFullInfo () {
      if (!this._.isEmpty(this.info)) {
        this.loading = true
        this.$getTableFullInfo('switchY', this.info, (e) => {
          this.loading = false
          this.rawUseInfo = { ...e.data }
        })
      }
    }
  },
  watch: {
    info: {
      handler: function (newVal) {
        this.rowInfo = { ...newVal }
        this.getFullInfo()
      },
      deep: true
    }
  }
}
</script>
