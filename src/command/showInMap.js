import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
import { mapHttp as http } from '@/_command/http'
import axios from 'axios'
import _ from 'lodash'
import Dexie from 'dexie'
const CancelToken = axios.CancelToken

var timerStart = ''
var dragStart = ''

var httpStatus = Object.keys(store.state.infoMapShow.inputSelect).reduce((res, key) => {
    res[key] = []
    return res
}, {})

Vue.use(Vuex)

var searchMapUrl = {
    // 包含zoom, lng, lat
    // KEYS 用来筛选, Array 存在于Vuex
    geoFences: { url: '/api/ldsysGeofences', args: { page: 0, size: 100000 }, name: '地理围栏', filter: (info) => info._embedded.ldsysGeofences },
    opticalSplitter: { url: '/api/ldsysOpticalSplitters/findByMap', args: {}, name: '分光器' },
    cable: { url: '/api/ldsysOpticalCables/search/listLdsysOpticalCables', args: { interval: 10 }, name: '光缆' },
    device: { url: '/api/ldsysEquipments/search/listLdsysLdsysEquipments', args: {}, name: '设备' },
    deviceRoom: { url: '/api/ldsysMachineRooms/search/listLdsysMachineRoom', args: {}, name: '机房' },
    error: {
        url: '/api/ldsysTroubles/search/listLdsysTroublesAndIsFixAndIsFixConfirm',
        name: '故障',
        args: { isFix: false, isFixConfirm: false }
    },
    odf: {
        url: '/api/ldsysOpticalCrossConnects/search/listLdsysOpticalCrossConnectsODF',
        name: 'ODF',
        args: {}
    },
    pipe: { url: '/api/ldsysLines/search/listLdsysPoints', args: { type: 1 }, name: '管道' },
    pipeSection: { url: '/api/ldsysLineSections/search/listLdsysPoints', args: { type: 1 }, name: '管道段' },
    pole: { url: '/api/ldsysPoints/search/listLdsysPoints', args: { type: 2 }, name: '电杆' },
    poleRoad: { url: '/api/ldsysLines/search/listLdsysPoints', args: { type: 2 }, name: '杆路' },
    poleSection: {
        url: '/api/ldsysLineSections/search/listLdsysPoints',
        args: { type: 2 },
        name: '杆路段'
    },

    support: { url: '/api/ldsysPoints/search/listLdsysPoints', args: { type: 9 }, name: '撑点' },
    supportSection: { url: '/api/ldsysLineSections/search/listLdsysPoints', args: { type: 4 }, name: '挂墙段' },

    cited: { url: '/api/ldsysPoints/search/listLdsysPoints', args: { type: 3 }, name: '引上' },
    citedSection: { url: '/api/ldsysLineSections/search/listLdsysPoints', args: { type: 3 }, name: '引入段' },

    station: { url: '/api/ldsysStations/search/listLdsysPoints', args: {}, name: '局站' },
    switchY: {
        url: '/api/ldsysOpticalCrossConnects/search/listLdsysOpticalCrossConnectsOCC',
        args: {},
        name: '光交'
    },
    well: { url: '/api/ldsysPoints/search/listLdsysPoints', args: { type: 1 }, name: '井' }
}

// 注册全局变量
Vue.prototype.$searchMapUrl = searchMapUrl
    // 筛选数据
var filterData = ({
    data,
    keys
    // data is Array
}) => {
    // 取消
    console.log(data)
    if (!data) return
    let loopData = data._embedded

    if (searchMapUrl[keys].filter) {
        loopData = searchMapUrl[keys].filter(data)
    }
    // 设置地图状态加载完毕
    store.commit('setMapStatus', {
            key: 'loadingStatus',
            status: false
        })
        // 提交到vuex display
        // FIX: 开关未打开时候会提交Vuex
    if (store.state.infoMapShow.buttonStatus[keys]) {
        store.commit('setDefaultShow', {
            name: keys,
            lines: loopData
        })
    }
}

var getItemListInMap = ({ url, args, keys }) => {
    var mapProp = {...store.state.infoMapShow.mapProperty }
        // 设置map状态为加载中
        // 正在加载的名称
    store.commit('setMapStatus', {
        key: 'loading',
        status: searchMapUrl[keys].name
    })
    store.commit('setMapStatus', {
        key: 'loadingStatus',
        status: true
    })
    if (store.state.isOutLineModel) {
        let isHadData = false
        for (let type of store.state.outLineLoadedData) {
            if (type === keys) isHadData = true
        }
        if (!isHadData) {
            let db = new Dexie('lms_mapdb')
            let tmp = {}
            tmp[keys] = 'id++,data'
            db.version(1).stores(tmp)
            db.open()
            db[keys].get({ id: 1 }).then((res) => {
                filterData({ data: res.data, url, args, keys })
                store.commit('setIsOutLineLoadedData', [...store.state.outLineLoadedData, keys])
            })
        } else {
            store.commit('setMapStatus', {
                key: 'loadingStatus',
                status: false
            })
        }
    } else {
        http.get(url, {
            cancelToken: new CancelToken(function executor(c) {
                httpStatus[keys].push(c)
            }),
            params: {
                ...mapProp.center,
                zoom: mapProp.zoom,
                ...args,
                // 注入参数
                ...store.state.infoMapShow.inputSelect[keys].selected
            }
        }).then((res) => {
            // 取消请求
            let data = res ? res.data : []
            filterData({ data: data, url, args, keys })
        })
    }
}

