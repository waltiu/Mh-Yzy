<template>
  <!-- 通用内容组件 -->
  <div>
    <div>
      <slot></slot>
    </div>

    <div style="display: list-item;">
      <slot name="switchSlot"></slot>

      <slot name="switchButtonSlot">
        <div style="margin-top: 4px">
          <div style="float: right;">
            <el-switch
              v-model="switchStatus"
              @change="(status) => {$emit('status-change', status)}"
            ></el-switch>
          </div>
          <div v-if="icons[name]" style="float: right;margin-right: 10px;">
            <img :src="'data:image/png;base64,' + icons[name]" alt srcset />
          </div>

          <div
            v-if="$store.getters.vendorNameByTypeArray[name] && name"
            :style="{border: '2px solid ' + $store.getters.vendorNameByTypeArray[name].color, width: '50px', height: '1px', 'margin-top': '16px', 'margin-right': '10px'}"
          ></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contentSlot',
  props: {
    name: String
  },
  computed: {
    icons: function () {
      return { ...this.$store.state.icons }
    },
    switchStatus: {
      get: function () {
        return this.$store.state.infoMapShow.buttonStatus[this.name]
      },
      set: function (newVal) {
        console.log(this.name)
        this.$store.commit('setButtonStatus', { [this.name]: newVal })
      }
    },
    computedNum: function () {
      let store = this.$store.state.infoMapShow
      if (store.inputSelect[name] && !this._.isEmpty(store.inputSelect[name].display)) {
        return store.inputSelect[name].display.length
      }
      if (store.showInMap[this.name] && !this._.isEmpty(store.showInMap[this.name])) {
        return store.showInMap[this.name].length
      }
      return 0
    }
  }
}
</script>
