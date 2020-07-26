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
        <!-- 基础信息 -->
        <el-tabs value="info">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <show-table-info :type="type" :table="columns" :info="fullData"></show-table-info>
            <!-- oc 使用信息 -->
          </el-tab-pane>

          <el-tab-pane :label="$t('well.associatedPipeSegment')" name="relatedPipeSection">
            <table-and-paging
              :colums="returnData('pipeSection')"
              :tableData="fullData.ldsysLineSection || []"
            ></table-and-paging>
          </el-tab-pane>

          <el-tab-pane :label="$t('well.associatedFiberCable')" name="relatedCable">
            <table-and-paging
              :colums="returnData('cable')"
              :tableData="fullData.ldsysOpticalCables || []"
            ></table-and-paging>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="editButtonList"></div>
    </dialog-page>
  </div>
</template>

<script>

export default {
  name: 'wellAlertPage',
  props: {
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object, // 要展示的数据,
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
      fullData: {}
    }
  },
  watch: {
    selectArrayShow: {
      immediate: true,
      handler: function (newVal) {
        console.log(newVal)
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    },
    editMapInfo: {
      handler: function (newVal) {
        console.log(newVal)
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
    returnData (type) {
      return [
        { title: 'tableSearch.name', key: 'name' },
        {
          title: 'tableSearch.operation',
          key: 'op',
          render: (h, params) =>
            <div>
              {this.$store.getters.getUserRole.includes(this.$userPermission[type].key + '.r')
                ? <el-button type="primary" size="mini" style="height: 25px; margin-right: 10px;"
                  onClick={() => {
                    this.$store.commit('setMapStatus', {
                      key: 'alertInfo',
                      status: { ...params.row }
                    })

                    this.$store.commit('setMapStatus', {
                      key: 'alertType',
                      status: type
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
