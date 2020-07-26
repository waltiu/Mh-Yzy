<template>
  <el-select
    clearable
    @change="sendMsg"
    size="small"
    v-model="value2"
    value-key="status"
    placeholder="是否超时"
  >
    <el-option v-for="item in options" :key="item.status" :label="item.name" :value="item"></el-option>
  </el-select>
</template>

<script>

export default {
  name: "trueOrFalse",
  props: {
    value: Boolean
  },
  data () {
    return {
      options: [
        { status: true, name: '是' },
        { status: false, name: '否' }
      ],
      value2: {},
    }
  },
  methods: {
    sendMsg () {
      this.$emit('returnData', this.value2)
    },

  },
  watch: {
    value: function () {
      this.value2 = this.options.find(item => item.status == this.value)
    }
  }
}
</script>