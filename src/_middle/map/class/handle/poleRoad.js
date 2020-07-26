import { CableHandle } from '@/_public/map/class/MapHandle/base/cable'
import { alertInfo } from '@/_command/misc';


export class Pipe extends CableHandle {
  constructor (map, layerName = '_CableLayer') {
    super(map, layerName)
  }

  coor () {
    return []
  }

  _defaultCableStyle () {
    return 'blue'
  }

  cableStyle () {
    return { lineColor: this._defaultCableStyle() }
  }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'poleRoad'))
  }
}