<template>
  <div>
    <public-content style="width: 100%;" :column="tableColumn" :fullData="info"></public-content>

    <show-port :info="info" style="margin-top: 10px; margin-bottom: 10px;">
      <template v-slot:before-header>
        <photo-viewer :info="beforePhoto"></photo-viewer>
      </template>

      <template v-slot:after-header>
        <photo-viewer :info="afterPhoto"></photo-viewer>
      </template>
    </show-port>
    <!-- 照片 -->
  </div>
</template>

<script>
import { table } from './table.js'
import PhotoViewer from '@/_public/photo/index'
import ShowPort from './showport'

export default {
  name: 'ContentInfo',
  props: {
    info: Object,
  },
  components: {
    PhotoViewer,
    ShowPort
    // OdfOccPort
  },
  data () {
    return {
      tableData: {}
    }
  },
  computed: {
    beforePhoto: function () {
      return this.info.photos &&
        this.info.photos.photos &&
        this.info.photos.photos.photos ? this.info.photos.photos.photos.filter(item => item.type === 'old') : []
    },
    afterPhoto: function () {
      return this.info.photos &&
        this.info.photos.photos &&
        this.info.photos.photos.photos ? this.info.photos.photos.photos.filter(item => item.type === 'new') : []
    },
    tableColumn: function () {
      return Object.values(table)
    },
  },
}
</script>