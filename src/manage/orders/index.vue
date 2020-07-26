<template>
  <div>
    <!-- 工单管理界面 -->
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, index) in orders"
        :key="index"
        :label="$t($orderUrl[index].name)"
        :name="index"
      >
        <div v-if="$store.getters.getUserRole.includes($orderPermission[index].key + '.r')">
          <component :is="component(index, item)"></component>
        </div>

        <div v-else>{{$t('lightRoad.noPermission')}}</div>
      </el-tab-pane>
      <el-tab-pane :label="$t('OS.orderStatistics')">
        <div v-if="$store.getters.getUserRole.includes('fgqgdgl.tj')">
          <order-statistics></order-statistics>
        </div>

        <div v-else>{{$t('lightRoad.noPermission')}}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import orderStatistics from './orderStatistics'
import CableOrder from '@/_view/cable/order/index.vue'

export default {
  components: {
    orderStatistics,
    CableOrder
  },
  name: 'orders',
  data () {
    return {
      activeName: 'opticalSplitter'
    }
  },
  computed: {
    orders: function () {
      return this.$orderConfig
    }
  },
  methods: {
    component (item) {
      return require('../' + this.$pathName[item] + 'order/index.vue').default
    }
  }
}
</script>

<style scoped>
</style>
