<template>
  <div>
    <dialog-page
      :info="info"
      :title="$t('alert.editName')"
      :top="'30vh'"
      style="width: 50vh; margin-left: 30%;"
      @ok="submit"
    >
      <p>{{$t('alert.startingWell')}}: {{ editData.startName + ' (' + editData.startLng + ' , ' + editData.startLat + ')' }}</p>
      <p>{{$t('alert.terminationWell')}}: {{ editData.endName + ' (' + editData.endLng + ' , ' + editData.endLat + ')' }}</p>

      <el-form label-width="80px" style="margin-top: 10px;">
        <span>{{$t('alert.enterWellLineSectionName')}}:</span>
        <el-input v-model="editData.name" :placeholder="$t('alert.wellLineSectionName')"></el-input>
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
      editData: {}
    }
  },
  watch: {
    info: function (newVal) {
      Object.entries(newVal).forEach(([, val]) => {
        this.editData = { ...val }
      })
    }
  },
  methods: {
    submit () {
      // 提交状态
      Object.entries(this.info).forEach(([key]) => {
        this.$emit('returnData', { [key]: this.editData })
      })
    }
  }
}
</script>
