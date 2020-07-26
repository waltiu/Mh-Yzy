<template>
  <div>
    <el-input v-bind="bindProps" v-model="values" @change="$emit('bindData', values)"></el-input>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  data () {
    return {
      values: ''
    }
  },
  computed: {
    bindProps: function () {
      return {
        ...this.$attrs
      }
    }
  }
}
</script>
