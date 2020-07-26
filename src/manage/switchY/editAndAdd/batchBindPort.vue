<template>
  <div>
    <div>
      <!-- <el-button size="mini" @click="add">增加</el-button> -->
    </div>
    <div style="margin-top: 20px;" v-for="(a, index) in Object.keys(bind)" :key="index">
      <bind-port :odfInfo="tableData" @bind="bindData"></bind-port>
    </div>
  </div>
</template>

<script>
import bindPort from './bindPort'

export default {
  name: 'batchBindPort',
  components: {
    bindPort
  },
  props: {
    tableData: Object
  },
  data () {
    return {
      bind: {
        0: {}
      }
    }
  },
  watch: {
    bind: {
      handler: function (newVal) {
        this.$emit('returnData', newVal[0])
        // 在这里 使用 returnData {2: {}} 为解绑端口,
        // {2: {xxxxx}} 此时为绑定端口, 在retuenData到父组件后会覆盖之前的绑定状态
      },
      deep: true
    }
  },
  methods: {
    add () {
      this.$set(this.bind, (Object.keys(this.bind).length + 1), {})
    },
    bindData (info) {
      this.$emit('changePort', info)
    }
  }
}
</script>
