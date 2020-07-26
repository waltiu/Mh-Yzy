<template>
  <div class="show-point">
    <div @click="click(0, pointOne)" class="point-display">
      <show-point :type="pointOne.type"></show-point>
      {{ pointOne.name }}
    </div>

    <div class="point-line">
      <div class="point-line-line"></div>
      {{ fullData.name }}
    </div>

    <div @click="click(1, pointTwo)" class="point-display">
      <show-point :type="pointTwo.type"></show-point>
      {{ pointTwo.name }}
    </div>
  </div>
</template>

<script>
import showPoint from './point'

export default {
  name: 'RelatedPoint',
  props: {
    fullData: Object
  },
  components: {
    showPoint
  },
  computed: {
    points: function () {
      return this.fullData.ldsysPoints || []
    },
    pointOne: function () {
      return this.points[0] || { a: 1 }
    },
    pointTwo: function () {
      return this.points[1] || { a: 1 }
    }
  },
  methods: {
    click (index, info) {
      this.$emit('return-click', index, info)
    }
  }
}
</script>

<style scoped>
.show-point {
  display: flex;
  justify-content: space-between;
}
.point-display {
  text-align: center;
}
.point-line {
  width: 100%;
  text-align: center;
}
.point-line-line {
  height: 0px;
  border: 3px black solid;
  margin-top: 20px;
}
</style>
