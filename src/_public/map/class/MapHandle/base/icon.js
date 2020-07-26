import * as maptalks from 'maptalks'
import { Handle } from './index'

export class IconHandle extends Handle {
    constructor(map, layerName = '_IconLayer') {
        super(map, layerName)
    }

    /**
     * 渲染器
     * @param {Array} data 
     * @param {Function} reduce return maptalks data type, defalut is this.reduce
     */
    _render(item, coor = this.coor, reduce = this.reduce) {
        return new maptalks.Marker(coor(item), reduce(item))
            .addTo(this.layer)
    }

    /**
     * 生成坐标
     * @param {Object} info 
     */
    coor(info) {
        return [Number(info.lng), Number(info.lat)]
    }

    /**
     * 生成图标 接受一个参数 item
     * data:image/svg+xml;base64,
     * data:image/png;base64,
     */
    iconStyle() {
        return { markerFile: 'data:image/png;base64,' }
    }

    iconProps() {
        return {}
    }

    /**
     * 生成目标配置
     * @param {Object} info 单个item
     */
    reduce = (item) => {
        return {
            'properties': {
                'lng': item.lng,
                'lat': item.lat,
                'name': item.name,
                'id': item.id,
                ...this.iconProps()
            },
            'symbol': {
                'markerWidth': 16,
                'markerHeight': 16,
                'markerDx': 0,
                'markerDy': 8,
                'markerOpacity': 1,
                ...this.iconStyle()
            }
        }
    }
}