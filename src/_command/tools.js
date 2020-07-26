import _ from 'lodash'
import store from '@/store'
import moment from 'moment'

/**
 * 检出数据
 * @param {Object} data
 */
export const checkOutData = (data) => {
  // console.log(data.data)
  let row = data.data._embedded
  return row[Object.keys(row)[0]]
}


export class Delay {
  constructor (time = 1000) {
    this.timer = null
    this.time = time
  }

  callback = (callback) => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      callback()
    }, this.time)
  }
}

/**
 * unix time to date (ms)
 * @param {String/Number} unixtime 
 */
export const unixms2date = (unixtime) => unixtime ? moment(Number(unixtime)).format('llll') : '空'


export const unixs2date = (unixtime) => unixtime ? moment.unix(Number(unixtime)).format('llll') : '空'


/**
 * 
 * @param {Object} obj 
 * @param {String} type 类型
 */
export const checkMapCenter = (obj, type) => {
  let infos = {}
  let coor = null
  if (obj)
    switch (type) {
      case 'well':
      case 'pole':
      case 'cited':
      case 'support':
      case 'device':
      case 'deviceRoom':
      case 'station':
      case 'switchY':
      case 'odf':
      case 'opticalSplitter':
      case 'error':
        coor = { lng: obj.lng, lat: obj.lat }
        break;

      case 'pipeSection':
      case 'poleSection':
      case 'citedSection':
      case 'supportSection':
        if (obj.ldsysPoints && obj.ldsysPoints[0])
          coor = { lng: obj.ldsysPoints[0].lng, lat: obj.ldsysPoints[0].lat }
        else if (obj.startLat && obj.startLng)
          coor = {
            lng: obj.startLng,
            lat: obj.startLat
          }
        break;

      case 'geoFences':
        if (obj.geofence && obj.geofence.info[0] && obj.geofence.info[1])
          coor = { lng: obj.geofence.info[0].lng, lat: obj.geofence.info[1].lat }
        break;

      case 'lightRoad':
        if (obj.mapInfo) {
          infos.translate = Object.fromEntries(Object.entries(obj.mapInfo).map(([key, val]) => [store.state.vendor.vendorName[key].alert, val]))
          for (const key in infos.translate) {
            for (const val of infos.translate[key]) {
              if (checkMapCenter(val, key)) {
                coor = checkMapCenter(val, key)
                break
              }
            }
          }
        }
        break;

      case 'business':
        if (obj.mapInfo)
          coor = { lat: obj.mapInfo.CenterLat, lng: obj.mapInfo.CenterLng }
        break;

      case 'pipe':
      case 'poleRoad':
        if (obj.lines && obj.lines[0])
          coor = { lat: obj.lines[0].endLat, lng: obj.lines[0].endLng }
        break;

      case 'cable':
        if (obj.lines && obj.lines.lines && obj.lines.lines[0]) {
          coor = { lat: obj.lines.lines[0].lat, lng: obj.lines.lines[0].lng }
        }
        break;

      default:
        break;
    }
  return coor
}

/**
 * 返回一个Value的boolen值
 * @param {Any} target 
 */
export const isTrue = (target) => {
  if ([null, undefined, 0, '0', '', NaN].includes(target)) {
    return false
  }
  if (Array.isArray(target) && target.length === 0) {
    return false
  }
  if (_.isObject(target) && Object.keys(target).length === 0) {
    return false
  }
  return !!target
}

export const isLogin = () => {
  if (window.sessionStorage['token'] || store.getters.loginToken) {
    return true
  } else {
    return false
  }
}

/**
 * [[x,y], [x,y]]
 * @param {Array} array 
 */
export const areaToZoom = (arr) => Math.abs(arr.reduce((res, [x1, y1], index) => {
  if (arr[index + 1]) {
    let [x2, y2] = arr[index + 1]
    res = (x1 * y2 - y1 * x2) / 2 + res
  }
  return res
}, 0) / 2)
