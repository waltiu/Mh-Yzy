<template>
  <div style="display: flex">
    <el-switch v-model="info.isFix" @change="isFixChange" :active-text="$t('dynamic.isFixed')" ></el-switch>
    <el-switch
      v-model="info.isFixConfirm"
      :disabled="!info.isFix"
      @change="isFixConfirmChange"
      :active-text="$t('dynamic.whetherToVerify')"
    ></el-switch>
  </div>
</template>

<script>
export default {
  name: 'switchStatus',
  data () {
    return {
      info: {
        isFix: false,
        isFixConfirm: false
      }
    }
  },
  watch: {
    info: {
      handler: function (newVal) {
        if (!newVal.isFix && !newVal.isFixConfirm) {
          newVal = { isFix: false, isFixConfirm: false }
        }
        this.$emit('returnData', newVal)
      },
      deep: true
    }
  },
  methods: {
    isFixConfirmChange () {
    },
    isFixChange (status) {
      if (!status) this.info.isFixConfirm = false
      // this.info.isFixConfirm = status
    }
  }
}
</script>
