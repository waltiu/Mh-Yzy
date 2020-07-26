<template>
  <div style="display: flex;" @wheel.stop="() => {}">
    <img
      @click="$store.commit('setSecondaryObject', { key: 'bar', secKey: 'status', status: false })"
      src="/icons/bar/bar.png"
      style="height: 60px;margin-top: 42vh"
      alt="bar"
      class="rotateimg180"
    />

    <!-- 显示 bar 栏 -->
    <div class="bar" :style="barStyle">
      <!-- 搜索 -->
      <!-- 搜索结束 -->
      <main-bar :mapDom="mapDom" v-if="update">
        <div slot="mainBar">
          <slot name="drawer-layout"></slot>
        </div>
      </main-bar>
    </div>
  </div>
</template>

<script>
import mainBar from './mainBar'

export default {
  name: 'drawerLayer',
  components: {
    mainBar
  },
  props: {
    mapDom: Object,
    mapStyle: Object,
    status: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      update: true
    }
  },
  computed: {
    barStyle: function () {
      return {
        height: this.mapStyle.height
      }
    },
    barStatus: function () {
      return this.$store.state.infoMapShow.bar.status
    }
  },
  methods: {
  },
  mounted () {

  }

}
</script>

<style>
.bar {
  width: 350px;
  position: relative;
  overflow-y: auto;
  /* height: calc(100vh - 90px); */
  background: hsla(0, 0%, 100%, 0.6);
  z-index: initial;
}
.bar::-webkit-scrollbar {
  display: none;
}

.rotateimg180 {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}
.checkBox {
  margin-top: 5px;
  width: 100%;
}
</style>
