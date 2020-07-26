import * as maptalks from 'maptalks'
import _ from 'lodash'

export class Handle {

    /**
     * 
     * @param {MAPTALKS MAP} map 
     * @param {String || MAPTALKS Layer} layerName 
     * 
     */
    constructor(map, layerName = '_BaseHandle') {
        this.map = map
        if (_.isString(layerName)) {
            this.layer = new maptalks.VectorLayer(layerName).addTo(this.map)
        } else {
            this.layer = layerName
        }
        // 数据
        this.data = {}
            // 渲染结果事件队列, key: ID
        this.eventBus = {}
    }

    /**
     * 为 _loop 方法 
     * @param  {...any} args 
     */
    show(...args) {
        this.clear()
        this._loop(...args)
        return this
    }

    /**
     * 取事件
     * @param {String} id 
     */
    getEventById(id) {
        return this.eventBus[id]
    }

    /**
     * 使用已经存在的数据重新渲染地图
     */
    reRender() {
        this._loop(Object.values(this.data))
    }

    /**
     * 追加渲染
     * 为 render 方法参数
     * @param  {...any} args 
     */
    add(...args) {
        this._loop(...args)
        return this
    }

    clear() {
        this.data = {}
        this.layer.clear()
        return this
    }

    /**
     * 
     * @param {Array} data 循环
     */
    _loop(data, ...args) {


        data.forEach(item => {
            this.data[item.id] = item
            this.eventBus[item.id] = this._render(item, ...args)
            this.bindEmitById(this.eventBus[item.id], item)
        })
        return this
    }

    /**
     * 绑定事件
     */
    bindEmitById() {}

    /**
     * 渲染器
     * @param {Array} data 
     * @param {Function} reduce return maptalks data type, defalut is this.reduce
     *
     */
    _render(item, coor = this.coor, reduce = this.reduce) {
        return new maptalks.LineString(coor(item), reduce(item)).addTo(this.layer)
    }

    /**
     * 生成坐标
     * @param {Object} info 
     */
    coor() {
        return []
    }

    /**
     * 生成目标配置
     * @param {Object} info 单个item
     */
    reduce() {
        return {}
    }
}