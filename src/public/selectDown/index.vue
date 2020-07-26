<template>
  <div>
    <el-select
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :size="size"
      v-model="formData"
      filterable
      :placeholder="$t(placeholder)"
      value-key="id"
    >
      <el-option
        v-for="(item, itemIndex) in formList"
        :key="itemIndex"
        :label="label(item, index)"
        :value="value(item, index)"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'selectDown',
  props: {
    label: {
      type: Function,
      default: (item) => item.name
    },
    value: {
      type: Function,
      default: (item) => item
    },
    formList: Array,
    multiple: {
      type: Boolean,
      default: true
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'small'
    },
    placeholder: {
      type: String,
      default: 'opticalSplitter.select'
    }
  },
  data () {
    return {
      formData: []
    }
  }
}
</script>
