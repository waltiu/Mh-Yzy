// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import i18n from './language'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'

import fullscreen from 'vue-fullscreen'
// import iView from 'iview'
import 'iview/dist/styles/iview.css'
import moment from 'moment'
import _ from 'lodash'
import jrQrcode from 'jr-qrcode'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue2-animate/dist/vue2-animate.min.css'

import version from './command/version.js'

import httplib from './command/http.js'
import showInMap from './command/showInMap'
import checkStatus from './command/checkStatus'
import { watchAll } from './command/globalCommand'
import globalComponent from './command/globalComponent'
import includeAllConfig from './command/includeAllConfigFiles.js'
import orderConfig from './command/orderConfig'
import globalConfig from './command/globalConfig.js'

import './_public/index'
import './_middle/index'
import './_command/curd'

import VueMaterial from 'vue-material'
import './css/vue-material.css'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

import 'maptalks/dist/maptalks.css'
import 'animate.css'

var zzz = function () { }

zzz(httplib, showInMap, checkStatus, globalComponent, includeAllConfig, orderConfig, globalConfig)

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
Vue.use(VueMaterial)
Vue.use(Vuex)
// Vue.use(iView)
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(fullscreen)

moment.locale(i18n.locale === 'zh' ? 'zh-cn' : 'en-gb')
Vue.prototype.$moment = moment
Vue.prototype.$qrcode = jrQrcode
Vue.prototype.$map = {}
Vue.prototype.$version = version.version

Vue.prototype._ = _

Vue.config.productionTip = false

let globalVm = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// if (version.version.buildType !== '测试版本') {
//   Raven
//     .config('https://1b7aeabc87884be4882348717cf69918@sentry.io/1283740')
//     .addPlugin(RavenVue, Vue)
//     .install()
// }
watchAll(globalVm)
