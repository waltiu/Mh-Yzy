import { SameRouter } from './SameRouter'
import store from '@/store'
import mapDefaultEvent from './defalut/sameRouterDefaultEvent'

export class SameLines extends SameRouter {
  // 重写 支持颜色
  render (same, { type, complex }, color) {
    // 清理
    this.sameRouterLayer.clear()
    // 更新事件
    let mapEvent = {
      section: {
        customEvent: ({ obj }) => {
          obj.updateSymbol({
            lineColor: 'red'
          })
        }
      },
      line: {
        customEvent: ({ args, obj, layer }) => {
          obj.updateSymbol({ lineOpacity: 1 })
          if (args && args.mapSelectGroup) {
            obj.updateSymbol({
              lineColor: this.groupColor[args.mapSelectGroup]
            })
            layer.setZIndex(50)
            obj.setZIndex(50)
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

    this.groupColor = color

    complex.forEach((item) => {
      this.complexHandle([item], type, this.sameRouterLayer, { mapSelectGroup: item.mapSelectGroup })
    })
  }
}

export default SameLines
