<template>
  <div>
    <!-- 透传参数和事件 -->
    <public-next-map v-bind="compeutedProps" v-on="$listeners">
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </public-next-map>
  </div>
</template>

<script>

export default {
  name: 'MiddleNextMap',
  computed: {
    compeutedProps: function () {
      return {
        ...this.$attrs,
        // 默认中心
        center: this.$attrs.center || this.$store.state.infoMapShow.mapProperty.center,
        zoom: this.$attrs.zoom || this.$store.state.infoMapShow.mapProperty.zoom
      }
    }
  }
}
</script>
