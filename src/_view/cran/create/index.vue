<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="create = { name: '' }"
    >{{$t('subdistricts.new')}}</el-button>

    <public-alert-page :info="create" title="分合波器新增" :width="'90vw'" :top="'5vh'">
      <content-info
        :request="request"
        :info="info"
        @submitForm="(info) => { fullData ={ ...fullData,...info} }"
      ></content-info>

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
  name: 'CreateInfo',
  props: {
    info: Object,
    request: Object
  },
  components: {
    ContentInfo
  },
  data () {
    return {
      create: {},
      fullData: {},
      createing: false
    }
  },
  methods: {
    submit (close) {
      delete this.fullData.ldsysOpticalCableWays
      if (this.fullData.place === '室外') {
        this.fullData.ldsysMachineRoom = null
      }
      if (this.fullData.ldsysMachineRoom) {
        this.fullData.lng = this.fullData.ldsysMachineRoom.lng
        this.fullData.lat = this.fullData.ldsysMachineRoom.lat
      }
      if (this.fullData.lng && this.fullData.omSN) {
        this.createing = true
        this.request
          .create({ info: this.fullData })
          .then((res) => {
            if (res.status === 200) {
              this.$notify({
                title: '成功',
                message: this.fullData.omSN,
                type: 'success'
              })
            }
            close()
          })
          .finally(() => {
            this.createing = false
            close()

          })
      } else {
        this.$store.commit('setSysStatus', {
          info: {
            msg: '请完善设备详细信息！',
            code: '500',
            time: new Date(),
            msgEn: '请完善设备详细信息！'
          },
          key: 'httpErr',
        })
      }

    },
  },
}
</script>
