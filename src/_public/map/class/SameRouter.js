import store from '@/store'
import * as maptalks from 'maptalks'
import mapDefaultEvent from './defalut/sameRouterDefaultEvent'
import { WatchMap } from './WatchMap'

export class SameRouter extends WatchMap {
  constructor (map, self) {
    super(map, self)
    // 初始化图层
    this.sameRouterLayer = new maptalks.VectorLayer('同路由').addTo(this.map)
  }

  render (same, { type, complex }) {
    // 清理
    this.sameRouterLayer.clear()
    // 设置事件
    let mapEvent = {
      line: {
        customEvent: function ({ args, obj, layer }) {
          obj.updateSymbol({ lineOpacity: 1 })
          if (args && args.maptalksType === 'wa') {
            obj.updateSymbol({
              lineColor: '#0004ff'
            })
            layer.setZIndex(50)
            obj.setZIndex(1)
          }
        }
      }
    }
    this.initEvent(this.mergeObject(mapDefaultEvent, mapEvent))
    // 选择渲染
    Object.entries(same).forEach(([key, val]) => {
      if (store.state.vendor.vendorName[key]) {
        this.selectType(store.state.vendor.vendorName[key].alert, val, this.sameRouterLayer, { flash: true })
      }
    })

    complex.forEach((item) => {
      this.complexHandle([item], type, this.sameRouterLayer, item)
    })
  }
}

export default SameRouter
