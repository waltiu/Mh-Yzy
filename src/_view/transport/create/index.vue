<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="create = { name: '' }"
    >{{$t('subdistricts.new')}}</el-button>

    <public-alert-page
      :info="create"
      :title="$t ('subdistricts.new_infomation')"
      :width="'90vw'"
      :top="'5vh'"
    >
      <content-info :request="request" @returnChangeData="(info) => { fullData = info }"></content-info>

      <template v-slot:footer="{methods: {close}}">
        <el-button
          :loading="createing"
          type="primary"
          @click="submit(close)"
        >{{$t('subdistricts.submit')}}</el-button>
        <el-button @click="close()">{{$t('subdistricts.cancel')}}</el-button>
      </template>
    </public-alert-page>
  </div>
</template>

<script>
import ContentInfo from './content'

export default {
  name: 'createIndex',
  props: {
    request: Object
  },
  components: {
    ContentInfo
  },
  data () {
    return {
      create: {},
      fullData: {},
      createing: false,
      submitState: ""

    }
  },
  methods: {
    submit (close) {
      if (this.fullData.name) {
        this.createing = true
        this.request
          .create({ info: this.fullData })
          .then((res) => {
            if (res.status === 200) {
              this.$notify({
                title: '成功',
                message: `增加完成 ${this.fullData.name}`,
                type: 'success'
              })
            }
            close()
          })
          .finally(() => {
            this.createing = false
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
}
</script>
