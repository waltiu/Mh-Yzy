import { IconHandle } from '@/_public/map/class/MapHandle/base/icon'
import { alertInfo } from '@/_command/misc';
import store from '@/store'

export class WyIcon extends IconHandle {
    constructor(map, layerName = 'devicelay') {
            super(map, layerName)
        }
        /**
         * 生成图标 接受一个参数 item
         * data:image/svg+xml;base64,
         * data:image/png;base64,
         */

    _defaultIcon() {
        return `data:image/png;base64,${store.state.icons.transport}`

    }

    /**
     * 
     * @param {Object} item
     */
    iconStyle() {

        return { markerFile: this._defaultIcon() }
    }


    bindEmitById(item, info) {
        item.on('click', () => alertInfo(info, 'device'))
    }

    add(...args) {
            this._loop(...args)
            return this
        }
        /**
         * 透传参数
         * @param  {...any} args 
         */
    show = (...args) => {

        this.clear()
        this.add(...args)
    }

    clear() {
        this.data = {}
        this.layer.clear()
        return this
    }
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
                'markerWidth': 48,
                'markerHeight': 48,
                'markerDx': 0,
                'markerDy': 24,
                'markerOpacity': 1,
                ...this.iconStyle()
            }
        }
    }


}