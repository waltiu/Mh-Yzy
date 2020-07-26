import { WatchMap } from './WatchMap'
import * as maptalks from 'maptalks'
import difference from '@turf/difference'
import * as turf from '@turf/helpers'
import { http } from '@/_command/http'
export class GeoFences extends WatchMap {
  constructor (map, self) {
    super(map, self)
    this.eventList = {}
    this.geoLines = []
    this.GeoFencesLayer = new maptalks.VectorLayer('地理围栏编辑').addTo(this.map)
    this.drawTool = new maptalks.DrawTool({ mode: "Point" }).addTo(this.map).disable();
    this.bindEvent()
  }


  /**
   * 创建一个ｔｏｏｌｂａｒ
   */

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

  finish (station) {
    this.drawTool.disable();
    let justDrawed = [this.GeoFencesLayer._geoList.find(i => i._coordinates.length != 0)._coordinates.map(item => [item.x, item.y])]
    if (station) {
      this.finish(false)
      http.get('/api/ldsysGeofences').then(res => {
        let allFences = res.data._embedded.ldsysGeofences
        let turfFences = this.toTurfPolygon(allFences).map(item => turf.polygon(item, { "fill": "#0f0" }))
        justDrawed[0][justDrawed[0].length - 1] = justDrawed[0][0]
        turfFences.push(turf.polygon(justDrawed, { "fill": "#0f0" }))
        let diffPolygon = turfFences.reduceRight((a, b) => difference(a, b))
        this.geoLines = diffPolygon.geometry.coordinates[0]
        this.drawGeoFences()
        if (this.eventList['finish']) {
          this.eventList['finish'](this.geoLines)
        }
      })
    }

    else {
      if (!this.GeoFencesLayer._geoList.find(item => item.type == "Polygon"))
        this.geoLines = this.GeoFencesLayer._geoList.find(item => item.type == "LineString")._coordinates.map(item => [item.x, item.y])
      else
        this.geoLines = this.GeoFencesLayer._geoList.find(item => item.type == "Polygon")._coordinates.map(item => [item.x, item.y])

      this.drawGeoFences()
      if (this.eventList['finish']) {
        this.eventList['finish'](this.geoLines)
      }
    }
  }
  edit () {
    this.GeoFencesLayer._geoList.map(item => item.startEdit())
  }

  /**
   *
   * @param {Boolean} status
   */
  changeEditStatus (status) {
    let event = status ? 'on' : 'off'
    this.map[event]('contextmenu', () => {
    })
  }

  /**
   * 绑定监听方法 & map
   * @private
   */
  bindEvent () {
    // this.map.on('click', (info) => {
    //   this.geoLines.push([info.coordinate.x, info.coordinate.y])
    //   // this.drawEdit()
    // })
    // this.map.on('contextmenu', () => {
    // this.GeoFencesLayer.clear()
    // // this.drawGeoFences()
    // if (this.eventList['finish']) {
    //   this.eventList['finish'](this.geoLines)
    // }
    // this.finish(false)
    // })
    this.drawTool.on("drawend", (param) => {
      param.geometry._coordinates[param.geometry._coordinates.length - 1] = param.geometry._coordinates[0];
      this.GeoFencesLayer.addGeometry(param.geometry);
    });
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
  /**
   * Array索引
   * @param {String} index
   */
  del (index) {
    this.geoLines.splice(index, 1)
    this.drawEdit()
  }

  /**
   * 设置全部Lines
   * @param {Array} item
   */
  setGeo (item) {
    this.geoLines = item || []
    this.drawEdit()
  }
  /**
   * 绘制单独的 坐标点
   * @param {Array} lines
   */
  drawEdit () {
    if (this.eventList['change']) {
      this.eventList['change'](this.geoLines)
    }
    this.GeoFencesLayer.clear()
    new maptalks.LineString(this.geoLines).addTo(this.GeoFencesLayer)
  }

  /**
   * 注册事件
   * @param {String} key key
   * @param {Function} callback callback
   */
  on (key, callback) {
    this.eventList[key] = callback
  }
  /**
   * 结束当前绘制
   */
  endDraw () {
    this.changeEditStatus(false)
    this.clear()
  }

  /**
   * 渲染时使用多边形渲染.
   * @param {Array} list
   */
  drawList () {
  }

  /**
   * 清除当前所有的线
   */
  clear () {
    this.GeoFencesLayer.clear()
  }
}

export default GeoFences
