import mapDefaltConf from './defalut/mapDefaultConf.js'
import * as maptalks from 'maptalks'
import mapDefaultEvent from './defalut/defaultEvent'
import store from '@/store'
import _ from 'lodash'

// 针对颜色的处理， 请对数组的类型初始化初始配置, 如果需要对粒度细的项目进行颜色设置请使用 function 返回筛选结果
// noinspection JSAnnotator
const style = {
    lineActivityStyle: {
        'lineWidth': 5,
        'lineOpacity': 1
    },
    lineStyle: {
        'lineOpacity': 0.6,
        'lineWidth': 3
    }
}

export class MapHandle {
    constructor (map, self) {
        this.map = map
        this.self = self
        // tips 图层
        this.baseLayer = {}
        this.baseLayer['tips'] = new maptalks.VectorLayer('Tips', null, {
            'zIndex': '99'
        }).addTo(this.map)

        this.baseLayer['cableTips'] = new maptalks.VectorLayer(window.i18n.t('infoMap.cableTips'), null, {
            'zIndex': '98'
        }).addTo(this.map)

        this.setConfig()
        this.initEvent()
    }

    // dataSet = {}

    setConfig (config = mapDefaltConf) {
        // 初始化配置文件
        Object.entries(store.getters.vendorNameByType).forEach(([key, val]) => {
            if (config[key]) {
                val.forEach(val => {
                    this[val.alert] = config[key]
                })
            }
        })
        this['tips'] = config['tips']
    }

    initEvent (config = mapDefaultEvent) {
        // 初始化事件
        Object.entries(store.getters.vendorNameByType).forEach(([key, val]) => {
            if (config[key]) {
                val.forEach(val => {
                    this[val.alert + 'Event'] = config[key]
                })
            }
        })
        this['tipsEvent'] = config['tips']
    }

    bindEvent (obj, key, item, layer, args) {
        if (!this[key + 'Event']) return
        // 批量绑定事件
        Object.entries(this[key + 'Event']).forEach(([eventName, eventGroup]) => {
            if (!['onload', 'customEvent'].includes(eventName)) {
                if (Array.isArray(eventGroup)) {
                    obj[eventName](...eventGroup)
                } else if (_.isObject(eventGroup)) {
                    Object.entries(eventGroup).forEach(([eventKey, event]) => {
                        obj[eventName](eventKey, ($event) => {
                            event({ key, item, obj, layer, _this: this, $event: $event })
                        })
                    })
                }
            } else {
                eventGroup({ key, item, obj, layer, args, _this: this })
            }
        })
    }

    selectType (key, val, layer, args) {
        // 清理旧的渲染层
        if (!layer) this.baseLayer[key].clear()
        switch (store.getters.vendorNameByTypeArray[key].map) {
            case 'line':
                this.lineHandle(val, key, layer, args)
                break

            case 'complex':
                this.complexHandle(val, key, layer, args)
                break

            case 'icon':
                this.iconHandle(val, key, layer, args)
                break

            case 'section':
                this.sectionHandle(val, key, layer, args)
                break

            case 'fences':
                this.fencesHandle(val, key, layer, args)
                break
            case 'poleSection':
                this.poleSection(val, key, layer, args)
                break
            default:
                break
        }
    }

    fencesHandle (rowData, key, layer = this.baseLayer[key], args) {
        rowData.forEach(item => {
            let geofence = item.geofence.info || []
            let coor = geofence.map(geo => [geo.lng, geo.lat])
            let geoObj = new maptalks.Polygon(coor, _.isFunction(this[key]) ? this[key](key, item, style) : this[key]).addTo(layer)
            geoObj.updateSymbol({
                polygonFill: item.color,
                lineColor: item.color
            })
            this.bindEvent(geoObj, key, item, layer, args)
        })
    }

    // 组合逻辑，args 会透过后下发
    complexHandle (rowData, type, layer = this.baseLayer[type], args) {
        // 业务， 光路的集合体， 因为业务和光路均有已存在的元素组成.
        let complexRender = rowData.reduce((res, val) => {
            Object.entries(val.mapInfo).forEach(([key, val]) => {
                res[key] = [
                    ...(res[key] || []),
                    ...val
                ]
            })
            return res
        }, {})
        // 选择渲染
        Object.entries(complexRender).forEach(([key, val]) => {
            if (store.state.vendor.vendorName[key]) {
                this.selectType(store.state.vendor.vendorName[key].alert, val, layer, args)
            }
        })
    }

