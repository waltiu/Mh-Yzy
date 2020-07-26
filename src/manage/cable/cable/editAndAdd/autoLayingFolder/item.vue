<template>
  <div>
    <select-item
      :label="$t('cable.starPoint')"
      @returnData="(info) => {emitData(info, 'start')}"
      :compentedUrl="computedUrl"
    ></select-item>
    <select-item
      :label="$t('cable.endPoint')"
      @returnData="(info) => {emitData(info, 'end')}"
      :compentedUrl="computedUrl"
    ></select-item>
  </div>
</template>

<script>
import selectItem from './selectItem'

export default {
  name: 'autoLayingItem',
  components: {
    selectItem
  },
  data () {
    return {
      info: {
        start: {},
        end: {}
      }
    }
  },
  computed: {
    computedUrl: function () {
      return this.$store.getters.vendorNameByUseType['item']
        .map(item => item.alert)
        .map(item => this.$autoCompentedUrl[item])
    }
  },
  methods: {
    emitData (info, pos) {
      this.info[pos] = info['info']
      this.$emit('returnData', this.info)
    }
  }
}
</script>
