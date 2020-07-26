<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t('vendorList.odf') + $t('OS.information')"
      :type="type"
      @close="$emit('close')"
      :editTf="editTf"
    >
      <!-- 基础信息 -->
      <div v-loading="loading">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <List :selectArrayShow="fullData" :columns="columns" :type="type"></List>
          </el-tab-pane>
          <el-tab-pane label="端口" name="second">
            <Port :fullData="fullData"></Port>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import Port from './port'
import List from './list'
export default {
  name: 'odfAlertPage',
  data () {
    return {
      fullData: {},
      activeName: 'first',
      loading: true,


    }
  },
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
