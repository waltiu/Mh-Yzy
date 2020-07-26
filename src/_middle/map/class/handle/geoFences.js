import { GeofencesHandle } from '@/_public/map/class/MapHandle/base/geofences'
import { alertInfo } from '@/_command/misc';


export class Geofences extends GeofencesHandle {
  constructor (map, layerName = '_GeofencesLayer') {
    super(map, layerName)
  }

  // coor () {
  //   return []
  // }

  geofenceStyle (item) {
    return {
      lineColor: item.color,
      polygonFill: item.color
    }
  }

  // cableStyle () {
  //   return { lineColor: this._defaultCableStyle() }
  // }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'geoFences'))
  }
}