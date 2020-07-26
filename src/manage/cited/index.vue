<template>
  <div>
    <el-tabs value="well">
      <el-tab-pane :label="$t('vendorList.ledUp')" name="well">
        <cited></cited>
      </el-tab-pane>
      <el-tab-pane :label="$t('vendorList.ledUpLineSection')" name="pipeSection">
        <cited-section></cited-section>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cited from './cited'
import citedSection from './citedSection'

export default {
  name: 'wellManage',
  components: {
    cited, citedSection
  }
}
</script>
