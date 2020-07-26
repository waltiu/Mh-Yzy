import * as maptalks from 'maptalks'
import { Handle } from './index'

export class GeofencesHandle extends Handle {
  constructor (map, layerName = '_GeofencesLayer') {
    super(map, layerName)
  }

  /**
   * 渲染器
   * @param {Array} data 
   * @param {Function} reduce return maptalks data type, defalut is this.reduce
   *
   */
  _render (item, coor = this.coor, reduce = this.reduce) {
    return new maptalks.Polygon(coor(item), reduce(item)).addTo(this.layer)
  }

  /**
   * 生成坐标
   * @param {Object} info 
   */
  coor (info) {
    return ((info.geofence && info.geofence.info) ? info.geofence.info : [])
      .map(item => [item.lng, item.lat])
  }

  geofenceStyle () {
    return {}
  }

  /**
   * 生成目标配置
   * @param {Object} info 单个item
   */
  reduce = (item) => {
    return {
      'symbol': {
        'lineColor': '#34495e',
        'lineWidth': 2,
        'polygonFill': 'rgb(135,196,240)',
        'polygonOpacity': 0.2,
        ...this.geofenceStyle(item)
      }
    }
  }
}