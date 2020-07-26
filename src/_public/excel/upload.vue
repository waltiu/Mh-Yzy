<template>
  <div>
    <el-upload
      :element-loading-text="uploadString"
      v-loading.fullscreen.lock="fullscreenLoading"
      :on-error="error"
      :headers="rowHeaders"
      :on-success="success"
      :action="url"
      :data="args"
      :multiple="false"
      :disabled="disabled"
      :on-progress="handlePreview"
    >
      <el-button size="small" type="primary">{{ titleName }}</el-button>
    </el-upload>
  </div>
</template>

<script>

export default {
  name: 'UploadCommand',
  props: {
    args: Object,
    url: String,
    titleName: String,
    disabled: Boolean,
    headers: Object
  },
  components: {
  },
  computed: {
    rowHeaders: function () {
      return { 'x-auth-token': this.$store.getters.loginToken, ...this.headers }
    }
  },
  data () {
    return {
      uploadString: '',
      fullscreenLoading: false,
      progress: 0
    }
  },
  methods: {
    handlePreview (file) {
      this.fullscreenLoading = true
      this.progress = Number(file.percent).toFixed(2)
      this.uploadString = this.progress < 99 ? `正在上传... ${this.progress}%` : '正在处理...'
    },
    success (info) {
      this.fullscreenLoading = !true
      this.$emit('on-success', info)
    },
    error (info) {
      this.fullscreenLoading = !true
      this.$emit('on-error', info)
    }
  }
}
</script>
