import { IconHandle } from '@/_public/map/class/MapHandle/base/icon'
import store from '@/store'
import { alertInfo } from '@/_command/misc';

export class Well extends IconHandle {
  constructor (map, layerName = '_WellLayer') {
    super(map, layerName)
  }


  _defaultIcon () {
    return `data:image/png;base64,${store.state.icons.well}`
  }

  /**
   * 
   * @param {Object} item
   */
  iconStyle () {
    return { markerFile: this._defaultIcon() }
  }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'well'))
  }

}