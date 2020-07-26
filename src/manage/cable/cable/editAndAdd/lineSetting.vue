<template>
  <div>
    <dialog-page
      :info="fullData"
      :title="$t('cable.cableLayingInformation')"
      :top="'30vh'"
      style="width: 50vh; margin-left: 30%;"
      @ok="submit"
    >
      <p>{{$t('cable.selectedResources')}}: {{ fullData.name }}</p>
      <p
        v-if="!!fullData.lng"
      >{{$t('cable.latitudeAndLongitude')}}: {{ fullData.lng + ' , ' + fullData.lat }}</p>
      <el-form label-width="80px" style="margin-top: 10px;" @submit.native.prevent>
        <span>{{$t('cable.enterDiskLength')}}:</span>
        <el-input v-model="length" :placeholder="$t('cable.diskLength')"></el-input>
      </el-form>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'lineSettings',
  props: {
    info: Object
  },
  data () {
    return {
      length: '',
      fullData: {}
    }
  },
  watch: {
    info: {
      handler: function (newVal) {
        if (newVal && (newVal.type === 'edit' || newVal.type === 'add')) {
          this.fullData = { ...newVal.info }
        }
      },
      deep: true
    }
  },
  methods: {
    submit () {
      // 提交状态
      if (this.info.type === 'add') {
        this.$emit('addLine', {
          // 光缆段. 由上层自行拼接
          info: this.info,
          // 敷设数组
          line: {
            id: this.fullData.id,
            length: this.length,
            name: this.fullData.name,
            lat: this.fullData.lat,
            lng: this.fullData.lng
          }
        })
      }
      if (this.info.type === 'edit') {
        this.$emit('editLine',
          {
            info: {
              ...this.fullData,
              length: this.length
            },
            index: this.info.index
          }
        )
      }
      // this.fullData = {}
    }
  }
}
</script>
