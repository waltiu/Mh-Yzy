<template>
  <div>
    <!-- <dialog-page :info="selectArrayShow" :title="$t($pageUrl[type].name) + $t('OS.information')" @close="$emit('close')"> -->
    <dialog-page
      :info="selectArrayShow"
      :title="$t('vendorList.occ') + $t('OS.information')"
      :type="type"
      @close="$emit('close')"
      :editTf="editTf"
    >
      <div v-loading="loading">
        <!-- 基础信息 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <List :selectArrayShow="fullData" :columns="columns" :type="type"></List>
          </el-tab-pane>
          <el-tab-pane label="端口" name="second">
            <Port :fullData="fullData"></Port>
          </el-tab-pane>
          <el-tab-pane :label="$t('tableSearch.spectrometerList')" name="fixlog">
            <table-and-paging
              :colums="opticalSplitterList"
              :tableData="fullData.ldsysOpticalSplitters || []"
            ></table-and-paging>
          </el-tab-pane>
        </el-tabs>
        <!-- <el-tabs value="info">

          <el-tab-pane :label="$t('main.basicInformation')" name="info">

            <show-table-info :type="type" :table="columns" :info="fullData"></show-table-info>
            <odf-occ-port :info="fullData" @selectPort="(e) => {changeStatus = e}"></odf-occ-port>
          </el-tab-pane>

          <el-tab-pane :label="$t('tableSearch.spectrometerList')" name="fixlog">
            <table-and-paging :colums="opticalSplitterList" :tableData="fullData.ldsysOpticalSplitters || []"></table-and-paging>
          </el-tab-pane>

        </el-tabs>-->
      </div>
    </dialog-page>
  </div>
</template>

<script>
// import OdfOccPort from '@/public/OdfOccPort'
import Port from './port'
import List from './list'
export default {
  name: 'switchYAlertPage',
  props: {
    type: String,
    selectArrayShow: Object,
    columns: Array,
    editTf: {
      default: false,
      type: Boolean
    }
  },
  components: {
    Port,
    List
  },
  data () {
    return {
      loading: true,
      fullData: {},
      activeName: 'first',
      // opticalSplitterList: {}
    }
  },
  computed: {
    editMapInfo: function () {
      return this.$store.state.mapEditInfo
    },
    opticalSplitterList: function () {
      let config = this.$allConfig['opticalSplitter'].reduce((res, val) => {
        if (val.tableDisplay) {
          res.push(val)
        }
        return res
      }, [])
      return [...config,
      {
        title: 'tableSearch.operation',
        key: 'op',
        render: (h, params) =>
          <div>
            {this.$store.getters.getUserRole.includes(this.$userPermission['opticalSplitter'].key + '.r')
              ? <el-button type="primary" size="mini" style="height: 25px; margin-right: 10px;"
                onClick={() => {
                  this.$alertInfo(params.row, 'opticalSplitter')
                }}>{this.$i18n.t('alert.view')}</el-button>
              : ''}
          </div>
      }
      ]
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
