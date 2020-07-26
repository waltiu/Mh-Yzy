<template>
  <div>
    <dialog-page :info="info" width="50vw" :title="$t('alert.editName')" top="15vh" @ok="submit">

      <el-form ref="form" label-width="80px">

        <el-form-item :label="$t('alert.groupName')">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>

      </el-form>

    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'changeTitleName',
  props: {
    info: Object
  },
  data () {
    return {
      formData: { name: '' }
    }
  },
  watch: {
    info: function (newVal) {
      this.formData = { ...newVal }
    }
  },
  methods: {
    submit () {
      this.$emit('returnData', this.formData)
    }
  }
}
</script>
