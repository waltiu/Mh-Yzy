<template>
  <div>
    <el-tabs value="well">
      <el-tab-pane :label="$t('infoMap.support')" name="well">
        <support></support>
      </el-tab-pane>
      <el-tab-pane :label="$t('infoMap.supportSection')" name="pipeSection">
        <support-section></support-section>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import support from './support'
import supportSection from './supportSection'

export default {
  name: 'wellManage',
  components: {
    support, supportSection
  }
}
</script>
