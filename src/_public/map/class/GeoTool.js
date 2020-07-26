import * as maptalks from 'maptalks'
import difference from '@turf/difference'
import * as turf from '@turf/helpers'
import { http } from '@/_command/http'

export class GeoTool {
  constructor (map) {
    this.map = map
    this.eventList = {}
    this.geoLines = []
    this.GeoFencesLayer = new maptalks.VectorLayer('地理围栏工具').addTo(this.map)
    this.drawTool = new maptalks.DrawTool({ mode: "Point" }).addTo(this.map).disable();
    this.fences = {}
    this.bindEvent()
  }


  /**
     * 创建一个ｔｏｏｌｂａｒ
     */

  _getFences () {

  }

  drawBegin () {
    this.drawTool.setMode("Polygon").enable();
  }

  undo () {
    if (this.drawTool.getCurrentGeometry()) this.drawTool.undo();
  }

  redo () {
    if (this.drawTool.getCurrentGeometry()) this.drawTool.redo();
  }

  toTurfPolygon (geolist) {
    let turfGeolist = geolist.map(i => [i.geofence.info.map(t => [t.lng, t.lat])])
      .filter(i => i[0].length > 3)
      .map(
        item => {
          item[0].length ? item[0][item[0].length - 1] = item[0][0] : null
          return item
        })

    return turfGeolist
  }

  clear () {
    this.GeoFencesLayer.clear()
  }

  finish (station) {
    this.drawTool.disable();
    if (!this.GeoFencesLayer.getGeometries().length)
      return
    let justDrawed = [this.GeoFencesLayer.getGeometries().find(i => i.getCoordinates()[0].length != 0).getCoordinates()[0].map(item => [item.x, item.y])]
    // this.geoLines = this.GeoFencesLayer.getGeometries().find(item => item._coordinates.length != 0)._coordinates.map(item => [item.x, item.y])
    this.geoLines = justDrawed[0]
    this.drawGeoFences()
    if (this.eventList['finish']) {
      this.eventList['finish'](this.geoLines)
    }

    if (station) {
      http.get('/api/ldsysGeofences', { params: { page: 0, size: 100000 } }).then(res => {
        let allFences = res.data._embedded.ldsysGeofences
        let turfFences = this.toTurfPolygon(allFences).map(item => turf.polygon(item, { "fill": "#0f0" }))
        justDrawed[0][justDrawed[0].length - 1] = justDrawed[0][0]
        justDrawed = turf.polygon(justDrawed, { "fill": "#0f0" })
        turfFences = turfFences.filter(item => item.geometry.coordinates[0].toString() != this.fences)
        turfFences.push(justDrawed)
        let diffPolygon = turfFences.reduceRight((a, b) => difference(a, b))
        this.geoLines = diffPolygon.geometry.coordinates[0]
        this.drawGeoFences()
        if (this.eventList['finish']) {
          this.eventList['finish'](this.geoLines)
        }
      })
    }

  }

  edit () {
    this.GeoFencesLayer.getGeometries().map(item => item.startEdit())
  }

  drawGeoFences () {
    if (this.eventList['change']) {
      this.eventList['change'](this.geoLines)
    }
    this.GeoFencesLayer.clear()

    new maptalks.Polygon(this.geoLines, {
      symbol: {
        'lineColor': '#34495e',
        'lineWidth': 2,
        'polygonFill': 'rgb(135,196,240)',
        'polygonOpacity': 0.6
      }
    }).addTo(this.GeoFencesLayer)
  }


  setGeo (item) {
    this.geoLines = item || []
    this.fences = this.geoLines
    this.fences[this.fences.length - 1] = this.fences[0]
    this.drawGeoFences()
  }

  /**
 * 注册事件
 * @param {String} key key
 * @param {Function} callback callback
 */
  on (key, callback) {
    this.eventList[key] = callback
  }

  onContextmenu (key, callback) {
    this.map.on(key, callback)
  }

  bindEvent () {
    this.drawTool.on("drawend", (param) => {
      // param.geometry._coordinates[param.geometry._coordinates.length - 1] = param.geometry._coordinates[0];
      let t1 = param.geometry.getCoordinates()[0]
      t1.pop()
      t1.pop()
      // this.GeoFencesLayer.addGeometry(param.geometry);
      this.GeoFencesLayer.addGeometry(param.geometry.setCoordinates(t1))
    })
  }
}

export default GeoTool