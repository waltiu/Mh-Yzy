import { WatchMap } from './WatchMap'
import * as maptalks from 'maptalks'
import store from '@/store'
// import _ from 'lodash'
// import mapDefaultEvent from './defalut/defaultEvent'

export class LayingResult extends WatchMap {
  constructor (map, self) {
    super(map, self)
    this.autoLayingLayer = new maptalks.VectorLayer('自动敷设').addTo(this.map)
  }

  icons () {
    return store.getters.vendorNameByType.icon.reduce((res, val) => {
      if (val.type) {
        res[val.type] = val
      }
      return res
    }, {})
  }

  render (info) {
    this.autoLayingLayer.clear()

    info.forEach(element => {
      this.iconHandle([element], this.icons()[element.type].icon, this.autoLayingLayer)
    })
    new maptalks.LineString(info.map(item => [Number(item.lng), Number(item.lat)]))
      .addTo(this.autoLayingLayer)
  }
}

export default LayingResult
