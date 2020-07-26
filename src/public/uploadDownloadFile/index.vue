<template>
  <!-- 这是一个共用组件, 用来 上传 & 下载文件
  -->
  <div>
    <dialog-page :info="show" width="40%" :title="$t('public.importAndExportFiles')" top="15vh">
      <div style="display: flex;justify-content:space-between">
        <!-- 上传 -->
        <div v-if="$store.getters.getUserRole.includes($userPermission[type].key + '.' + 'c')">
          <div v-for="(item, index) in uploadFile.list" :key="index + 'up'" style="width: 40%;">
            <Upload
              :on-progress="(a,b,c) => {uploading = b}"
              :before-upload="startUpload"
              :data="{...uploadUrl.args, ...item.args}"
              :headers="token"
              :action="item.url || uploadUrl.url"
              :on-success="uploadFileOK"
              :on-error="uploadFileErr"
              name="file"
            >
              <el-button
                type="text"
                v-show="($fileUploadAndDownload[type].upload.url || item.url)"
              >{{ $t(uploadFile.name1) + ' ' + $t(item.text) }}</el-button>
            </Upload>
          </div>
        </div>

        <div v-else>{{$t('public.noUploadPermission')}}</div>

        <slot></slot>

        <!-- 下载 -->
        <div v-if="$store.getters.getUserRole.includes($userPermission[type].key + '.' + 'r')">
          <div v-for="(item, index) in downloadFile.list" :key="index + 'down'" style="width: 40%;">
            <el-button
              type="text"
              style="margin-bottom: 8px;"
              @click="download(item)"
              v-show="$fileUploadAndDownload[type].download.url"
            >{{ $t(downloadFile.name1) + ' ' + $t(item.text) }}</el-button>
          </div>
        </div>

        <div v-else>{{$t('public.noDownloadPermission')}}</div>
      </div>

      <div slot="footer"></div>
    </dialog-page>

    <alert-page :info="uploaded"></alert-page>
  </div>
</template>

<script>
import alertPage from './alertPage.vue'

export default {
  components: {
    alertPage
  },
  props: {
    type: String, // 组件名称
    info: Object,
    preUpload: Object, // 重写上传参数项目, 会覆盖默认的 list, 会导致download的跟随
    preDownload: Object,
    attachUpload: Array, // 附加上传参数项目， 追加在默认 list 结尾， 不会让 download 跟随
    attachDownload: Array
  },
  data: () => ({
    show: {},
    uploaded: {},
    uploading: {},
    uploadArgs: {
      name: '导入文件',
      name1: 'public.importingFiles',
      childPermission: 'u',
      list: [
        {
          args: { type: 'BD', coordinatesType: 'BD' },
          text: 'public.BDCoordinates'
        },
        {
          args: { type: 'GCJ', coordinatesType: 'GCJ' },
          text: 'public.GCJCoordinates'
        },
        {
          args: { type: 'WGS', coordinatesType: 'WGS' },
          text: 'public.WGSCoordinates'
        }
      ]
    },
    downloadArgs: {
      name: '导出文件',
      name1: 'public.exportFile',
      childPermission: 'r',
      list: null
    }
  }),
  watch: {
    info: function (newVal) {
      this.show = newVal
    }
  },
  computed: {
    uploadUrl: function () {
      return this.$fileUploadAndDownload[this.type].upload
    },
    token: function () {
      return this.$store.state.token
    },
    argsData: function () {
      let returnData = {}
      if (this.preUpload) {
        returnData = this.preUpload
      } else {
        returnData = this.uploadArgs
      }
      return returnData
    },
    uploadFile: function () {
      let returnData = {}
      if (this.attachUpload) {
        returnData.list = [...returnData.list, ...this.attachUpload]
      }
      return returnData
    },
    downloadFile: function () {
      let returnData = {}
      if (this.preDownload) {
        returnData = this.preDownload
      } else {
        if (!this.downloadArgs.list) {
          returnData = { ...this.downloadArgs, 'list': this.uploadArgs.list }
        } else {
          returnData = this.downloadArgs
        }
      }
      if (this.attachDownload) {
        returnData.list = [...returnData.list, ...this.attachDownload]
      }
      return returnData
    }
  },
  mounted () {
    this.uploadArgs = this._.cloneDeep(this.argsData)
  },
  methods: {
    uploadFileErr (e, info) {
      this.$Spin.hide()
      this.$store.commit('setSysStatus', {
        info: info,
        key: 'httpErr'
      })
    },
    uploadFileOK (info) {
      this.$Notice.success({
        title: this.$i18n.t('public.fileUploadCompleted')
      })
      // Vuex提交上传完成
      this.$store.commit('uploadFileOK')
      this.uploaded = info
      this.$Spin.hide()
    },
    startUpload () {
      this.show = {}
      this.$Spin.show({
        render: (h) => {
          return h('div',
            { 'style': ' z-index: 99999;' },
            [
              h('h3', this.$i18n.t('public.uploadingFile') + this.uploading.name + this.$i18n.t('public.wait')),
              h('Progress', {
                'class': 'custom-icon-load',
                'style': 'width: 300px;',
                props: {
                  percent: parseInt(this.uploading.percentage)
                }
              })
            ]
          )
        }
      })
    },
    download (info) {
      let download = this.$fileUploadAndDownload[this.type].download
      let args = ''
      // 解析ARGS
      Object.entries({ ...download.args, ...info.args }).forEach(([key, val]) => {
        args = args + key + '=' + val + '&'
      })
      window.location.href = download.url + '?' + args
    }
  }
}
</script>

<style>
.custom-upload {
  margin-left: 10px;
}
</style>
