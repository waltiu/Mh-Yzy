<template>
  <!-- 组件间解耦, 不与Vuex交互 -->
  <div>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('user.password')" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.confirmPassword')" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'changePasswordNoDialog',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('main.enterPsd')))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('main.enterPsdAgain')))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error(this.$i18n.t('main.inconsistent')))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    ruleForm2: {
      handler: function (newVal) {
        if (newVal.pass === newVal.checkPass) {
          this.$emit('returnData', newVal.checkPass)
        } else {
          this.$emit('returnData', null)
        }
      },
      deep: true
    }
  }
}
</script>
