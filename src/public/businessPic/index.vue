<template>
  <div style="display: flex; width: 1000px;">
    <div v-for="(a, index) in store" :key="index" style="display: flex;">

      <point-icon :info="a"></point-icon>

      <line-icon v-if="!((index + 1) == store.length)" style="width: 300px;margin-top: 40px;"></line-icon>

    </div>
  </div>
</template>

<script>
import pointIcon from './point'
import lineIcon from './line'

export default {
  name: 'businessPic',
  components: {
    pointIcon, lineIcon
  },
  props: {
    linkInfo: Array
  },
  computed: {
    store: function () {
      // return Array
      if (!this._.isEmpty(this.linkInfo)) {
        return this.linkInfo
      } else {
        return this.$store.state.bussinessPath.linkInfo.node
      }
    }
  }
}
</script>
