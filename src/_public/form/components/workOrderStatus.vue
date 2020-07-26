<template>
  <el-select
    clearable
    @change="sendMsg"
    size="small"
    v-model="value2"
    value-key="id"
    placeholder="选择工程状态"
  >
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item"></el-option>
  </el-select>
</template>

<script>

export default {
  name: "workOrderStatus",
  props: {
    value: String
  },
  data () {
    return {
      options: [
        { id: 'uncommitted', name: '待提交' },
        { id: 'unreviewed', name: '待审核' },
        { id: 'finish', name: '完成' }
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
      this.value2 = this.options.find(item => item.id === this.value)
    }
  }
}
</script>