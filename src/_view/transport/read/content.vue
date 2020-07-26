<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="first">
        <div style="display:flex">
          <public-content style="width: 40vw;" :column="tableColumn" :fullData="fullData"></public-content>
          <div class="right">
            <chart :fullData="fullData" :showInfo="showInfo" :addData="addData"></chart>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { column } from '../index.js'
import chart from './chart'

export default {
  name: 'readContent',
  components: {
    chart
  },
  props: {
    request: Object,
    info: Object
  },

  data () {
    return {
      fullData: {},
      loading: false,
      showInfo: [],
      activeName: "first",
      addData: []
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
  methods: {
    loadInfo () {
      this.loading = true
      // console.log(this.info)
      this.request
        .readOneTable({ info: this.info })
        .then(res => { this.fullData = res.data })
        .then(() => { this.showInfo = this.fullData.ldsysOpticaleCableWorks })
        .finally(() => { this.loading = false })
    }
  },
  computed: {
    tableColumn: function () {
      return Object.values(column)
        .filter(item => item.read && item.read.display)
        .filter(item => item.read.display())
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.read
          }
        })
    }
  },
  mounted () {

    this.info.topologyInfo.nodes.map((item) => {
      this.$getTableFullInfo('device', { id: item.id }, (e) => {
        this.addData.push(e.data)
      })
    })
  }
}
</script>

<style>
.right {
  border-left: 1px solid;
}
</style>