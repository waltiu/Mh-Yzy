<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <base-form
          :formConfig="formConfig"
          @changeMachine="changeMachine"
          @changeType="changeType"
          @submitForm="submitData"
          :fullData="fullData"
        ></base-form>
      </el-tab-pane>
      <el-tab-pane label="机框面板" name="second" v-if="fullData.machineFrameUseInfos">
        <moban
          :templateInfo="templateInfo"
          :type="type"
          :fullData="fullData"
          @submitData="submitData"
        ></moban>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseForm from '../components/form'
import moban from '../components/moban'
import { column } from '../index.js'
export default {

  name: 'EditContent',
  props: {
    request: Object,
    info: Object,

  },
  components: {
    baseForm,
    moban
  },
  provide: {
    couldOperation: true
  },
  methods: {
    changeType (info) {
      this.type = info.type
      let a = {}
      this.templateInfo = { ...info }
      if (info.model === 'FONST1000(1UC)') {
        for (let index = 0; index < 3; index++) {
          a[index] = {
            id: null,
            name: null,
            portInfos: null
          }
        }
      } else if (info.model === 'FONST3000(3UC)' && info.type === 0) {
        for (let index = 0; index < 8; index++) {
          a[index] = {
            id: null,
            name: null,
            portInfos: null
          }
        }
      } else if (info.model === 'FONST3000(3UC)' && info.type === 1) {
        for (let index = 0; index < 16; index++) {
          a[index] = {
            id: null,
            name: null,
            portInfos: null
          }
        }
      } else {
        a = ""
      }
      this.submitData({ detailInfos: a })
    },
    changeMachine (info) {
      this.fullData.machineFrameUseInfos = info
    },
    submitData (info) {
      this.submit = { ...this.submit, ...info }
      this.$emit('returnChangeData', this.submit)
    },
    getDetailInfo () {
      this.request
        .readOneTable({ info: this.info })
        .then(res => { this.fullData = { ...res.data }, this.submit = { ...res.data } })
    }
  },
  data () {
    return {
      activeName: 'first',
      templateInfo: {
        machineFrameUseInfos: true
      },
      fullData: {},
      submit: {},
      type: ''
    }
  },
  watch: {
    request: {
      immediate: true,
      handler: function () {
        this.getDetailInfo()
      }
    },
    info: {
      handler: function (newVal) {
        this.fullData = { ...newVal }
      },
      immediate: true,
      deep: true
    }



  },
  computed: {
    formConfig: function () {
      return Object.values(column).filter(item => item.edit && item.edit.display)
    }
  },


}
</script>
