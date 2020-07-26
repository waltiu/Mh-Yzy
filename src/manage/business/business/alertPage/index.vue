<template>
  <div>
    <dialog-page
      :info="selectArrayShow"
      :title="$t($pageUrl[type].name) + $t('OS.information')"
      @close="$emit('close')"
    >
      <div v-loading="loading">
        <!-- 基础信息 -->
        <el-tabs value="info">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <show-table-info :type="type" :table="columns" :info="fullData">
              <div slot="view-photo"></div>

              <div slot="workOrProtect" v-if="fullData.serviceType === 'ywlx.hj'"></div>
            </show-table-info>

            <light-path :info="fullData"></light-path>
          </el-tab-pane>

          <el-tab-pane label="业务组成" name="test" v-if="fullData.serviceType === 'ywlx.hj'">
            <show-item type="edit" :fullData="fullData"></show-item>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import lightPath from './lightPathPic'
import showItem from './complex'

export default {
  name: 'businessAlertPage',
  props: {
    type: String,
    columns: Array, // 表格表头
    selectArrayShow: Object // 要展示的数据
  },
  components: {
    lightPath, showItem
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
        this.loading = true
        this.$getTableFullInfo(this.type, newVal, (e) => {
          this.fullData = e.data
          this.loading = false
        })
      }
    }
  }
}
</script>
