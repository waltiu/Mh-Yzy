<template>
  <div>
    <dialog-page
      :info="fullData"
      :title="$t($pageUrl[type].name) + $t('OS.information')"
      :type="type"
      @close="$emit('close')"
      :editTf="editTf"
    >
      <div v-loading="loading">
        <el-tabs value="baseInfo">
          <el-tab-pane :label="$t('station.rodBasicInformation')" name="baseInfo">
            <show-table-info :type="type" :table="columns" :info="fullData"></show-table-info>
          </el-tab-pane>

          <el-tab-pane :label="$t('well.associatedPoleSegment')" name="poleRoadSection">
            <table-and-paging :colums="poleRoadSection" :tableData="poleRoadSectionData"></table-and-paging>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>

export default {
  name: 'poleRoadAlertPage',
  props: {
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object, // 要展示的数据
    editTf: {
      default: false,
      type: Boolean
    }
  },
  components: {
  },
  data () {
    return {
      loading: true,
      fullData: {},
      poleRoadSectionData: [],
      poleRoadSection: [
        { title: 'tableSearch.name', key: 'name' },
        {
          title: 'tableSearch.operation',
          key: 'op',
          render: (h, params) =>
            <div>
              {this.$store.getters.getUserRole.includes(this.$userPermission['poleSection'].key + '.r')
                ? <el-button type="primary" size="mini" style="height: 25px; margin-right: 10px;"
                  onClick={() => {
                    this.$store.commit('setMapStatus', {
                      key: 'alertInfo',
                      status: { ...params.row }
                    })

                    this.$store.commit('setMapStatus', {
                      key: 'alertType',
                      status: 'poleSection'
                    })
                  }}>{this.$i18n.t('alert.view')}</el-button>
                : ''}
            </div>
        }
      ]
    }
  },
  computed: {
    editMapInfo: function () {
      return this.$store.state.mapEditInfo
    }
  },
  watch: {
    selectArrayShow: {
      immediate: true,
      handler: function (newVal) {
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.poleRoadSectionData = this.fullData.lines || []
          this.loading = false
          // 关联管道段
          // this.$api.get({
          //   url: '/api/ldsysPoints/' + this.fullData.id + '/ldsysLineSection'
          // }, (a) => {
          //   this.poleRoadSectionData = this.$checkOutData(a)
          //   this.loading = false
          // })
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
  }

}
</script>
