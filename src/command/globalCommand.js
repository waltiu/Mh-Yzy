import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
import _ from 'lodash'
import zxcvbn from 'zxcvbn'
import moment from 'moment'

Vue.use(Vuex)

let vm = new Vue()

export const watchAll = (VueObj) => {
  // 开始监视路由改变
  vm.$watch(() => VueObj.$route.fullPath, (newVal) => {
    // 清除所有地图数据
    if (Vue.prototype.$resetButtonAndData) {
      Vue.prototype.$resetButtonAndData()
    }
    let routerArr = ['/infoMap']
    if (routerArr.includes(newVal)) {
      store.commit('setAllButtonStatus', false)
      store.commit('setMapButtonStatus', true)
      store.commit('setSecondaryObject', { key: 'bar', secKey: 'status', status: true })
    } else {
      store.commit('setSecondaryObject', { key: 'bar', secKey: 'status', status: !false })
    }
  })
}

/**
 * 把Http header 转为get参数形式
 * info: Object
 */
export const headerToUrl = (info) => {
  let strArr = Object.entries(info).map(a => {
    return a.join('=')
  })
  return '?' + strArr.join('&')
}

/**
 * 设置地图中心, 谨慎使用， 会使当前没有默认中心值的地图都会被设置中心
 * @param {Array | Object} Info
 */
export const setMapCenter = (info) => {
  if (_.isEmpty(info)) {
    return false
  }
  // 传入 line/section/point 自动是识别并且抽取坐标
  if (Array.isArray(info)) {
    info = info[0]
  }
  // let defaultcoordinate = store.state.settings.DefaultCoord.valueJson
  let coordinate = null
  if (_.isObject(info)) {
    // 线
    if (info.lines && info.lines.lines && !_.isEmpty(info.lines.lines)) {
      coordinate = { lat: info.lines.lines[0].lat, lng: info.lines.lines[0].lng }
      store.commit('setMapProperty', { key: 'zoom', info: 19 })
    }
    // 点
    if (info.lat && info.lng) {
      coordinate = { lat: info.lat, lng: info.lng }
      store.commit('setMapProperty', { key: 'zoom', info: 19 })
    }
    // 线段
    if (info.ldsysPoints && !_.isEmpty(info.ldsysPoints)) {
      coordinate = { lat: info.ldsysPoints[0].lat, lng: info.ldsysPoints[0].lng }
      store.commit('setMapProperty', { key: 'zoom', info: 19 })
    }
    // 管道, 杆路类, 在 vendorjs 中被配置为线段, 针对与地图上展示的情况
    if (Array.isArray(info.lines) && !_.isEmpty(info.lines)) {
      coordinate = { lat: info.lines[0].startLat, lng: info.lines[0].startLng }
      store.commit('setMapProperty', { key: 'zoom', info: 19 })
    }
    // 管道段， 杆路段， 引上段... 等各种段配置为线段, 针对与表格中在地图上显示的情况
    if (info.startLat && info.startLng && info.endLat && info.endLng) {
      coordinate = { lat: info.startLat, lng: info.startLng }
      store.commit('setMapProperty', { key: 'zoom', info: 19 })
    }
    // 业务 & 光路
    if (info.mapInfo) {
      // 业务
      if (info.mapInfo.CenterLat) {
        coordinate = { lat: info.mapInfo.CenterLat, lng: info.mapInfo.CenterLng }
        store.commit('setMapProperty', {
          key: 'zoom',
          info: Number(info.mapInfo.zoom)
        })
      } else {
        for (const key in info.mapInfo) {
          if (setMapCenter(info.mapInfo[key])) {
            // 设置zoom
            store.commit('setMapZoom', 13)
            return true
          }
        }
      }
    }
  }
  store.commit('setMapCenter', coordinate)
  if (coordinate && coordinate.lng && coordinate.lat) {
    return true
  } else {
    return false
  }
}

/**
 *  通过名称判断参数的类型, vendor key 或者 Alias key
 * @param {String} info 目标的 name 为key or aliasKey
 */
export const judgmentArgsTypeByName = (info) => {
  if (store.state.vendor.vendorName[info]) {
    return store.state.vendor.vendorName[info].map
  } else {
    // 为 Alias key
    return store.getters.vendorNameByTypeArray[info] ? store.getters.vendorNameByTypeArray[info].map : false
  }
}

