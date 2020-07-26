import * as maptalks from 'maptalks'
import { SectionHandle } from '../../../_public/map/class/MapHandle/base/section'
// import Axios from 'axios';

export class dottedLineHandle extends SectionHandle {
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
  // coor (info) {

  //   return [
  //     [info.start,
  //     info.end]

  //   ]
  // }

  /**
   * [lng, lat]
   * @param {Array} info 
   */
  coor = info => info

  // coor = info => [info.start, info.end]
  // coor (info) {
  //   if (info.id) {
  //     return [
  //       [Number(info.startLng), Number(info.startLat)],
  //       [Number(info.endLng), Number(info.endLat)]
  //     ]
  //   } else {
  //     return []
  //   }
  // }
  /**
   * 样式
   */
  sectionStyle () {
    return {
      lineDasharray: [5],
      'lineWidth': 4,
      'lineColor': 'red',

    }
  }


}
