<template>
  <div>
    <el-button
      v-if="showDownloadButton"
      size="mini"
      @click="() => {downloadStatus = true}"
      icon="el-icon-download"
      type="primary"
    >{{$t('_view.exportData')}}</el-button>
    <el-button
      v-if="showUploadButton"
      size="mini"
      @click="() => {uploadStatus = true}"
      icon="el-icon-upload2"
      type="primary"
    >{{$t('_view.importData')}}</el-button>
    <div>
      <excel-middle :open-status.sync="downloadStatus" :download="downloadRow()" v-on="$listeners"></excel-middle>
      <excel-middle :open-status.sync="uploadStatus" :upload="uploadRow()" v-on="$listeners"></excel-middle>
    </div>
  </div>
</template>

<script>
import excelMiddle from '@/_middle/excel/index'
import { fileUploadAndDownload } from '@/_config/urls'

export default {
  name: 'BusinessExcel',
  components: {
    excelMiddle
  },
  props: {
    type: String,
    download: Function,
    upload: Function
  },
  computed: {
    downloadInfo: function () {
      return fileUploadAndDownload[this.type].download
    },
    uploadInfo: function () {
      return fileUploadAndDownload[this.type].upload
    },
    showDownloadButton: function () {
      return this.downloadRow()
        .map(item => item.permission())
        .includes(true)
    },
    showUploadButton: function () {
      return this.uploadRow()
        .map(item => item.permission())
        .includes(true)
    }
  },
  data () {
    return {
      downloadStatus: false,
      uploadStatus: false
    }
  },
  methods: {
    downloadRow () {
      return this.download(this.downloadInfo)
    },
    uploadRow () {
      return this.upload(this.uploadInfo)
    }
  }
}
</script>
