import { CableHandle } from '@/_public/map/class/MapHandle/base/cable'
import { alertInfo } from '@/_command/misc'


export class Cable extends CableHandle {
  constructor (map, layerName = '_CableLayer') {
    super(map, layerName)
  }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'cable'))
  }
}