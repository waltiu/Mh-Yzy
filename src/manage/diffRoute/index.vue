<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('diffRoute.CN_S_CO_R')" name="first">
        <diff-business></diff-business>
      </el-tab-pane>

      <el-tab-pane :label="$t('diffRoute.CN_O_CO_R')" name="third">
        <diff-light-road></diff-light-road>
      </el-tab-pane>

      <el-tab-pane :label="$t('diffRoute.CN_O_C_CO_R')" name="second">
        <diff-cable></diff-cable>
      </el-tab-pane>
      <el-tab-pane label="传输系统同路由" name="fourth">
        <diff-transport></diff-transport>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import diffBusiness from './diffRoute'
import diffLightRoad from '@/manage/lightRoad/diffLightRoad'
import diffCable from '@/manage/cable/diffCable'
import diffTransport from '@/_view/transport/diffTransport'

export default {
  name: 'diffTabs',
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    diffLightRoad,
    diffBusiness,
    diffCable,
    diffTransport
  }
}
</script>
