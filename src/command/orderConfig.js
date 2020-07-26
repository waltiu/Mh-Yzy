import Vue from 'vue'

var orderPermission = {
  'opticalSplitter': { key: 'fgqgdgl', name: '分光器工单管理' }
}

var orderUrl = {
  'opticalSplitter': { url: '/api/ldsysOpticalSplitterOrders/', args: {}, name: 'OS.SDM' }
}

Vue.prototype.$orderPermission = orderPermission
Vue.prototype.$orderUrl = orderUrl
