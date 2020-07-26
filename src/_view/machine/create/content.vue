<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <base-form :formConfig="formConfig" @submitForm="submitForm" :fullData="fullData"></base-form>
      </el-tab-pane>
      <el-tab-pane label="机框面板" name="second" v-if="mobanShow">
        <moban :templateInfo="templateInfo" :fullData="fullData.detailInfos" :operation="operation"></moban>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseForm from '../components/form'
import moban from '../components/moban'
export default {

  name: 'createContent',
  props: {
    request: Object,
    info: Object,

  },

  components: {
    baseForm,
    moban
  },
  inject: ['column'],
  provide: {
    couldOperation: false
  },
  methods: {
    // changeType (info) {

    //   let a = {}
    //   this.templateInfo = { ...info }
    //   if (info.model === 'FONST1000(1UC)') {
    //     for (let index = 0; index < 3; index++) {
    //       a[index] = {
    //         id: null,
    //         name: null,
    //         portInfos: null
    //       }
    //     }
    //   } else if (info.model === 'FONST3000(3UC)' && info.type === '0') {
    //     console.log(info)
    //     for (let index = 0; index < 9; index++) {
    //       a[index] = {
    //         id: null,
    //         name: null,
    //         portInfos: null
    //       }
    //     }
    //   } else if (info.model === 'FONST3000(3UC)' && info.type === '1') {
    //     console.log(info)

    //     for (let index = 0; index < 18; index++) {
    //       a[index] = {
    //         id: null,
    //         name: null,
    //         portInfos: null
    //       }
    //     }
    //   } else {
    //     a = ""
    //   }
    //   this.templateInfo.detailInfos = a
    //   console.log(this.templateInfo)
    // },
    submitForm (info) {
      if (info.model && info.model === 'FONST1000(1UC)') {
        this.mobanShow = true
      } else if (info.model === 'FONST3000(3UC)' && info.type === 0) {
        this.mobanShow = true

      } else if (info.model === 'FONST3000(3UC)' && info.type === 1) {
        this.mobanShow = true

      } else {
        this.mobanShow = false
      }
      this.templateInfo = { ...info }
      this.$emit('returnChangeData', info)
    },

  },
  data () {
    return {
      activeName: 'first',
      operation: false,
      templateInfo: {
        detailInfos: ''
      },
      fullData: {
        detailInfos: {

        }
      },
      mobanShow: false


    }
  },
  computed: {
    formConfig: function () {
      return Object.values(this.column).filter(item => item.edit && item.edit.display)

    }
  },


}
</script>
