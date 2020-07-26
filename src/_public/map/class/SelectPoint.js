// import store from '@/store'
import * as maptalks from 'maptalks'
// import mapDefaultEvent from './defalut/sameRouterDefaultEvent'
import { WatchMap } from './WatchMap'

export class SelectPoint extends WatchMap {
  constructor (map, self) {
    super(map, self)

    this.sameRouterLayer = new maptalks.VectorLayer('在地图上选择点').addTo(map)
  }

  /**
   * 渲染点
   * @param {Object} info 为Point的Object
   */
  render (info) {
    this.iconHandle([info], 'zzzz', this.sameRouterLayer)
  }
}

export default SelectPoint
