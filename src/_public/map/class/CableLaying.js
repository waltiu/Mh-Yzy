import { WatchMap } from './WatchMap'
import * as maptalks from 'maptalks'
import _ from 'lodash'
import mapDefaultEvent from './defalut/defaultEvent'

export class CableLaying extends WatchMap {
  constructor (map, self, event = () => { }) {
    super(map, self)
    this.contextMenuEvent = event
    this.CableLayingLayer = new maptalks.VectorLayer('光缆敷设').addTo(this.map)
  }

  render (fullData) {
    // 清除图层
    this.CableLayingLayer.clear()
    // 更新图层配置
    let mapEvent = {
      icon: {
        on: {
          'contextmenu': ({ item, key, obj }) => {
            this.contextMenuEvent(item, key)
            obj.setZIndex(50)
          }
        }
      },
      line: {
        customEvent: ({ obj, layer }) => {
          if (obj && layer) {
            layer.setZIndex(50)
            obj.setZIndex(10)
          }
        }
      }
    }
    this.initEvent(this.mergeObject(mapDefaultEvent, mapEvent))
    // 用来渲染所有的数据
    // 起始点交由Start End Point 渲染
    if (fullData.autoModelingList) {
      this.startEndPoint(fullData.autoModelingList, this.CableLayingLayer)
    }
    this.layingLine = { ...this.line }
    this.layingStartEndLine = { ...this.line }
    // 渲染线
    this.laying(fullData, this.CableLayingLayer)
  }

  startEndPoint (info) {
    // 渲染起始和终点, 起始点为
    let points = Object.entries(info).reduce((res, [key, val]) => {
      if (val.lng && val.lat) {
        res.push({ ...val, maptalksProp: key })
      }
      return res
    }, [])
    this.iconHandle(points, 'startEnd', this.CableLayingLayer)
    this.sectionHandle([
      { startLat: info.deviceStart.lat, startLng: info.deviceStart.lng, endLat: info.layingStart.lat, endLng: info.layingStart.lng },
      { endLat: info.deviceEnd.lat, endLng: info.deviceEnd.lng, startLat: info.layingEnd.lat, startLng: info.layingEnd.lng }
    ], 'layingStartEndLine', this.CableLayingLayer)
  }

  laying (info) {
    // 最后的如果是分叉的， 则需要闪动, 如果最后一个不是分叉 直接渲染
    if (info && info.lines && info.lines.lines) {
      // 判断最后一个是否数组
      if (Array.isArray(info.lines.lines[info.lines.lines.length - 1])) {
        this.nextLayingLine(info.lines.lines, this.CableLayingLayer)
        info = _.cloneDeep(info)
        info.lines.lines.pop()
      }
      this.lineHandle([info], 'layingLine', this.CableLayingLayer)
    }
  }

  nextLayingLine (array) {
    // 拼装数据为 线段格式
    let data = array[array.length - 1].map(item => {
      return {
        startLng: array[array.length - 2].lng,
        startLat: array[array.length - 2].lat,
        endLat: item.lat,
        endLng: item.lng
      }
    })
    this.sectionHandle(data, 'nextLaying', this.CableLayingLayer)
  }
}
