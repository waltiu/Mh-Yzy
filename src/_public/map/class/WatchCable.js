import { WatchMap } from './WatchMap'
import * as maptalks from 'maptalks'
import mapDefaultEvent from './defalut/defaultEvent'

export class WatchCable extends WatchMap {
  constructor (map, self) {
    super(map, self)
    // 初始化图层
    this.watchCableLayer = new maptalks.VectorLayer('光缆缆').addTo(this.map)
  }

  render (renderInfo) {
    this.watchCableLayer.clear()

    let mapEvent = {
      line: {
        customEvent: function ({ item, obj }) {
          if (item && item.maptalksColor) {
            obj.updateSymbol({
              lineColor: item.maptalksColor
            })
          }
        }
      }
    }
    this.initEvent(this.mergeObject(mapDefaultEvent, mapEvent))

    this.lineHandle(renderInfo, 'cable', this.watchCableLayer)
  }
}

export default WatchCable
