<template>
  <div>
    <el-tabs value="business">
      <el-tab-pane :label="$t('opticalPath.opticalManagement')" name="business">
        <light-road></light-road>
      </el-tab-pane>
      <el-tab-pane :label="$t('opticalPath.opticalComparison')" name="diffRoute">
        <diff-light-road></diff-light-road>
        <!-- <diff-route></diff-route> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import lightRoad from './lightRoad'
import diffLightRoad from './diffLightRoad'

export default {
  name: 'wellManage',
  components: {
    lightRoad, diffLightRoad
  }
}
</script>
