import { IconHandle } from '@/_public/map/class/MapHandle/base/icon'
import store from '@/store'
import { alertInfo } from '@/_command/misc';

export class Pole extends IconHandle {
  constructor (map, layerName = '_PoleLayer') {
    super(map, layerName)
  }


  _defaultIcon () {
    return `data:image/png;base64,${store.state.icons.pole}`
  }

  /**
   * 
   * @param {Object} item
   */
  iconStyle () {
    return { markerFile: this._defaultIcon() }
  }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'pole'))
  }
}