var checkButtonLoad = () => {
    for (const iterator in searchMapUrl) {
        if (store.state.infoMapShow.buttonStatus[iterator]) {
            getItemListInMap({...searchMapUrl[iterator], keys: iterator })
        }
    }
}

// ////////////////////////////////////////////////
// 開始各種監視
var watchMapStatus = () => {
    store.watch(state => state.infoMapShow.mapProperty, (newVal) => {
        // 如果进行了缩放, 将自动打开/关闭字幕
        if (newVal.zoom >= 18) {
            store.commit('setZoomEvent', {
                key: 'showLabel',
                info: true
            })
        } else {
            store.commit('setZoomEvent', {
                key: 'showLabel',
                info: false
            })
        }
        // 加载zoom 后判断
        var tmp = {...newVal }
        if (!store.state.infoMapShow.scale | Number(tmp.zoom) === 18 | Number(tmp.zoom) === 19) {
            // 取消上一次的拖动加载请求
            clearTimeout(dragStart)
                // 当连续拖动时不加载数据, 防止卡顿. 直到停止运动.
            dragStart = setTimeout(() => {
                // 拖動加載算法
                for (const key in searchMapUrl) {
                    // 判断开关是否打开
                    if (store.state.infoMapShow.buttonStatus[key]) {
                        getItemListInMap({...searchMapUrl[key], keys: key })
                    }
                }
            }, store.state.isOutLineModel ? 500 : 1800)
        } else {
            // 最大zoom 18
            // 当 zoom 小于 17 的时候, 将禁止网络请求, 延迟2s 后变成最大zoom 并且触发网络请求
            // 取消上一次的定时器
            if (!store.state.isOutLineModel) {
                clearTimeout(timerStart)
                timerStart = setTimeout(() => {
                    // 恢复zoom
                    store.commit('setMapZoom', 18)
                }, 2500)
            }
        }
    })
    store.watch(state => state.deleteFransh, (newVal) => {
        // console.log(newVal)
        // let a = {}
        // let b = {}
        if (newVal.tf) {
            // let tf = store.state.infoMapShow.buttonStatus[newVal.tf]
            // a[newVal.type] = false
            // console.log(a)
            // store.commit('setButtonStatus', a)
            // b[newVal.type] = true

            // store.commit('setButtonStatus', b)

            store.commit('setDefaultShow', {
                name: newVal.type,
                lines: []
            })
            for (const key in searchMapUrl) {
                // 判断开关是否打开
                if (store.state.infoMapShow.buttonStatus[key]) {
                    getItemListInMap({...searchMapUrl[key], keys: key })
                }
            }
            store.commit('deleteFranshTf', { tf: false })
                // store.commit('setButtonStatus', {
                //     [newVal.type]: tf
                // })

        }

    })
    store.watch(state => state.mapEditInfo, (newVal) => {

        if (newVal) {

            for (const key in searchMapUrl) {
                // 判断开关是否打开
                if (store.state.infoMapShow.buttonStatus[key]) {
                    getItemListInMap({...searchMapUrl[key], keys: key })
                }
            }


        }

    })
}

var watchSelectStatus = () => {

    for (const selectKey in store.state.infoMapShow.inputSelect) {
        store.watch(state => state.infoMapShow.inputSelect[selectKey].selected, (newVal) => {
            // 判断开关状态， 防止未开启加载

            let update = false
            if (!_.isEmpty(newVal)) {
                Object.entries(newVal).forEach(([, val]) => {
                    if (!_.isEmpty(val)) {
                        update = true
                    }
                })
            }
            if (update) {
                getItemListInMap({
                    ...searchMapUrl[selectKey],
                    keys: selectKey
                })
            }
        })
    }
}

var cancelhttp = (key) => {
    if (httpStatus[key]) {
        for (let index = 0; index < httpStatus[key].length; index++) {
            httpStatus[key].pop()()
        }
    }
}

var watchButtonStatus = () => {
    // 在关闭Button时候自动清空数据.
    store.watch(state => state.infoMapShow.buttonStatus, (newVal, oldVal) => {
        console.log(newVal)
        for (const key in newVal) {
            if (newVal[key] && newVal[key] !== oldVal[key]) {
                if (searchMapUrl[key]) {
                    getItemListInMap({...searchMapUrl[key], keys: key })
                }
            }

            if (!newVal[key] && newVal[key] !== oldVal[key]) {
                cancelhttp(key)
                    // 设置地图状态加载完毕
                store.commit('setMapStatus', {
                    key: 'loadingStatus',
                    status: false
                })
            }

            if (!newVal[key]) {
                // remove outLineData node at switch is close
                let isHadData = false
                for (let type of store.state.outLineLoadedData) {
                    if (type === key) isHadData = true
                }
                if (isHadData) {
                    store.commit('setIsOutLineLoadedData', [...store.state.outLineLoadedData.filter(type => type !== key)])
                }
                // 清空关闭显示列表
                // FIX: 开关未打开时候会提交Vuex
                if (newVal[key] !== oldVal[key]) {
                    store.commit('setDefaultShow', {
                        name: key,
                        lines: []
                    })
                }
            }
        }
        // 监视button状态, 如果有触发加载对应项目
    })
}

watchButtonStatus()

watchSelectStatus()

watchMapStatus()

export default {
    getItemListInMap,
    checkButtonLoad,
    watchButtonStatus,
    filterData,
    watchMapStatus
}