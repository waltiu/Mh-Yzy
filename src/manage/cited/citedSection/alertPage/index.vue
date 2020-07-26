<template>
  <!--
       共用组件
      用来显示信息 (仅限表格, 如需要在地图上显示信息请移步一期 AlertPage)
      API:
        colums: 接受表格的key
        selectArrayShow: 接受信息
  -->
  <dialog-page
    :info="fullData"
    :title="$t($pageUrl[type].name) + $t('OS.information')"
    :type="type"
    @close="$emit('close')"
    :editTf="editTf"
  >
    <div v-loading="loading">
      <el-tabs value="baseInfo">
        <el-tab-pane :label="$t('station.wallBasicInformation')" name="baseInfo">
          <show-table-info :table="columns" :info="fullData" :type="type"></show-table-info>
          <related-well style="margin-top: 60px;" :tableData="fullData"></related-well>
        </el-tab-pane>

        <el-tab-pane :label="$t('well.associatedFiberCable')" name="relatedCable">
          <table-and-paging
            :colums="returnColums('cable')"
            :tableData="fullData.ldsysOpticalCables || []"
          ></table-and-paging>
        </el-tab-pane>
      </el-tabs>
    </div>
  </dialog-page>
</template>

<script>
import relatedWell from './relatedWell'

export default {
  name: 'alertPage',
  components: {
    relatedWell
  },
  props: {
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object, // 要展示的数据
    editTf: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    loading: true,
    fullData: {}
  }),
  watch: {
    selectArrayShow: {
      immediate: true,
      handler: function (newVal) {
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    },
    editMapInfo: {
      handler: function (newVal) {
        if (newVal && newVal.mapType !== 'cran' && newVal.mapType !== 'machine' && newVal.mapType !== 'subdistricts') {
          this.fullData = newVal
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    editMapInfo: function () {
      return this.$store.state.mapEditInfo
    }
  },
  methods: {
    returnColums (z) {
      return [
        { title: 'tableSearch.name', key: 'name' },
        {
          title: 'tableSearch.operation',
          key: 'op',
          render: (h, params) =>
            <div>
              {this.$store.getters.getUserRole.includes(this.$userPermission[z].key + '.r')
                ? <el-button type="primary" size="mini" style="height: 25px; margin-right: 10px;"
                  onClick={() => {
                    this.$store.commit('setMapStatus', {
                      key: 'alertInfo',
                      status: { ...params.row }
                    })

                    this.$store.commit('setMapStatus', {
                      key: 'alertType',
                      status: z
                    })
                  }}>{this.$i18n.t('alert.view')}</el-button>
                : ''}
            </div>
        }
      ]
    }
  }
}
</script>
