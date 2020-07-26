import downloadCommand from '@/_public/excel/download'
<template>
  <div v-if="downloadInfo" style="display: flex">
    <div v-for="(item, index) in downloadRow()" :key="index" style="margin-right: 10px;">
      <download-command
        v-if="item.permission()"
        :title-name="item.name"
        :url="item.url"
        :args="{...item.args, idArray: selectItem.map(item => item.id).join(',')}"
        @on-error="(err) => {error(err, item, 'download')}"
        @on-success="(suc) => { success(suc, item, 'download') }"
        :show-file-list="false"
      ></download-command>
    </div>
  </div>
</template>

<script>
import { exportExcelByArray } from '@/_config/urls'
import downloadCommand from '@/_public/excel/download'

export default {
  name: 'selectItemToDownload',
  props: {
    download: Function,
    type: String,
    selectItem: Array,
  },
  components: {
    downloadCommand
  },
  methods: {
    error () { },
    success () { },
    downloadRow () {
      return this.download(this.downloadInfo)
    },
  },
  computed: {
    downloadInfo: function () {
      return exportExcelByArray[this.type]
    }
  },
}
</script>
