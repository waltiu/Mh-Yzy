<template>
  <div>
    <el-button
      v-if="editMap"
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="edit = { ...info }"
    >修改</el-button>

    <public-alert-page :info="edit" title="分合波器编辑" :width="'90vw'" :top="'5vh'" @close="close">
      <edit-content
        :request="request"
        :info="info"
        @submitForm="(info) => { fullData = {...fullData,...info} }"
      ></edit-content>

      <template v-slot:footer="{methods: {close}}">
        <el-button
          style="margin-left:0px"
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
import EditContent from './content'

export default {
  name: 'EditInfo',
  props: {
    info: Object,
    request: Object,
    editMap: {
      default: true,
      type: Boolean
    },
    editTf: Boolean
  },
  components: {
    EditContent
  },
  data () {
    return {
      edit: {},
      fullData: {},
      patching: false
    }
  },
  watch: {
    info: {
      handler: function (newVal) {
        if (this.editTf) {
          this.edit = { ...newVal }
        }
      },
      immediate: true,
      deep: true
    },

  },
  methods: {
    close () {
      this.$emit('close')
    },
    submit (close) {
      delete this.fullData.child
      delete this.fullData.ldsysOpticalCableWays
      if (this.fullData.place === '室外') {
        this.fullData.ldsysMachineRoom = null
      }
      if (this.fullData.ldsysMachineRoom) {
        this.fullData.lng = this.fullData.ldsysMachineRoom.lng
        this.fullData.lat = this.fullData.ldsysMachineRoom.lat
      }
      if (this.fullData.lng && this.fullData.omSN) {
        this.patching = true
        this.request
          .update({ info: this.fullData })
          .then(() => {
            this.$notify({
              title: '更新成功',
              message: this.fullData.omSN,
              type: 'success'
            })
            if (this.editTf) {

              this.$store.commit('mapEditInfoUpdate', { ...this.fullData, ...{ mapType: 'cran' } })
            }

          })
          .finally(() => {
            this.patching = false
            this.fullData = {}
            close()
          })
      } else {
  
        this.$store.commit('setSysStatus', {
          info: {
            msg: '请完善设备信息！',
            code: '500',
            time: new Date(),
            msgEn: '请完善设备信息！'
          },
          key: 'httpErr',
        })
      }

    },
  }
}
</script>
