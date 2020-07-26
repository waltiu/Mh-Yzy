<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <base-form :fullData="fullData"></base-form>
      </el-tab-pane>
      <el-tab-pane label="机框面板" name="second" v-if="fullData.detailInfos">
        <moban :templateInfo="templateInfo" :type="type" :fullData="fullData"></moban>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseForm from './list'
import moban from '../components/moban'
import { column } from '../index.js'
export default {

  name: 'readContent',
  props: {
    request: Object,
    info: Object,
    eventBus: Object


  },
  components: {
    baseForm,
    moban
  },
  provide: {
    couldOperation: false
  },
  methods: {

    getDetailInfo () {
      this.request
        .readOneTable({ info: this.info })
        .then(res => { this.fullData = { ...res.data } })
    }
  },

  data () {
    return {
      activeName: 'first',
      templateInfo: {
        detailInfos: ''
      },
      fullData: {},
    }
  },
  watch: {
    request: {
      immediate: true,
      handler: function () {
        this.getDetailInfo()
      }
    },
    fullData: {
      handler: function (newVal) {
        this.templateInfo = { ...newVal }
      },
      immediate: true,
      deep: true
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
  computed: {
    formConfig: function () {
      return Object.values(column).filter(item => item.edit && item.edit.display)

    }
  },


}
</script>
