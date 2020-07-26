<template>
  <div>
    <el-tabs value="well">
      <el-tab-pane :label="$t('vendorList.well')" name="well">
        <well></well>
      </el-tab-pane>
      <el-tab-pane :label="$t('vendorList.wellLineSection')" name="pipeSection">
        <pipe-section></pipe-section>
      </el-tab-pane>
      <el-tab-pane :label="$t('vendorList.pipe')" name="pipe">
        <pipe></pipe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import well from './well'
import pipeSection from './pipeSection'
import pipe from './pipe'

export default {
  name: 'wellManage',
  components: {
    well, pipeSection, pipe
  }
}
</script>
