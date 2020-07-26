
<template>
  <!-- Bar Status 状态 -->
  <div style="will-change: transform">
    <div
      v-show="show"
      :style="{...barStyle}"
      @click="submitStatus"
      @mouseover="barMouseEvent('over')"
      @mouseout="barMouseEvent('leave')"
    >
      <img src="/icons/bar/bar.png" style="height: 60px;margin-top: 42vh;" alt="bar" />
    </div>

    <transition
      name="slide-fade"
      tag="ul"
      v-on:after-leave="setBarIconStatus"
      v-on:before-enter="setBarIconStatus"
    >
      <drawer-layout :mapStyle="mapStyle" v-show="barStatus" :mapDom="mapDom">
        <div slot="drawer-layout">
          <slot name="barMenu"></slot>
        </div>
      </drawer-layout>
    </transition>
  </div>
</template>

<script>
import drawerLayout from './drawerLayout'

export default {
  name: 'barIndex',
  components: {
    drawerLayout
  },
  props: {
    mapDom: Object,
    mapStyle: Object
  },
  data () {
    return {
      map: {},
      show: false,
      barStyle: {
        'margin-right': '-8px'
      }
    }
  },
  computed: {
    barStatus: function () {
      return this.$store.state.infoMapShow.bar.status
    }
  },
  methods: {
    submitStatus () {
      this.$store.commit('setSecondaryObject', { key: 'bar', secKey: 'status', status: !this.barStatus })
    },
    setBarIconStatus () {
      this.show = !this.barStatus
    },
    barMouseEvent (e) {
      if (e === 'over') {
        this.barStyle = {
          'margin-right': '0px'
        }
      }
      if (e === 'leave') {
        this.barStyle = {
          'margin-right': '-8px'
        }
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(400px);
  /*opacity: 0;*/
}
</style>
