<template>
  <div>
    <dialog-page
      ref="dialog"
      :info="info"
      :title="$t('public.changeStatus')"
      width="60vw"
      top="15vh"
      :showFooter="false"
    >
      <div style="margin-top: 10px;">
        <!-- 提交 -->
        <div v-if="info.state === 'uncommitted'">
          <div v-if="info.allowCommit">{{$t('public.confirmSubmission')}}?</div>

          <div v-else>{{$t('public.permissionOperation')}}</div>
        </div>

        <!-- 审核 -->
        <div v-if="info.state === 'unreviewed'">
          <div v-if="info.allowCheck">
            <div>
              <el-radio-group v-model="radio">
                <el-radio :label="true">{{$t('public.allow')}}</el-radio>
                <el-radio :label="false">{{$t('public.refuse')}}</el-radio>
              </el-radio-group>
            </div>

            <div v-if="!radio" style="margin-top: 15px;">{{$t('public.denialReason')}}:
              <el-input style="margin-top: 5px;" type="textarea" :rows="5"></el-input>
            </div>
            <!-- <input type="text"> -->
          </div>

          <div v-else>{{$t('public.permissionOperation')}}</div>
        </div>

        <div v-if="info.state === 'finish'">{{$t('public.completed')}}</div>
      </div>

      <div slot="footer-add">
        <el-button
          type="primary"
          v-if="(info.allowCommit && info.state === 'uncommitted') || (info.allowCheck && info.state === 'unreviewed')"
          @click="() => {submit(); $refs.dialog.handleClose()}"
        >{{$t('dynamic.determine')}}</el-button>
        <el-button @click="() => {$refs.dialog.handleClose()}">{{$t('user.cancel')}}</el-button>
      </div>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'changeStatus',
  props: {
    info: Object
  },
  data () {
    return {
      radio: true,
      note: ''
    }
  },
  methods: {
    submit () {
      let url = ''
      let args = {}
      switch (this.info.state) {
        case 'uncommitted':
          url = '/api/ldsysOpticalSplitterOrders/orderCommit/' + this.info.id
          break

        case 'unreviewed':
          url = '/api/ldsysOpticalSplitterOrders/orderCheck/' + this.info.id
          if (this.radio) {
            args = {
              isPass: this.radio
            }
          } else {
            args = {
              isPass: this.radio,
              failNote: this.note
            }
          }
          url = url + this.$headerToUrl(args)
          break
      }
      if (url && args) {
        this.$http.post(url, args)
          .then((result) => {
            if (this.$checkStatus(result)) {
              this.$emit('returnData', { state: result.data.state })
            }
          })
      }
    }
  }
}
</script>
