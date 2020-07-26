<template>
  <div>
    <public-alert-page :info="openStatus" :title="'文件操作'" width="600px" @close="close">
      <div class="upload-dialog">
        <no-dialog  v-on="$listeners" :upload="upload"></no-dialog>
      </div>
      <div class="download-dialog">
        <no-dialog :download="download" v-on="$listeners" ></no-dialog>
      </div>

      <div slot="footer"></div>
    </public-alert-page>
  </div>
</template>

<script>
import noDialog from './nodialog'

export default {
  name: 'ExcelOperating',
  components: {
    noDialog
  },
  props: {
    openStatus: Boolean,
    download: Array,
    upload: Array
  },
  methods: {
    close () {
      this.$emit('update:openStatus', false)
    }
  }
}
</script>

<style scoped>
.upload-dialog {
  padding-bottom: 15px;
}
</style>
