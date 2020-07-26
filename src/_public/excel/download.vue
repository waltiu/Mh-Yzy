<template>
  <div>
    <el-button size="small" :loading="loading" type="primary" @click="download">{{ titleName }}</el-button>
  </div>
</template>

<script>
import { DownloadFile } from '@/_library/file'

export default {
  name: 'ExcelDownload',
  props: {
    args: Object,
    url: String,
    titleName: String,
    disabled: Boolean,
    headers: Object,
    type: {
      default: 'get',
      type: String
    }
  },
  computed: {
    rowHeaders: function () {
      return { ...this.$store.getters.loginToken, ...this.headers }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    download () {
      this.loading = true
      new DownloadFile({ url: this.url, params: this.args })
        .on('onProgress', () => { })
        .on('onSuccess', () => this.$emit('on-success'))
        .on('onEnd', () => {
          this.loading = false
          this.$emit('on-end')
        })
    }
  }
}
</script>
