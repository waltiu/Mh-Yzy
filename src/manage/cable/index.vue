<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('vendorList.opticalCableInformation')" name="cableInfo">
        <cable-view :embed="false"></cable-view>
      </el-tab-pane>

      <el-tab-pane :label="$t('vendorList.cableComparison')" name="diffCable">
        <diff-cable></diff-cable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cableView from './cable'
import diffCable from './diffCable'

export default {
  name: 'diffCableIndex',
  components: {
    diffCable,
    cableView
  },
  data () {
    return {
      activeName: 'cableInfo'
    }
  }
}
</script>
