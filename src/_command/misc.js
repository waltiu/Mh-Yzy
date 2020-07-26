import store from '@/store'
import { http } from '@/_command/http'
import { checkOutData } from './tools'

/**
 * 文件字典排序
 */
const opticalMultiplexer = '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'
export const fileConfigDict = () => {
    return store.getters.vendorNameByType['icon']
        .map(item => {
            switch (item.vendor) {
                case 'ledUp':
                    // 引上
                    item.vendor = 'cited'
                    break

                case 'occ':
                    // 光交
                    item.vendor = 'opticalCrossConnect'
                    break
            }
            return item
        })
}

/**
 * 获取字典
 * @param {Array} list 
 */
export const getFileDic = (list = fileConfigDict()) => {
    store.commit('setIcons', { data: opticalMultiplexer, key: 'opticalMultiplexer' })

    list.forEach((item) => {
        if (item.vendor !== 'opticalMultiplexer') {
            http.get(`/api/ldsysFiles/${item.vendor}`)
                .then(res => res.data)
                .then(res => store.commit('setIcons', { data: res.base64file, key: item.alert }))
        }


    })
    http.get(`/api/ldsysFiles/${'transport'}`)
        .then(res => res.data)
        .then(res => store.commit('setIcons', { data: res.base64file, key: 'transport' }))
        .then(store.commit('setIcons', { data: opticalMultiplexer, key: 'opticalMultiplexer' }))

}

/**
 * 获取配置
 */
export const getConfig = () =>
    http.get('/api/ldsysConfigs', {
        params: {
            page: 0,
            size: 9999999
        }
    })
    .then(checkOutData)

/**
 * 杂项
 */
export const getNecessaryInfo = () =>
    // 枚举字段 字典
    http.get('/api/ldsysDictionaries', {
        params: {
            size: 9999999,
            page: 0
        }
    })
    .then(checkOutData)


export const getRoleList = () =>
    http.get('/api/sysAuths', {
        params: {
            size: 1000,
            page: 0
        }
    })
    .then(checkOutData)

/**
 * 恢复状态, 必须在有状态之后
 */
export const recoverSession = () => {
    if (window.sessionStorage.getItem('token') && window.sessionStorage.getItem('token') !== 'undefined') {
        store.state.token['x-auth-token'] = window.sessionStorage.getItem('token')
    }

    if (window.sessionStorage.getItem('token') && window.sessionStorage.getItem('token') !== 'undefined' && store.state.token['x-auth-token']) {
        return true
    } else {
        return false
    }
}

/**
 * 初始化状态机
 */
export const initStore = () => {
    getFileDic()

    getConfig()
        .then((res) => store.commit('setSettings', res))

    getNecessaryInfo()
        .then((res) => store.commit('setRowDictionaries', res))
}

/**
 * 全局Dialog
 * @param {Object} item 要弹框的OBject
 * @param {String} type 类型
 */
export const alertInfo = (item, type) => {
    store.commit('setMapStatus', {
        key: 'alertInfo',
        status: {...item }
    })

    store.commit('setMapStatus', {
        key: 'alertType',
        status: type
    })
}