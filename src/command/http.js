import Vue from 'vue'
import iView from 'iview'
import { http } from '@/_command/http'
import axios from 'axios'
import router from '../router'
import store from '../store'
import _ from 'lodash'

import { orderConfig } from '@/_config/urls'

Vue.use(iView)

var dialog = (info) => {
    store.commit('setSysStatus', {
        info: info.err.response.data,
        key: 'httpErr',
    })
}

http.interceptors.response.use(response => {
    return response
}, error => {
    if (axios.isCancel(error)) return
    switch (error.response.status) {
        case 429:
            dialog({
                err: error,
                content: '请求登录次数过多, 错误代码 ' + error.response.status
            })
            break
        case 400:
            dialog({
                err: error,
                content: '不正确的请求, 错误代码 ' + error.response.status
            })
            break
        case 500:
            dialog({
                err: error,
                content: '服务器错误, 错误代码 ' + error.response.status
            })
            break
        case 504:
            dialog({
                err: error,
                content: '网关超时, 错误代码 ' + error.response.status
            })
            break
        case 409:
            return error.response
        case 412 & 404:
            // 转移到局部处理
            return error.response
        // break
        case 401:
            dialog({
                // err: error.response,
                content: '会话过期, 请重新登录. 错误代码: ' + error.response.status
            }, () => {
                // 清除localStrong.
                window.sessionStorage.clear()
                // 重定向到主页
                router.push('/')
            })
            break
        default:
            dialog({
                err: error,
                content: '未知错误, 错误代码 ' + error.response.status
            })
            break
    }
    return {}
})

/**
 * 发送请求到后端
 * @param {Object} param0 参数
 */
var sendRequest = ({
    url,
    args,
    method
}, callback) => {
    let dataSchema = {
        method: method,
        url: url
    }
    // 在这里post也可以使用 params的 get 参数, 但是此项目用不到这个方法
    if (method.toLowerCase() === 'get') {
        dataSchema = {
            ...dataSchema,
            params: args
        }
    } else {
        dataSchema = {
            ...dataSchema,
            data: args
        }
    }
    http(dataSchema)
        .then((response) => {
            if (response) {
                callback(response)
            }
        })
}

var api = {

    add ({ url, args }, callback) {
        sendRequest({
            url: url,
            method: 'post',
            args: args
        }, (res) => {
            callback(res)
        })
    },
    del ({ url }, callback) {
        sendRequest({
            url: url,
            method: 'delete'
        }, (res) => {
            callback(res)
        })
    },
    get ({ url, args }, callback) {
        sendRequest({
            url: url,
            method: 'get',
            args: args
        }, (res) => {
            callback(res)
        })
    },
    update ({ url, args, type }, callback, config) {
        // 更新全局的时候，使用 template 过滤数据
        let targetArray = config[type]
            .map(a => a.key)
            .filter(a => !!a)
        let targetObject = {}
        for (const iterator of targetArray) {
            targetObject[iterator] = args[iterator]
        }
        // 过滤数据后把 args 参数注入
        let urls = Vue.prototype.$baseCURD
        sendRequest({
            url: url,
            method: 'patch',
            args: { ...targetObject, ...urls[type].args }
        }, (res) => {
            callback(res)
        })
    }
}
/**
 * @param name 名称, 要操作的资源名称 CURD
 * @param type 操作类型
 * @param info 操作信息
 */
var resourceOperating = ({ name, type, info }, callback) => {
    let urls = Vue.prototype.$baseCURD
    switch (type) {
        case 'create':
            api.add({
                type: name,
                url: (urls[name].create || urls[name].url),
                args: { ...info, ...urls[name].args }
            }, a => callback(a))
            break
        case 'update':
            api.update({
                type: name,
                url: (urls[name].update || urls[name].url) + info.id,
                args: { ...info, ...urls[name].args }
            }, a => callback(a), Vue.prototype.$allConfig)
            break
        case 'delete':
            api.del({
                type: name,
                url: (urls[name].delete || urls[name].url) + info.id
            }, a => callback(a))
            break
    }
}

/**
 * @param name 名称, 要操作的单名称 CURD
 * @param type 操作类型
 * @param info 操作信息
 */
var orderOperating = ({ name, type, info }, callback) => {
    let urls = Vue.prototype.$orderUrl
    switch (type) {
        case 'create':
            api.add({
                type: name,
                url: (urls[name].create || urls[name].url),
                args: { ...info, ...urls[name].args }
            }, a => callback(a))
            break
        case 'update':
            api.update({
                type: name,
                url: (urls[name].update || urls[name].url) + info.id,
                args: { ...info, ...urls[name].args }
            }, a => callback(a), Vue.prototype.$orderConfig)
            break
        case 'delete':
            api.del({
                type: name,
                url: (urls[name].delete || urls[name].url) + info.id
            }, a => callback(a))
            break
    }
}

/**
 * @param info table 单行信息
 * @param type table 类型, 匹配store字符串
 */
var getTableFullInfo = (type, info, callback) => {
    if (type && !_.isEmpty(info)) {
        sendRequest({
            url: store.state.infoMapShow.detailsUrl[type].url + info.id,
            args: store.state.infoMapShow.detailsUrl[type].args,
            method: 'get'
        }, (e) => {
            callback(e)
        })
    }
}

/**
 * @param info table 单行信息
 * @param type table 类型, 匹配store字符串
 */
var getMapFullInfo = (type, info, callback) => {
    sendRequest({
        url: Vue.prototype.$searchMapOneUrl[type].url + info.id,
        args: Vue.prototype.$searchMapOneUrl[type].args,
        method: 'get'
    }, (e) => {
        callback(e)
    })
}

/**
 * 获得表格分页信息
 */
var getTablePageInfo = ({ type, args }, callback) => {
    api.get({
        url: Vue.prototype.$pageUrl[type].url,
        args: { ...Vue.prototype.$pageUrl[type].args, ...args }
    }, (e) => {
        callback(e)
    })
}

/**
 * @param info order 单行信息
 * @param type order 类型
 */
var getOrderFullInfo = (type, info, callback) => {
    if (type && !_.isEmpty(info)) {
        sendRequest({
            url: Vue.prototype.$orderUrl[type].url + info.id,
            args: Vue.prototype.$orderUrl[type].args,
            method: 'get'
        }, (e) => {
            callback(e)
        })
    }
}

/**
 * type config的key
 */
var getDepartmentsList = async (type, { key, baseConfig } = { key: 'departmentId', baseConfig: orderConfig }) => {
    let departmentsList = await Vue.prototype.$http('/api/departments/all')

    // 针对 sysDepartments 工程单位
    let config = baseConfig[type].find(item => {
        if (item.key === key) {
            return item
        }
    })
    if (config) {
        config.list = departmentsList.data
    }
}

// 注册全局事件
Vue.prototype.$http = http
Vue.prototype.$api = api

// map
Vue.prototype.$getMapFullInfo = getMapFullInfo

// table
Vue.prototype.$getTableFullInfo = getTableFullInfo
Vue.prototype.$getTablePageInfo = getTablePageInfo
Vue.prototype.$resourceOperating = resourceOperating

// order
Vue.prototype.$getOrderFullInfo = getOrderFullInfo
Vue.prototype.$orderOperating = orderOperating

// 获取工程信息
Vue.prototype.$getDepartmentsList = getDepartmentsList