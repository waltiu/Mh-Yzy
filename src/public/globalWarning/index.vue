<template>
  <!-- 全局网络错误弹框 -->
  <div>
    <dialog-page
      :info="info"
      :title="$t('globalWarning.payAttention')"
      @close="() => {info = {}}"
      width="30%"
    >
      <el-card>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-error" style="font-size: 40px; color: red;"></i>
              异常提醒：
              <p class="msg">{{info.msg}}</p>
            </template>
            <div style="display: flex; font-size: 13px;">
              <div style="margin-left: 20px; width: auto;">
                <div>
                  <B>详情:</B>
                  <small>
                    <div v-for="(val, key) of info" :key="key">
                      <p v-if="keys[key]">{{ $t(keys[key]) }} : {{ val }}</p>
                    </div>
                  </small>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <div slot="footer"></div>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'globalWarning',
  data () {
    return {
      info: {},
      keys: {
        code: 'globalWarning.errorCode', // 错误代码
        time: 'globalWarning.timestamp', // 时间戳
        msg: 'globalWarning.msg', // 信息
        status: 'globalWarning.statusCode', // 状态码
        error: 'globalWarning.errorType', // 错误类型
        exception: 'globalWarning.globalWarning', // 异常信息
        path: 'globalWarning.requestPath', // 请求路径
        message: 'globalWarning.errorMsg', // 错误信息
        timestamp: 'globalWarning.timestamp' // 时间戳
      }
    }
  },
  watch: {
    '$store.state.sysStatus.httpErr': function (newVal) {
      console.log(newVal)
      this.info = newVal
      console.log(newVal)
      if (this.$i18n.locale === 'en') {
        this.info.msg = newVal.msgEn
      }
    },
    info: function (newVal) {
      if (this._.isEmpty(newVal)) {
        // this.$router.push('/')
      }
    }
  }
}
</script>
<style scoped>
.msg {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  width: 50%;
}
</style>
