import * as maptalks from 'maptalks'
import { Handle } from './index'

export class CableHandle extends Handle {
  constructor (map, layerName = '_CableHandle') {
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
    return ((info.lines && info.lines.lines) ? info.lines.lines : [])
      .map(item => [item.lng, item.lat])
  }

  /**
   * 样式
   */
  cableStyle () {
    return {}
  }

  /**
   * 生成目标配置
   * @param {Object} info 单个item
   */
  reduce = (item) => {
    return {
      arrowStyle: null,
      arrowPlacement: 'vertex-last',
      visible: true,
      editable: true,
      cursor: null,
      shadowBlur: 0,
      shadowColor: 'black',
      draggable: false,
      dragShadow: false,
      drawOnAxis: null,
      symbol: {
        'lineColor': 'red',
        'lineOpacity': 0.5,
        'lineWidth': 3,
        ...this.cableStyle(item)
      }
    }
  }
}