<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="first">
        <basicTable :tableColumn="tableColumn" @defaultData="defaultData" :fullData="fullData"></basicTable>
      </el-tab-pane>
      <el-tab-pane label="分合波盘面板" name="second">
        <cran :moban="moban"></cran>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import basicTable from './content/base'
import cran from './content/cran'
import { column } from '../index.js'

export default {

  name: 'createContent',
  data () {
    return {
      activeName: 'first',
      moban: {},
      fullData: {},

    }
  },
  props: {
    info: Object,
    request: Object,
    eventBus: Object
  },
  components: {
    basicTable, cran

  },
  methods: {
    defaultData (info) {
      this.moban = info
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
            ...item.edit
          }
        })
    },
  },
  watch: {
    fullData: function (newVal) {
      this.moban = { ...{ portNumber: newVal.portNumber }, ...{ templateInfo: newVal.portInfos } }
    },
    eventBus: {
      handler: function (newVal) {
        if (newVal) {
          this.request
            .readOneTable({ info: newVal.fullData })
            .then(res => { this.fullData = res.data })
        }

      },
      immediate: true
    }
  },
  mounted () {
    this.request
      .readOneTable({ info: this.info })
      .then(res => { this.fullData = res.data })
    // .then(res => console.log(res))
  }



}
</script>

<style>
</style>