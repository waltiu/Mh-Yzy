<template>
  <!-- 业务对比 -->
  <el-dialog
    :title="$t('vendorList.businessComparison')"
    top="10vh"
    width="98%"
    :modal="false"
    :visible.sync="dialogVisible"
    :before-close="() => {dialogVisible = false}"
  >
    <el-table :data="diffInfo" style="width: 100%" default-expand-all>
      <el-table-column type="expand">
        <template slot-scope="props">
          <table-paging
            style="padding-bottom: 10px;"
            :colums="colums"
            :tableData="tableData(props)"
          ></table-paging>
        </template>
      </el-table-column>
      <!-- 业务名称 -->
      <el-table-column :label="$t('vendorList.businessName')" prop="info.name" width="650px">
        <div slot-scope="item">
          <el-button
            type="primary"
            icon="el-icon-info"
            size="mini"
            circle
            @click="$alertInfo(item.row.wa, 'business')"
          ></el-button>
          {{ item.row.wa.name }}
          <hr />

          <el-button
            type="primary"
            icon="el-icon-info"
            size="mini"
            circle
            @click="$alertInfo(item.row.wb, 'business')"
          ></el-button>
          {{ item.row.wb.name }}
        </div>
      </el-table-column>

      <el-table-column
        v-for="(a,b) in colums"
        :key="b"
        :label="$t(a.title)"
        :prop="'info.'+ a.key"
        :default-expand-all="true"
      >
        <div slot-scope="item">
          <el-tag
            :size="Number(item.row.info[a.key]) ? 'success' : 'info'"
            :hit="true"
          >{{ item.row.info[a.key] }}</el-tag>

          <!-- {{ item.row.info[a.key] }} -->
        </div>
      </el-table-column>

      <el-table-column :label="$t('tableSearch.operation')">
        <template slot-scope="item">
          <el-button type="primary" circle @click="showInMapA(item)" size="mini">
            <md-icon style="color: white;">map</md-icon>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column :label="$t('_view.export')">
        <template slot-scope="item">
          <el-button
            type="primary"
            circle
            @click="exportExcel([[item.row.wa.id, item.row.wb.id]])"
            size="mini"
          >
            <md-icon style="color: white;">cloud_download</md-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <span slot="footer" class="dialog-footer"></span> -->
    <div slot="footer">
      <p
        style="float: right;margin-top: 5px; margin-left: 10px;"
      >{{$t('vendorList.itTakes')}} {{ $store.state.diffRoute.diffTime }} {{$t('vendorList.second')}}, {{ diffInfo.length }} {{$t('vendorList.data')}}</p>
      <el-button
        type="primary"
        size="mini"
        @click="exportExcel(diffInfo.map(item => [item.wa.id, item.wb.id]))"
      >{{$t('public.exportAll')}}</el-button>
    </div>
    <transition name="el-fade-in-linear">
      <show-in-map v-if="!_.isEmpty(showData)" :diffInfo.sync="showData"></show-in-map>
    </transition>
  </el-dialog>
</template>

<script>
import tablePaging from '@/public/tableAndPaging'
import showInMap from './map'

export default {
  name: 'diffPath',
  components: {
    tablePaging, showInMap
  },
  props: {
    diffInfo: Array
  },
  data () {
    return {
      showData: {},
      dialogVisible: false
    }
  },
  watch: {
    diffInfo: function (newVal) {
      if (!this._.isEmpty(newVal)) {
        this.$store.commit('setDiffInfo', newVal)
        // this.$store.commit('setMapButtonStatus', false)
        this.dialogVisible = true
      }
    },
    dialogVisible: function (newVal) {
      if (!newVal) {
        this.$emit('update:diffInfo', [])
        // this.$store.commit('setMapButtonStatus', true)
      }
    }
  },
  computed: {
    colums: function () {
      let tmp = []
      let info = [...this.diffInfo]
      if (!this._.isEmpty(info)) {
        Object.entries(info[0].clash).forEach(([key]) => {
          if (!['lineSection'].includes(key)) {
            tmp.push({
              title: this.store[key].name,
              key: key
            })
          }
        })
      }
      return tmp
    },
    store: function () {
      return this.$store.state.vendor.vendorName
    }
  },
  methods: {
    exportExcel (args) {
      this.$http.post('/api/ldsysOpticaleCableWorks/compareOcWorkExcel', args, {
        responseType: 'blob'
      })
        .then(res => {
          this.$downloadFile(res)
        })
    },
    showInMapA (e) {
      // 设置地图中心
      this.$store.commit('setMapCenter', { lng: e.row.CenterLng, lat: e.row.CenterLat })
      this.$store.commit('setMapProperty', {
        key: 'zoom',
        info: Number(e.row.zoom)
      })
      this.showData = { ...e.row }
    },
    tableData (e) {
      let target = e.row.clash
      let targetTableData = []
      let targetKeyList = []
      let tmp = {}
      let length = 0
      Object.entries(target).forEach(([key]) => {
        if (target[key].length > length) {
          length = target[key].length
        }
        targetKeyList.push(key)
      })
      for (const iterator of [...Array(length).keys()]) {
        tmp = {}
        for (const keys of targetKeyList) {
          if (target[keys][iterator]) {
            tmp[keys] = target[keys][iterator].name
          }
        }
        targetTableData.push(tmp)
      }
      return targetTableData
    }
  }
}
</script>