/**
 * 自动转换后端检出Object key为前端Alias 对应Key
 * @param {Object} Obj
 */
export const autoAlias = (Obj) => {
  // 排除列表
  let left = ['CenterLat', 'CenterLng', 'zoom']
  let tmp = {}
  Object.entries(Obj).forEach(([key, val]) => {
    if (!left.includes(key)) {
      tmp[store.state.vendor.vendorName[key].alert] = val
    }
  })
  return tmp
}

/**
 * 压平Object, 返回一个相同Object,
 * eg: [{}, {}]
 * @param {Array} Obj
 */
export const zipDataObj = (arr) => {
  let targetObj = {}
  for (const iterator of arr) {
    Object.entries(iterator).forEach(([key, val]) => {
      if (targetObj[key]) {
        targetObj[key] = [...targetObj[key], ...val]
      } else {
        targetObj[key] = val
      }
    })
  }
  return targetObj
}

/**
 * 压平业务 Array
 * @param {Array} arr
 */
export const zipDataForBusiness = (arr) => {
  let targetArr = []
  for (const iterator of arr) {
    targetArr.push(iterator.mapInfo)
  }
  return zipDataObj(targetArr)
}

/**
 * 管道, 杆路转线, 方便在地图上绘制
 * @param {Object} info
 */
export const sectionToLines = (info) => {
  let tmp = []
  for (const iterator of info) {
    tmp.push([{
      lat: iterator.startLat,
      lng: iterator.startLng
    }, {
      lat: iterator.endLat,
      lng: iterator.endLng
    }])
  }
  return tmp
}

/**
 * 对比两个单层数组是否相等
 * @param {Array} arr1 单层数组1
 * @param {Array} arr2 单层数组2
 */
export const isSame = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  for (const iterator of arr1) {
    if (!arr2.includes(iterator)) {
      return false
    }
  }
  return true
}

/**
 * ODF, OCC 内部端口转显示
 * @param {*}
 * frame 高
 * dist 宽
 */
export const portNumToShow = ({ port, frame, dist }) => {
  port = port + 1
  let frameNum = Math.ceil(port / (frame * dist))
  let distNum = Math.ceil(((port % (frame * dist)) / dist) === 0 ? frame : ((port % (frame * dist)) / dist))
  // let targetPort = (port % (frame * dist)) % dist
  let targetPort = (port % dist) === 0 ? 12 : (port % dist)
  return frameNum + '-' + distNum + '-' + targetPort
}

/**
 * 转驼峰命名 驼峰命名法camelCase -> 连字符Hyphenate
 * @param {String} str 转驼峰命名
 */
export const hyphenate = (str) => {
  let hyphenateRE = /([a-z\d])([A-Z])/g
  return str.replace(hyphenateRE, '$1-$2').toLowerCase()
}

/**
 * ODF, OCC 显示转端口
 * @param {String} show 显示的数据
 * frame 高
 * dist 宽
 */
export const showToPortNum = ({ show, frame, dist }) => {
  let str = show.split('-')
  let preFrame = (str[0] - 1) * frame * dist
  let preDist = (str[1] - 1) * dist
  let targetPort = preFrame + preDist + Number(str[2])
  return targetPort
}

/**
 * 判断信息是否需要禁用, 如果项目为空则不禁用
 * @param {Array} base 基础
 * @param {Array} target 附加
 * @param {Object} info 整个Obj
 */
export const computedDisableInfo = (base = [], target = [], info) => {
  let result = []
  let tmp = _.uniq([...base, ...target])
  for (const iterator of tmp) {
    if (info[iterator]) {
      result.push(iterator)
    }
  }
  return result
}

/**
 * 旧迁移, 待删除
 */
export const arrayToObject = (info) => {
  let childID = {}
  let fatherID = {}
  for (let key in info) {
    if (info[key].pId === '0' && !childID[info[key].id] && !fatherID[info[key].id]) {
      childID[info[key].id] = []
      fatherID[info[key].id] = info[key].name
    } else {
      if (!childID[info[key].pId]) childID[info[key].pId] = []
      childID[info[key].pId].push({
        id: info[key].id,
        name: info[key].name
      })
    }
  }
  return ({
    father: fatherID,
    child: childID
  })
}

/**
 * 检查密码强度
 * @param {String} passwd
 * @param {Number} level
 */
