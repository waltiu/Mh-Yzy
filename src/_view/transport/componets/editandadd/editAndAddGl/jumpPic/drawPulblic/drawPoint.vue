<template>
  <div :style="{
    display: 'flex',
    width: 'auto'
  }">
    <div>
      <img
        :src="type.icon"
        @click="emitInfo"
        :style="{
        'margin': '2px',
        height: type.size + 'px',
        width: type.size + 'px'
      }"
      />
    </div>
    <div @click="emitInfo" style="margin-left: 10px;">
      <p>{{ info.name }}</p>

      <div style="display: flex">
        <p>{{ info.portA }}</p>
        <p>{{ info.portB ? ` ｜ ${info.portB}` : '' }}</p>
      </div>

      <hr v-show="info.portAJump && info.portBJump" />

      <div style="display: flex">
        <p>{{info.portAJump }}</p>
        <p>{{info.portBJump ? ` ｜ ${info.portBJump}` : '' }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'drawPoint',
  props: {
    type: Object,
    info: Object
  },
  methods: {
    emitInfo () {
      this.$store.commit('changeDrawArray', "");
      this.$emit('returnData', this.info)
    }
  }
}
</script>
