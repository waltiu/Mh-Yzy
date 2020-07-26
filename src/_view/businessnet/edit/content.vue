<template>
  <div v-loading="loading">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('subdistricts.base_infomation')" name="first">
        <public-form
          style="width: 50%;"
          size="mini"
          :fullData="fullData"
          label-width="100px"
          :column="tableColumn"
          @changeData="bindData"
        ></public-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('subdistricts.serviceArea')" name="second">
        <net-edit :fullData="fullData" @returnData="bindData"></net-edit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { column } from '../index.js'
import NetEdit from '../components/net/index'

export default {
  name: 'EditContent',
  props: {
    request: Object,
    info: Object
  },
  components: {
    NetEdit
  },
  data () {
    return {
      activeName: 'first',
      fullData: {},
      loading: false
    }
  },
  watch: {
    request: {
      immediate: true,
      handler: function () {
        this.loadInfo()
      },
      deep: true
    }
  },
  computed: {
    tableColumn: function () {
      return Object.values(column)
        .filter(item => item.edit && item.edit.display)
        .filter(item => item.edit.display())
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.edit
          }
        })
    }
  },
  methods: {
    bindData (item) {
      this.fullData = { ...this.fullData, ...item }
      this.$emit('returnFullData', this.fullData)
      this.$emit('returnChangeData', { ...item, id: this.fullData.id })
    },
    loadInfo () {
      this.loading = true
      this.request
        .readOneTable({ info: this.info })
        .then(res => { this.fullData = res.data })
        .then(() => { this.showInfo = this.fullData.ldsysOpticaleCableWorks })
        .finally(() => { this.loading = false })
    }
  },
}
</script>
