<template>
  <div class="export-excel">
    <div class="upload-list" >
      <div v-for="(item, index) in upload" :key="index">
        <upload-command
          class="all-command"
          v-if="item.permission()"
          :title-name="item.name"
          @on-error="(err) => {error(err, item, 'upload')}"
          @on-success="(suc) => { success(suc, item, 'upload') }"
          :url="item.url"
          :args="item.args"
          :show-file-list="false"
        ></upload-command>
      </div>
    </div>
    <div class="download-list">
      <div v-for="(item, index) in download" :key="index">
        <download-command
          class="all-command"
          v-if="item.permission()"
          :title-name="item.name"
          :url="item.url"
          :args="item.args"
          @on-error="(err) => {error(err, item, 'download')}"
          @on-success="(suc) => { success(suc, item, 'download') }"
          :show-file-list="false"
        ></download-command>
      </div>
    </div>
    <result-table :info="UploadResultData"></result-table>
  </div>
</template>

<script>
import uploadCommand from '@/_public/excel/upload'
import downloadCommand from '@/_public/excel/download'
import resultTable from './result'

export default {
  name: 'ExportExcel',
  props: {
    /**
     * download, upload
     * [
     *  {
     *    url: String,
     *    args: Object,
     *    name: String
     *    permission: Function => Boolean
     *  }
     * ]
     * 
     */
    download: Array,
    upload: Array
  },
  data () {
    return {
      UploadResultData: {}
    }
  },
  components: {
    resultTable,
    uploadCommand,
    downloadCommand
  },
  methods: {
    success (info, item, key) {
      if (key === 'upload') this.UploadResultData = info
      this.$emit(`${key}-success`, item)
    },
    error (info, item, key) {
      this.$emit(`${key}-error`, item)
      this.$store.commit('setSysStatus', {
        info: JSON.parse(info.message),
        key: 'httpErr'
      })
    }
  }
}

</script>

<style scoped>
.export-excel {
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
  padding-left: 50px;
}
.upload-list{
  position: relative;
  margin-left: 40%

}
.download-list{
  position: relative;
  margin-right: 40%
}
.all-command {
  margin-top: 10px;
}
</style>
