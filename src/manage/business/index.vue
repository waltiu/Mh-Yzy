<template>
  <div>
    <!-- <el-tabs value="business"> -->
    <!-- <el-tab-pane label="业务资源管理" name="business"> -->
    <business></business>
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="同路由比较" name="diffRoute"> -->
    <!-- <diff-route></diff-route> -->
    <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
  </div>
</template>

<script>
import business from './business'
// import diffRoute from './diffRoute'

export default {
  name: 'wellManage',
  components: {
    business
  }
}
</script>
