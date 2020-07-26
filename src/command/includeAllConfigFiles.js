/**
 * The file enables `@/[name]/tableColumn.js` to import all vue modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
import Vue from 'vue'
const files = require.context('../manage/', true, /tableColumn.js$/)
const order = require.context('../manage/', true, /order\/order.js$/)

const fileModules = {}
const filePathName = {}

files.keys().forEach(key => {
    var mod = key.split('/')
    var modName = ''
    switch (mod.length) {
        case 4:
            modName = mod[2]
            break
        case 3:
            modName = mod[1]
            break
    }
    if (modName) {
        fileModules[modName] = files(key).default
        filePathName[modName] = key.replace('tableColumn.js', '').replace('./', '')
    }
})

Vue.prototype.$allConfig = fileModules
Vue.prototype.$pathName = filePathName

// 工单的自动注入
const orderModules = {}
const orderPathName = {}

order.keys().forEach(key => {
    var mod = key.split('/')
    var modName = ''
    switch (mod.length) {
        case 5:
            modName = mod[2]
            break
        case 4:
            modName = mod[1]
            break
    }
    if (modName) {
        orderModules[modName] = order(key).default
        orderPathName[modName] = key.replace('order.js', '').replace('./', '')
    }
})

Vue.prototype.$orderConfig = orderModules
Vue.prototype.$orderPathName = orderPathName