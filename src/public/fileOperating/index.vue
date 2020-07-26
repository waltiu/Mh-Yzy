<template>
  <!-- 和表单耦合 -->
  <div style="display: flex;">
    <div v-if="_.isEmpty(fileList)">{{$t('main.none')}}</div>
    <!-- 这里使用 refs 是要手动调用内部方法，详情查看 elemefe 文档 -->
    <el-upload
      :on-progress="(press, file, fileList) => {uploadList = fileList}"
      v-if="display"
      drag
      :action="url"
      multiple
      :show-file-list="false"
      :headers="headers"
      :data="preData"
      :on-success="uploaded"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        {{$t('public.dragFiles')}}
        <em>{{$t('public.clickUpload')}}</em>
      </div>
      <div class="el-upload__tip" slot="tip">{{ note }}</div>
      <!-- <el-progress v-if="!(progress === 100 || progress === 0)" :percentage="progress"></el-progress> -->
    </el-upload>

    <!-- 这里显示文件 / 如果图片文件显示缩略图, 如果是其他文件显示默认图片 -->
    <div style="width: 100%; max-height: 200px; margin-left: 20px; overflow-x: auto;">
      <!-- 正在上传 -->
      <div
        v-for="(item, index) in uploadList"
        :key="'uploading' + index"
        style="margin-top: 10px;display:flex;justify-content:space-between"
      >
        <div style="width: 100%;">
          <img src="/icons/defalut/file.png" style="width: 50px; height: 50px;">
          <span>{{$t(item.name)}}</span>

          <p style="float: right;">{{ Math.floor(item.percentage) + '%' }}</p>
          <md-progress-bar md-mode="determinate" style="width: 100%" :md-value="item.percentage"></md-progress-bar>
        </div>

        <div style="margin-right: 5px; margin-left: 10px; margin-top: 7px;">
          <!-- <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button> -->
        </div>
      </div>
    </div>

    <!-- 已经上传 -->
    <div
      v-for="(item, index) in fileList"
      :key="'uploaded' + index"
      style="margin-top: 10px;display:flex;"
    >
      <div>
        <img
          :src="'/file/' + (item.id || item.fileId) + $headerToUrl(headers)"
          onerror="this.src='/icons/defalut/file.png'"
          style="width: 50px; height: 50px;"
        >

        <span>{{item.name || item.fileName}}</span>
      </div>

      <div style="margin-right: 5px; margin-left: 10px; margin-top: 7px;">
        <el-button type="text" size="small" icon="el-icon-download" @click="openNew(item)">下载</el-button>
        <el-button
          v-if="display"
          type="text"
          size="small"
          icon="el-icon-delete"
          @click="$delete(fileList, index)"
        >{{$t('addZone.delete')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fileOperating',
  props: {
    display: {
      defalut: true,
      type: Boolean
    },
    name: {
      default: 'file',
      type: String
    },
    preData: Object,
    headers: Object,
    size: {
      default: 'big',
      type: String
    },
    url: String,
    accept: {
      default: '',
      type: String
    },
    auto: {
      type: Boolean,
      default: true
    },
    note: {
      type: String,
      default: ''
    },
    preList: Array
  },
  data () {
    return {
      uploadList: [],
      fileList: []
    }
  },
  watch: {
    preList: {
      // immediate: true,
      handler: function (newVal) {
        this.fileList = newVal
      }
    },
    fileList: function (newVal) {
      this.$emit('returnData', newVal)
    }
  },
  methods: {
    uploaded (item) {
      this.fileList.push({
        fileId: item.id,
        fileName: item.name
      })
    },
    openNew (item) {
      window.open('file/' + (item.id || item.fileId) + this.$headerToUrl(this.headers))
    }
  }
}
</script>

 <style>
.el-upload-dragger {
  width: 200px;
  height: 100px;
}
</style>
