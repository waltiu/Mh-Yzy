<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="first">
        <basicTable
          :tableColumn="tableColumn"
          @submitForm="submitForm"
          @templateInfo="templateInfo"
          :fullData="fullData"
          @changeInfo="changeInfo"
        ></basicTable>
      </el-tab-pane>
      <el-tab-pane label="分合波盘面板" name="second" v-if="moban">
        <cran :moban="moban" @submitMoban="submitMoban" :fullData="fullData.portInfos"></cran>
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
  props: {
    info: Object,
    request: Object
  },
  data () {
    return {
      activeName: 'first',
      moban: '',
      fullData: {},

    }
  },
  components: {
    basicTable, cran

  },

  methods: {
    templateInfo (info) {
      this.moban = info
    },
    submitForm (info) {
      this.$emit('submitForm', info)
    },
    submitMoban (info) {
      this.$emit('submitForm', { portInfos: info })
    },
    changeInfo (info) {
      this.$emit('submitForm', { ...{ parent: info.parent }, ...{ topologyInfo: info.topologyInfo } })

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
  },
  mounted () {
    this.$http.get(`api/ldsysOpticalMultiplexers/${this.info.id}`).then(res => this.fullData = res.data)

  }

}
</script>

<style>
</style>