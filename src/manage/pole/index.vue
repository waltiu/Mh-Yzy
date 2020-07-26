<template>
  <div>
    <el-tabs value="pole">
      <el-tab-pane :label="$t('vendorList.pole')" name="pole">
        <pole></pole>
      </el-tab-pane>
      <el-tab-pane :label="$t('vendorList.poleLineSection')" name="poleSection">
        <pole-section></pole-section>
      </el-tab-pane>
      <el-tab-pane :label="$t('vendorList.poleRoad')" name="poleRoad">
        <poleRoad></poleRoad>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pole from './pole'
import poleSection from './poleSection'
import poleRoad from './poleRoad'

export default {
  name: 'wellManage',
  components: {
    pole, poleSection, poleRoad
  }
}
</script>
