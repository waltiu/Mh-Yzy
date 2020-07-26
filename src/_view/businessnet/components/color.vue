<template>
  <div>
    <el-card v-if="this.show.length!==0">
      <div v-for="(item, index) in show" :key="index" style="display: flex">
        <div
          :style="{ border: `3px ${color[item.id]} solid`, width: '50px', height: '1px', 'margin-top': '8px' }"
        ></div>
        {{ item['name'] }}
      </div>
    </el-card>
  </div>
</template>

<script>
import randomColor from 'randomcolor'

export default {
  name: 'RandomColor',
  props: {
    show: Array
  },
  data () {
    return {
      color: {}
    }
  },
  watch: {
    color: function (newVal, oldVal) {
      if (oldVal && newVal) {
        this.$emit('returnColor', newVal)
      }
    },
    show: function () {

      this.color = this.show.reduce((res, val) => {
        res[val.id] = randomColor({ luminosity: 'dark' })
        return res
      }, {})
    }
  }
}
</script>
