<template>
  <div>
    <div>
      <el-form v-bind="$attrs">
        <el-form-item
          v-for="(item, index) in  tableColumn"
          :key="index"
          :label="`${$t(item.title)}:`"
          label-width="80px"
        >
          <div v-if="item.values">
            <el-select v-model="formData[item.key]" placeholder size="medium" style="width:500px">
              <el-option
                v-for="itemb of $store.getters.getObjByType[item.values]"
                :key="itemb.index"
                :value="itemb.name"
              ></el-option>
            </el-select>
          </div>
          <div v-else>
            <el-input v-model="formData[item.key]" placeholder></el-input>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myselect',
  data () {
    return {
      formData: {},
    }
  },
  props: {
    name: String,
    tableColumn: Array,
    info: {
      type: Object,
      default: function () {
        return {}
      }

    }
  },
  watch: {
    formData: {
      handler (newVal, oldVal) {
        this.$emit("changeData", newVal, oldVal)
      },
      deep: true
    },
    info: function (newVal) {
      this.formData = newVal
    }
  }



}
</script>

<style>
</style>