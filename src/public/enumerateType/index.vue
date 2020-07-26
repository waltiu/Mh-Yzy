<template>
  <div>
    <el-select :clearable="true" v-model="formData" style="width: 200px;" :placeholder="placeholder">
      <el-option
        v-for="(option, index_1) in $store.getters.getObjByType[type]"
        :value="option.code"
        :key="index_1"
      >{{option.name}}</el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'enumerateType',
  props: {
    type: String,
    placeholder: String
  },
  data () {
    return {
      formData: ''
    }
  },
  watch: {
    formData: function (newVal) {
      this.$emit('returnData', newVal)
    }
  }
}
</script>