export const checkWeekPasswd = (passwd, level = 5) => {
  return zxcvbn(passwd).guesses_log10 < level
}

/**
 * 检出数据
 * @param {Object} data
 */
export const checkOutData = (data) => {
  // 这里接受最原始的axios的返回数据, 如果返回数据不同, 请自行拼装
  let row = data.data._embedded
  return row[Object.keys(row)[0]]
}

/**
 * 过滤一个 obj 里的无效数据, eg: {1: '', 2: [], 3: null}
 * @param {Object} obj
 */
export const compactObject = (obj) => {
  let tmp = {}
  Object.entries(obj).forEach(([key, val]) => {
    if (val === 0 || val === '0' || String(val).length) {
      tmp[key] = val
    }
  })
  return tmp
}

/**
 * Bmap地图数据转 Geo
 * @param {Array} data Bamp地图数据:eg [{lng:, lat:}, {lng:, lat:}], lines: [[{lng, lat}, {lng, lat}], [{lng, lat}, {lng, lat}]]
 */
export const bmapToGeo = (data) => {
  let result = []
  for (const iterator of data) {
    if (Array.isArray(iterator)) {
      let tmp = []
      for (const item of iterator) {
        tmp.push([item.lng, item.lat])
      }
      result.push(tmp)
      // 线坐标
    } else {
      result.push([iterator.lng, iterator.lat])
      // 点坐标
    }
  }
  return result
}

/**
 * 全局Dialog
 * @param {Object} item 要弹框的OBject
 * @param {String} type 类型
 */
var alertInfo = (item, type) => {
  store.commit('setMapStatus', {
    key: 'alertInfo',
    status: { ...item }
  })
  store.commit('setMapStatus', {
    key: 'alertType',
    status: type
  })
}

/**
 * 格式化时间
 * @param {String} time 时间戳
 * @param {*} type 返回类型
 */
export const formatTime = (time, type = 'llll') => {
  return moment(Number(time)).format(type)
}

/**
 * 在 Array 中检出对象
 * @param {Object} info 需要检出的key
 * @param {Array} target 目标array
 */
export const checkOutObjFromArray = (info, target) => {
  for (const item of target) {
    for (const key in info) {
      if (item[key] === info[key]) {
        return item
      }
    }
  }
}

/**
 * 下载文件
 * @param {Object} response
 */
export const downloadFile = (response) => {
  const downloadFileName = response.headers['content-disposition'].split('filename=')[1]
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', decodeURIComponent(downloadFileName))
  link.click()
  window.URL.revokeObjectURL(url)
}

/**
 * 返回权限信息
 * @param {String} key key 'well'
 * @param {String} permission 权限字段 'r'
 */
export const checkPermission = (key, permission) => {
  let userPermission = Vue.prototype.$userPermission
  let role = store.getters.getUserRole
  if (!userPermission[key]) {
    return false
  }
  if (role.includes(`${userPermission[key].key}.${permission}`)) {
    return true
  }
  return false
}

// 注册全局
Vue.prototype.$checkWeekPasswd = checkWeekPasswd
Vue.prototype.$checkPermission = checkPermission
Vue.prototype.$formatTime = formatTime
Vue.prototype.$bmapToGeo = bmapToGeo
Vue.prototype.$autoAlias = autoAlias
Vue.prototype.$zipDataObj = zipDataObj
Vue.prototype.$zipDataForBusiness = zipDataForBusiness
Vue.prototype.$setMapCenter = setMapCenter
Vue.prototype.$judgmentArgsTypeByName = judgmentArgsTypeByName
Vue.prototype.$portNumToShow = portNumToShow
Vue.prototype.$showToPortNum = showToPortNum
Vue.prototype.$sectionToLines = sectionToLines
Vue.prototype.$hyphenate = hyphenate
Vue.prototype.$computedDisableInfo = computedDisableInfo
Vue.prototype.$checkOutData = checkOutData
Vue.prototype.$toObject = arrayToObject
Vue.prototype.$compactObject = compactObject
Vue.prototype.$isSame = isSame
Vue.prototype.$alertInfo = alertInfo
Vue.prototype.$headerToUrl = headerToUrl
Vue.prototype.$checkOutObjFromArray = checkOutObjFromArray
Vue.prototype.$downloadFile = downloadFile
