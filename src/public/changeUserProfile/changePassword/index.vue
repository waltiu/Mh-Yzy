<template>
  <div>
    <el-dialog :title="$t('main.changePassword')" :visible.sync="dialogVisible">

      <change-password-no-dialog @returnData="(e) => {password = e}"></change-password-no-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('opticalSplitter.cancel')}}</el-button>
        <el-button :disabled="!password" type="primary" @click="changePassword">{{$t('opticalSplitter.determine')}}</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import changePasswordNoDialog from './noDialog'

export default {
  name: 'changePassword',
  components: {
    changePasswordNoDialog
  },
  props: {
    userInfo: Object // Sync
  },
  data () {
    return {
      password: ''
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        if (!this._.isEmpty(this.userInfo)) {
          return true
        } else {
          return false
        }
      },
      set: function (newVal) {
        if (!newVal) {
          this.$emit('update:userInfo', {})
        }
      }
    }
  },
  methods: {
    changePassword () {
      this.$http.patch('/api/sysUsers/' + this.userInfo.id, {
        loginPassword: this.password
      })
        .then(res => {
          this.$checkStatus(res)
          this.dialogVisible = false
        })
    }
  }
}
</script>