    // 数据操作
    lineHandle (rowData, key, layer = this.baseLayer[key], args) {
        rowData.forEach(item => {
            let coor = []
            if (item && item.lines && item.lines.lines) {
                coor = item.lines.lines.map(point => {
                    return [Number(point.lng), Number(point.lat)]
                })
            } else if (item.ldsysPoints) {
                coor = item.ldsysPoints.map(point => {
                    return [Number(point.lng), Number(point.lat)]
                })
            }
            let lineObj = new maptalks.LineString(coor, _.isFunction(this[key]) ? this[key](key, item, style) : this[key])
                .addTo(layer)
            lineObj.setProperties({
                altitude: item.height
            })
            this.bindEvent(lineObj, key, item, layer, args)
        })
    }

    iconHandle (rowData, key, layer = this.baseLayer[key], args) {
        rowData.forEach((item) => {
            let iconObj = new maptalks.Marker(
                [Number(item.lng), Number(item.lat)],
                _.isFunction(this[key]) ? this[key](key, item, style) : this[key])
                .addTo(layer)
            this.bindEvent(iconObj, key, item, layer, args)
        })
    }

    sectionHandle (rowData, key, layer = this.baseLayer[key], args) {
        rowData.forEach(item => {
            let coor = []
            let sectionObj
            if (item && item.endLat && item.endLng && item.startLat && item.startLng) {
                coor = [
                    [Number(item.startLng), Number(item.startLat)],
                    [Number(item.endLng), Number(item.endLat)]
                ]
                sectionObj = new maptalks.LineString(coor, _.isFunction(this[key]) ? this[key](key, item, style) : this[key])
                    .addTo(layer)
            } else if (item.lines) {
                coor = item.lines.map(item => {
                    return [
                        [Number(item.startLng), Number(item.startLat)],
                        [Number(item.endLng), Number(item.endLat)]
                    ]
                })
                sectionObj = new maptalks.MultiLineString(coor, _.isFunction(this[key]) ? this[key](key, item, style) : this[key])
                    .addTo(layer)
            }
            this.bindEvent(sectionObj, key, item, layer, args)
        })
    }

    tipsHandler (rowData, layer = this.baseLayer['tips'], args) {
        // 属于附属图层
        // 先清除, 在复写
        this.baseLayer['tips'].clear()
        // 创建
        let tipsObj = new maptalks.Marker(
            [Number(rowData.lng), Number(rowData.lat)], _.isFunction(this['tips']) ? this['tips'](rowData) : this['tips']
        ).addTo(layer)
        this.bindEvent(tipsObj, 'tips', rowData, layer, args)
    }

    computedColor (key, item, type) {
        let config = store.state.infoMapShow.inputSelect[key].config

        let includes = Object.entries(config).reduce((res, [, val]) => {
            res = {
                ...res,
                ...val.selected.reduce((selectedRes, selectedVal) => {
                    // b64 文件
                    if (type === 'icon') {
                        selectedRes[selectedVal] = val.b64[selectedVal]
                    } else {
                        selectedRes[selectedVal] = val.color[selectedVal]
                    }
                    return selectedRes
                }, {})
            }
            return res
        }, {})
        if (type === 'icon') {
            for (const iterator in item) {
                for (const key in includes) {
                    if (item[iterator] === key) {
                        return 'data:image/svg+xml;base64,' + includes[key]
                    }
                }
            }
            // 返回默认图片
            return 'data:image/png;base64,' + store.state.icons[key]
        }

        if (type === 'section') {
            for (const iterator in item) {
                for (const key in includes) {
                    if (item[iterator] === key) {
                        return includes[key]
                    }
                }
            }
            // 返回默认颜色
            return store.getters.vendorNameByTypeArray[key].color
        }
    }

    mergeObject (start, end) {
        return _.mergeWith(start, end, (objValue, srcValue) => {
            if (_.isEmpty(srcValue)) {
                return srcValue
            } else {
                _.merge(objValue, srcValue)
            }
        })
    }
}

export default MapHandle