<!-- mark拖拽修改经纬度dialog -->
<template>
  <div>
    <el-dialog
      :modal="false"
      :title="$t('public.latitudeLongitudeModification')"
      width="30%"
      :visible="$store.state.infoMapShow.showChangeAlert"
      :before-close="handleClose"
    >
      <span>{{$t('public.modify')}}"{{name}}"{{$t('public.coordinates')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{$t('opticalSplitter.cancel')}}</el-button>
        <el-button type="primary" @click="handleOk">{{$t('opticalSplitter.determine')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'changePoint',
  components: {
  },
  computed: {
    name: function () {
      // <span>要修改"{{ $store.state.infoMapShow.dragendPoint.target.properties.name }}"的坐标吗？</span>
      // if (!this.$store.state.infoMapShow.dragendPoint) {
      //   return ''
      // }
      // if (!('properties' in this.$store.state.infoMapShow.dragendPoint.target)) {
      //   return ''
      // }
      try {
        return this.$store.state.infoMapShow.dragendPoint.target.properties.name
      } catch (err) {
        return ''
      }
    }
  },
  methods: {
    handleClose () {
      let e = this.$store.state.infoMapShow.dragendPoint
      let t = e.target
      let p = t.properties
      e.target.setCoordinates([p.lng, p.lat])
      this.$store.commit('setShowChangeAlert', false)
    },
    handleOk () {
      let e = this.$store.state.infoMapShow.dragendPoint
      let t = e.target
      let p = t.properties
      let data = {
        id: p.id,
        lng: e.coordinate.x,
        lat: e.coordinate.y,
        name: p.name
      }
      this.$resourceOperating({
        name: p.type,
        type: 'update',
        info: data
      }, e => {
        this.$checkStatus(e)
        this.$store.commit('setShowChangeAlert', false)
      })
    }
  }
}
</script>
