import { IconHandle } from '@/_public/map/class/MapHandle/base/icon'
import store from '@/store'
import { alertInfo } from '@/_command/misc';

export class DeviceRoom extends IconHandle {
  constructor (map, layerName = '_DeviceRoomLayer') {
    super(map, layerName)
  }


  _defaultIcon () {
    return `data:image/png;base64,${store.state.icons.deviceRoom}`
  }

  /**
   * 
   * @param {Object} item
   */
  iconStyle () {
    return { markerFile: this._defaultIcon() }
  }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'deviceRoom'))
  }
}