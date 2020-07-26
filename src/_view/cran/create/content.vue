<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="first">
        <basicTable
          :tableColumn="tableColumn"
          @submitForm="submitForm"
          @templateInfo="templateInfo"
        ></basicTable>
      </el-tab-pane>
      <el-tab-pane label="分合波盘面板" name="second" v-if="moban">
        <cran :moban="moban" @submitMoban="submitMoban"></cran>
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
      moban: ''
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
  }

}
</script>

<style>
</style>