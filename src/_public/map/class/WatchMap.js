import { MapHandle } from './MapHandle'
import store from '@/store'
import * as maptalks from 'maptalks'
import _ from 'lodash'

export class WatchMap extends MapHandle {
  constructor (map, self) {
    super(map, self)
    // 创建图层，用来渲染
    let baseLayer = Object.keys(store.state.infoMapShow.inputSelect).reduce((res, keys) => {
      if (keys === 'cable') {
        res[keys] = new maptalks.VectorLayer(this.self.$autoCompentedUrl[keys].name, [], { enableAltitude: true }).addTo(this.map)
      } else {
        res[keys] = new maptalks.VectorLayer(this.self.$autoCompentedUrl[keys].name).addTo(this.map)
      }
      return res
    }, {})
    this.baseLayer = { ...this.baseLayer, ...baseLayer }
    // 监视所有
    this.watchList = {}
    this.watchAll(Object.keys(this.baseLayer))
  }

  watchAll (arr) {
    arr.forEach(key => {
      if (!this.watchList[key]) {
        this.watchList[key] = store.watch(() => store.state.infoMapShow.updateStatus[key], (newVal) => {
          if (newVal) this.selectType(key, store.state.infoMapShow.showInMap[key])
        })
      }
    })

    store.watch(() => store.state.infoMapShow.keepCableShow, (newVal) => {
      if (_.isEmpty(newVal)) {
        this.baseLayer['cableTips'].clear()
        this.selectType('cable', store.state.infoMapShow.showInMap['cable'])
      }
    })
    // store.watch(state => store.state.infoMapShow.inputSelect['cable'].cleanStatus, (newVal) => {
    //   this.baseLayer['cableTips'].clear()
    // })
  }
  // 需要手动在组件销毁前销毁watch 否则会导致多层监听
  destroyedWatch () {
    Object.entries(this.watchList).forEach(([, val]) => {
      val()
    })
  }
}

export default WatchMap
