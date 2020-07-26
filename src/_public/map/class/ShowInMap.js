import { MapHandle } from './MapHandle'
import store from '@/store'
import * as maptalks from 'maptalks'

export class ShowInMap extends MapHandle {
    constructor(map, self) {
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
        this.baseLayer = {...this.baseLayer, ...baseLayer }
            // 监视所有
        this.watchList = {}
    }

    /**
     * 渲染器
     * @param {String} type 类型
     * @param {Array} arr 目标数组
     */
    render(type, arr) {
        this.selectType(type, arr)
    }

}

export default ShowInMap