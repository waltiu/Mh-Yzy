<template>
  <div v-loading="loading">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('subdistricts.base_infomation')" name="first">
        <div style="display:flex">
          <my-select :tableColumn="tableColumn" @changeData="changeData(info)" :info="fullData"></my-select>
          <div class="right">
            <chart :fullData="fullData.topologyInfo" @topoData="toPoData"></chart>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mySelect from '../componets/form'
import { column } from '../index.js'
import chart from './chart'

export default {
  name: 'createContent',
  props: {
    request: Object,
    info: Object
  },
  components: {
    mySelect,
    chart
  },
  data () {
    return {
      activeName: 'first',
      fullData: {},
      loading: false,
      tableData: {},
      charData: {},

    }
  },
  watch: {
    submitData: {
      handler (newVal) {
        this.$emit("returnChangeData", newVal)
      },
      immediate: true,
      deep: true
    },
    charData: function (newVal) {
      return newVal
    }
  },
  methods: {
    changeData (info, foin) {
      this.tableData = { foin, ...this.fullData }
      // console.log(this.tableData)
    },
    toPoData (info) {
      this.charData = info
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
    },
    submitData: function () {
      return {
        ...this.tableData, topologyInfo: this.charData
      }
    }
  },
  mounted () {
    this.loading = true
    this.request
      .readOneTable({ info: this.info })
      .then(res => { this.fullData = res.data })
      .finally(() => { this.loading = false })
  }
}
</script>
<style scoped>
.right {
  border-left: 1px solid;
}
</style>
