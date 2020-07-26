import { WatchMap } from './WatchMap'
import * as maptalks from 'maptalks'
import mapDefaultEvent from './defalut/defaultEvent'

export class PipePoleRoad extends WatchMap {
  constructor (map, self, event = () => { }) {
    super(map, self)
    this.contextMenuEvent = event
    this.PipePoleRoadLayer = new maptalks.VectorLayer('管道 & 杆路').addTo(this.map)
  }

  render (fullData) {
    // 清除图层
    this.PipePoleRoadLayer.clear()
    // 更新图层配置
    let mapEvent = {
      icon: {
        on: {
          'contextmenu': ({ item, key }) => {
            this.contextMenuEvent(item, key)
            // obj.setZIndex(50)
          }
        }
      }
    }
    this.initEvent(this.mergeObject(mapDefaultEvent, mapEvent))

    if (fullData.lines) {
      this.sectionHandle(fullData.lines, 'pipeLightRoad', this.PipePoleRoadLayer)
    }
  }
}

export default PipePoleRoad
