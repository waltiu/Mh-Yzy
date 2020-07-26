<template>
  <div v-loading="loading" element-loading-text="加载数据...">
    <public-content style="width: 100%;" :column="tableColumn" :fullData="infoFull"></public-content>
    <!-- 照片 -->
    <photo-viewer :info="rawdata"></photo-viewer>
    <!-- 旧式组建 -->
    <odf-occ-port :info="tableData"></odf-occ-port>
  </div>
</template>

<script>
import { http } from '@/_command/http';
import { table } from './table.js'
import PhotoViewer from '@/public/photoViewer/index'
import OdfOccPort from '@/public/OdfOccPort'
import {gmtPick} from '@/_command/data';
export default {
  name: 'ContentInfo',
  props: {
    info: Object,
  },
  components: {
    PhotoViewer,
    OdfOccPort
  },
  data () {
    return {
      loading: false,
      tableData: {},
      rawdata: {}
    }
  },
  computed: {
    tableColumn: function () {
      return Object.values(table)
    },
    infoFull: {
      get: function(){
        return gmtPick(this.info)
      }
    }
  },
  watch: {
    info: {
      immediate: true,
      handler: function () {
        this.loading = true
        http.get(`/api/ldsysFiberCoreOrders/jumpFiber/formedJumpFiber/${this.info.id}`)
          .then(res => res.data)
          .then(res => this.rawdata = res)
          .then(res => this.tableData = res.ldsysOpticalCrossConnect)
          .finally(() => this.loading = false)
      }
    }
  }
}
</script>