<template>
  <div>
    <el-button
      :type="buttonType"
      @click="change"
      size="small"
      round
      style="margin-left: 10px; margin-top: 10px;"
    >
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'customButton',
  props: {
    // 默认值
    stastatusItem: Boolean,
    title: String
  },
  data () {
    return {
      status: true,
      mapInfo: {},
      // buttonType:''
    }
  },
  methods: {
    change () {
      this.status = !this.status
      this.$emit('changeStatus', this.title, this.status)
    }
  },
  watch: {
    stastatusItem: {
      handler: function (newVal) {
        this.status = newVal
      },
      immediate: true,
      deep: true
    },
    // title: {
    //   handler: function (newVal) {
    //     console.log(newVal)
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  computed: {
    buttonType: function () {
      if (this.status) {
        return 'primary'
      } else {
        return 'info'
      }
    }
  },

}
</script>
