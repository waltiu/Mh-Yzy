<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('subdistricts.base_infomation')" name="first">
        <public-form
          style="width: 50%;"
          size="mini"
          :changeData="changeData"
          label-width="100px"
          :column="tableColumn"
          @changeData="bindData"
        ></public-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('subdistricts.serviceArea')" name="second">
        <net-edit :changeData="changeData" @returnData="bindData"></net-edit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { column } from '../index.js'
import NetEdit from '../components/net/index'

export default {
  name: 'AddContent',
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
      changeData: {}
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
      this.changeData = { ...this.changeData, ...item }
      this.$emit('returnChangeData', this.changeData)
    }
  },
}
</script>
