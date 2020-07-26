<template>
  <div>
    <el-button
      class="table-inside-button"
      v-if="editMap"
      size="mini"
      type="primary"
      @click="edit = { ...info }"
    >{{$t('subdistricts.edit')}}</el-button>

    <public-alert-page :info="edit" title="机框编辑" :width="'90vw'" :top="'5vh'" @close="close">
      <edit-content
        :request="request"
        :info="info"
        @returnChangeData="(info) => { fullData = info }"
      ></edit-content>

      <template v-slot:footer="{methods: {close}}">
        <el-button
          :loading="patching"
          :disabled="!fullData.id"
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
      let newData = {}
      let machineFrameUseInfos = Object.values(this.fullData.detailInfos)
      this.fullData.machineFrameUseInfos = machineFrameUseInfos.map((item, key) => {
        return newData[key] = {
          id: item.id
        }
      })
      this.fullData.machineFrameUseInfos = newData
      if (this.fullData.place === '机房') {
        this.fullData.lng = this.fullData.ldsysMachineRoom.lng
        this.fullData.lat = this.fullData.ldsysMachineRoom.lat
      } else {
        this.fullData.ldsysMachineRoom = null
      }
      this.patching = true
      this.request
        .update({ info: this.fullData })
        .then(() => {
          this.$notify({
            title: '更新成功',
            message: this.fullData.name,
            type: 'success'
          })
          if (this.editTf) {

            this.$store.commit('mapEditInfoUpdate', { ...this.fullData, ...{ mapType: 'machine' } })
          }
        })
        .finally(() => {
          this.patching = false
          this.fullData = {}
          close()
        })
    },
  },
}
</script>
