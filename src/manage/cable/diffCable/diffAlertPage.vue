<template>
  <div>
    <!-- 同光缆对比 -->
    <dialog-page :info="info" :title="$t('alert.comparedCable')" width="96%">
      <el-table :data="tableData">
        <el-table-column type="expand" class="expand" :width="20">
          <!-- 表格 -->
          <template slot-scope="info">
            <diff-table :info="info.row.clash" :colum="tableColum"></diff-table>
          </template>
        </el-table-column>

        <el-table-column
          v-for="(key, index) in ['groups', 'name', ...tableColum]"
          :key="index"
          :label="$t(store[key].name)"
          :prop="key"
          :width="key === 'name' ? 'auto' :110"
        >
          <template slot-scope="item">
            <div v-if="key === 'name'">
              <el-button
                type="primary"
                icon="el-icon-info"
                size="mini"
                circle
                @click="$alertInfo(item.row.ocA, 'cable')"
              ></el-button>
              {{ item.row.ocA.name }}
              <hr />
              <el-button
                type="primary"
                icon="el-icon-info"
                size="mini"
                circle
                @click="$alertInfo(item.row.ocB, 'cable')"
              ></el-button>
              {{ item.row.ocB.name }}
            </div>

            <div v-else-if="key === 'groups'">
              <el-tag size="small" :color="color[item.row.groups[0]]" style="margin-bottom: 1px;">
                <p style="color: white;">{{ item.row.groups[0] }}</p>
              </el-tag>

              <el-tag size="small" :color="color[item.row.groups[1]]" style="margin-top: 1px;">
                <p style="color: white;">{{ item.row.groups[1] }}</p>
              </el-tag>
            </div>

            <div v-else :style=" {'color': item.row.clash[key].length ? 'red' : 'black'} ">
              <el-tag
                :size="item.row.clash[key].length ? 'success' : 'info'"
                :hit="true"
              >{{ item.row.clash[key].length }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('alert.map')" :width="100">
          <template slot-scope="item">
            <el-button type="primary" circle @click="bindInfo(item.row)" size="mini">
              <md-icon style="color: white;">map</md-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer">
        <el-button type="primary" size="mini" @click="exportExcel">{{$t('public.exportAll')}}</el-button>
      </div>
    </dialog-page>

    <show-diff-in-map :diffInfo="showDiffInfo" :color="color"></show-diff-in-map>
  </div>
</template>

<script>
import showDiffInMap from './showDiffInMap.vue'

export default {
  name: 'diffAlertPage',
  props: {
    baseInfo: Array,
    info: Array,
    ajaxArgs: Array
  },
  components: {
    showDiffInMap
  },
  data () {
    return {
      showDiffInfo: {},
      tableColum: [
        'odf',
        'wellLineSection',
        'supportLineSection',
        'ledUp',
        'well',
        'poleLineSection',
        'ledUpLineSection',
        'pole',
        'support',
        'occ'
        // 'machineRooms'
      ]
    }
  },
  computed: {
    color: function () {
      return this.baseInfo.reduce((res, val) => {
        res[val.name] = val.color
        return res
      }, {})
    },
    store: function () {
      return { name: { name: 'alert.name' }, groups: { name: 'alert.groupName' }, ...this.$store.state.vendor.vendorName }
    },
    tableData: function () {
      return this.info.map(a => {
        return a
      })
    }
  },
  methods: {
    exportExcel () {
      this.$http.post('/api/ldsysOpticalCables/search/compareExcel', { info: this.ajaxArgs }, {
        responseType: 'blob'
      })
        .then(res => {
          this.$downloadFile(res)
        })
    },
    bindInfo (args) {
      this.$store.commit('setMapCenter', { lng: args.CenterLng, lat: args.CenterLat })
      this.$store.commit('setMapProperty', {
        key: 'zoom',
        info: Number(args.zoom)
      })
      this.showDiffInfo = { ...args }
    }
  }
}
</script>