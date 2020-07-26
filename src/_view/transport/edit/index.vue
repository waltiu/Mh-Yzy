<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="edit = { ...info }"
    >{{$t('subdistricts.edit')}}</el-button>

    <public-alert-page
      :info="edit"
      :title="$t('opticalSplitter.editInformation')"
      :width="'90vw'"
      :top="'5vh'"
    >
      <edit-content
        :request="request"
        :info="info"
        @returnChangeData="(info) => { submitData= info }"
      ></edit-content>

      <template v-slot:footer="{methods: {close}}">
        <el-button
          :loading="patching"
          type="primary"
          @click="submit(close)"
        >{{$t('subdistricts.submit')}}</el-button>
        <el-button @click="close()">{{$t('subdistricts.cancel')}}</el-button>
      </template>
    </public-alert-page>
  </div>
</template>

<script>
import _ from 'lodash'
import EditContent from './content'

export default {
  name: 'editIndex',
  props: {
    info: Object,//表单全部数据
    request: Object
  },
  components: {
    EditContent
  },
  data () {
    return {
      edit: {},
      submitData: {},//提交数据
      patching: false
    }
  },
  methods: {
    submit (close) {
      if (this.submitData.name) {
        _.omit(this.submitData, ['ldsysOpticalCableWays'])

        this.patching = true
        this.request
          .update({ info: this.submitData })
          .then(() => {
            this.$notify({
              title: '更新成功',
              message: this.submitData.name,
              type: 'success'
            })
          })
          .finally(() => {
            this.patching = false
            close()
          })
      } else {

        this.$store.commit('setSysStatus', {
          info: {
            msg: '用户名不能为空，请输入用户名！',
            code: '500',
            time: new Date(),
            msgEn: '用户名不能为空，请输入用户名！'
          },
          key: 'httpErr',
        })
      }
    },
  },
  watch: {
    edit: function (name) {
      return name
    }
  }
}
</script>
