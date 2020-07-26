import * as maptalks from 'maptalks'
import { Handle } from './index'

export class SectionHandle extends Handle {
  constructor (map, layerName = '_SectionLayer') {
    super(map, layerName)
  }

  /**
   * 渲染器
   * @param {Array} data 
   * @param {Function} reduce return maptalks data type, defalut is this.reduce
   *
   */
  _render (item, coor = this.coor, reduce = this.reduce) {
    return new maptalks.LineString(coor(item), reduce(item)).addTo(this.layer)
  }

  /**
   * 生成坐标
   * @param {Object} info 
   */
  coor (info) {
    if (info.id) {
      return [
        [Number(info.startLng), Number(info.startLat)],
        [Number(info.endLng), Number(info.endLat)]
      ]
    } else {
      return []
    }
  }

  /**
   * 样式
   */
  sectionStyle () {
  }

  /**
   * 生成目标配置
   * @param {Object} info 单个item
   */
  reduce = (item) => {
    return {
      'symbol': {
        'lineColor': '#1bbc9b',
        'lineWidth': 6,
        'lineJoin': 'round', //miter, round, bevel
        'lineCap': 'round', //butt, round, square
        'lineDasharray': null,//dasharray, e.g. [10, 5, 5]
        'lineOpacity ': 1,
        ...this.sectionStyle(item)
      }
    }
  }
}