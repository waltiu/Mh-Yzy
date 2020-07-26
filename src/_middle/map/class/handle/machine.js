import { IconHandle } from '@/_public/map/class/MapHandle/base/icon'
import { EventEmitter } from 'events';
// import { alertInfo } from '@/_command/misc';
let icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA/1BMVEUAAABZqgBYqgBXqgBXqgBXqwB1uimOxU6NxU++3Zn///9tthx4uy34+/P9/vv+//71+vDH46lZqwBnsxDs9eP7/fl8vTKn0niRx1TD4aTm89htthrR6LpjsQny+Ov9/v1drgO02Y1rtRit1YFnsw/L5bJbrAHs9eF3uyu32pDJ5KzX68Sy2Iihz27U6b7x9+l9vjWczWfP57bu9uV5vC7z+e2o03u83ZjN5rWj0HHn89pdrgJ2uyrK5K/X68L7/fhnsxL9/vzZ7MZvtx+EwUCZy2JstRfC4KDC4KLn89nA355irwbp89z5/PdxuCOdzWnv9uT1+vFxuCFYqwCXyl9sa+h4AAAABXRSTlMAPMb9+hHOL6gAAAABYktHRApo0PRWAAAAB3RJTUUH4wwRFwAcfDn3zQAAAYZJREFUaN7t2dlOwkAUBmAoHGppsYi4oqKABdFa960goHXHDXz/ZzEEL+sZM2fGps38tyT/l8y0Z1ImlUpC0loGRCSjpcP7s0LqJ8mGCpqwfgAtDBCzPj+rFAZMf8rpM5TouWnNr4CRp8ZAAZPcn8+bGGAJAKzEA4VZQrldZAJzpfkyd//CIiyxgGWAFW5gFaDCAtbWcxvcQFXf3Ip+kxWAAzUBQA2dpnWbWG/X8XENDYuWBuM8EJUEA6axTYthooDTJD+lTQcDWgLegxYGxH9U/ANQ2GkTynf3yizABdjn7vccOGABhwBH3MBxCU5YwOnZOWGgXlxeRb7JCmAAvkfu93x0XHe617R0O0k/0eQDfoUWnwG4PeJD1HNRoD8gP6aDPgbE/01OAnBzGxS5u+27+4c/fMY+cgNPk79TGMAzvAy5gdc3eGfuwccnYf17QzvyTY47MBIAjNBp2ib3t/FxPQ6+aAnGUZ9oClCAAhQQLSD9Fkr6PZr0m0Dpd5kqKioqKiry8w0xDe9kmSsu1wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0xMi0xN1QxNTowMDoyOCswODowMIvAIB4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMTItMTdUMTU6MDA6MjgrMDg6MDD6nZiiAAAAAElFTkSuQmCC"
export class Machine extends IconHandle {
    constructor(map, layerName = '_machine') {
        super(map, layerName)
        this.bus = new EventEmitter()
    }


    _defaultIcon() {
        return icon
    }

    /**
     * 
     * @param {Object} item
     */
    iconStyle() {
        return { markerFile: this._defaultIcon() }
    }

    bindEmitById(item, info) {
        item.on('click', () => this.bus.emit('click', info, item))
    }

    listenItemEvent = (...args) => this.bus.on(...args)
}