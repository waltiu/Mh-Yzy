<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t($pageUrl[type].name) + $t('OS.information')"
      :type="type"
      @close="$emit('close')"
      :editTf="editTf"
    >
      <div v-loading="loading">
        <!-- 基础信息 -->

        <el-tabs value="baseInfo">
          <el-tab-pane :label="$t('main.basicInformation')" name="baseInfo">
            <show-table-info :type="type" :table="columns" :info="fullData"></show-table-info>
          </el-tab-pane>

          <el-tab-pane :label="$t('station.off-stationODF')" name="odf">
            <table-and-paging
              :colums="deviceColumns"
              :tableData="fullData.ldsysOpticalCrossConnects ? fullData.ldsysOpticalCrossConnects : []"
            ></table-and-paging>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'deviceRoomAlertPage',
  props: {
    type: String,
    selectArrayShow: Object,
    columns: Array,
    editTf: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      loading: true,
      fullData: {},
      deviceColumns: [
        { title: 'tableSearch.name', key: 'name' },
        {
          title: 'tableSearch.operation',
          key: 'op',
          render: (h, params) =>
            <div>
              {this.$store.getters.getUserRole.includes(this.$userPermission['deviceRoom'].key + '.r')
                ? <el-button type="primary" size="mini" style="height: 25px; margin-right: 10px;"
                  onClick={() => {
                    this.$store.commit('setMapStatus', {
                      key: 'alertInfo',
                      status: { ...params.row }
                    })

                    this.$store.commit('setMapStatus', {
                      key: 'alertType',
                      status: 'odf'
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
          this.loading = false
        })
      }
    },
    editMapInfo: {
      handler: function (newVal) {
        console.log(newVal, 99999)
        if (newVal) {
          this.fullData = newVal
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
