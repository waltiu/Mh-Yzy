<template>
  <div v-loading="loading">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('subdistricts.base_infomation')" name="first">
        <div style="display:flex">
          <my-select :tableColumn="tableColumn" @changeData="changeData" :info="info"></my-select>
          <div class="right">
            <chart @topoData="toPoData"></chart>
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
      info: {},
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
      this.tableData = foin

    },
    toPoData (info) {
      this.charData = info
      // console.log('666', this.charData)
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
      // console.log('1')
      return {
        ...this.tableData, topologyInfo: this.charData
      }
    }
  }
}
</script>
<style scoped>
.right {
  border-left: 1px solid;
}
</style>
