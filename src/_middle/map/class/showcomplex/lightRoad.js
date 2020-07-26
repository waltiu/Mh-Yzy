import { Device } from '../handle/device'
import { DeviceRoom } from '../handle/deviceRoom'
import { Cited } from '../handle/cited'
import { CitedSection } from '../handle/citedSection'
import { Cable } from '../handle/cable'
import { SwitchY } from '../handle/switchY'
import { Odf } from '../handle/odf'
import { Pole } from '../handle/pole'
import { PoleSection } from '../handle/poleSection'
import { Support } from '../handle/support'
import { SupportSection } from '../handle/supportSection'
import { Well } from '../handle/well'
import { PipeSection } from '../handle/pipeSection'
import { Cran } from '../handle/cran'


import { ComplexHandle } from '@/_public/map/class/MapHandle/base/complex'


class CableRandomColor extends Cable {
    constructor(...args) {
        super(...args)
    }

    cableStyle(item) {
        return item && item.color ? { lineColor: item.color } : {}
    }
}



export class LightRoad extends ComplexHandle {
    constructor(map, layerName = '_ShowComplexBusinessLayer') {
        super(map, layerName)
        this.equipment = new Device(this.map, this.layer)
        this.machineRoom = new DeviceRoom(this.map, this.layer)
        this.ledUp = new Cited(this.map, this.layer)
        this.ledUpLineSection = new CitedSection(this.map, this.layer)
        this.oc = new CableRandomColor(this.map, this.layer)
        this.occ = new SwitchY(this.map, this.layer)
        this.odf = new Odf(this.map, this.layer)
        this.pole = new Pole(this.map, this.layer)
        this.poleLineSection = new PoleSection(this.map, this.layer)
        this.support = new Support(this.map, this.layer)
        this.supportLineSection = new SupportSection(this.map, this.layer)
        this.well = new Well(this.map, this.layer)
        this.wellLineSection = new PipeSection(this.map, this.layer)
        this.opticalMultiplexer = new Cran(this.map, this.layer)
    }

    /**
     * 
     * @param {Object} item 分类渲染
     */
    _render(item) {
        Object.entries(item).forEach(([key, val]) => {
            if (this[key])
            // 使用add , 同图层由主图层控制 clear, 子渲染器不要控制数据
                this[key].add(val)
        })
    }

    /**
     * 透传参数
     * @param  {...any} args 
     */
    show = (...args) => {
        this.clear()
        this._render(...args)
    }

}