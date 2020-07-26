<template>
  <div>
    <el-form label-position="left">
      <el-form-item :label="label" style="margin-bottom: 0px;">
        <el-select size="medium" value-key="name" v-model="formType" :placeholder="$t('cable.chooseType')">
          <el-option
            v-for="(item,index) in compentedUrl"
            :key="index"
            :label="$t(item.name)"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('cable.search')" style="margin-bottom: 0px;">
        <auto-complete-info
          @returnData="emitData"
          size="medium"
          :placeholder="formType.name ? $t('tableSearch.pleaseInput') + formType.name : $t('tableSearch.pleaseInput')"
          :url="formType.url"
          :preData="formType.args"
        ></auto-complete-info>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'selectItem',
  props: {
    compentedUrl: {
      type: Array
    },
    label: {
      type: String,
      default: 'cable.select'
    }
  },
  data () {
    return {
      formType: {},
      info: {}
    }
  },
  methods: {
    emitData (params) {
      this.$emit('returnData', {
        info: params,
        type: this.formType
      })
    }
  }
}
</script>
