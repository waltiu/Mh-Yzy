import * as maptalks from 'maptalks'


export class RenderTipsLayer {
  constructor (map, layerName = '_TipsLayer') {
    this.map = map
    this.tipsLayer = new maptalks.VectorLayer(layerName).addTo(this.map)
  }

  /**
   * 为 _render 方法 
   * @param  {...any} args 
   */
  show (...args) {
    this.clear()
    this._render(...args)
  }

  /**
   * 为 render 方法参数
   * @param  {...any} args 
   */
  add (...args) {
    this._render(...args)
  }

  clear () {
    this.tipsLayer.clear()
  }
  /**
   * 渲染器
   * @param {Array} data 
   * @param {Function} reduce return maptalks data type, defalut is this.reduce
   */
  _render (data, coor = this.coor, reduce = this.reduce) {
    data.forEach(item => {
      new maptalks.Marker(coor(item), reduce(item)).addTo(this.tipsLayer)
    })
  }


  /**
   * 生成坐标
   * @param {Object} info 
   */
  coor (info) {
    return [info.lng, info.lat]
  }

  /**
   * 生成目标配置
   * @param {Object} info 单个item
   */
  reduce (info) {
    return {
      'properties': {
        'name': info.name
      },
      'symbol': {
        'textFaceName': 'sans-serif',
        'textName': '{name}',
        'textWeight': 'normal',
        'textStyle': 'normal',
        'textSize': 15,
        'textFont': null,
        'textFill': '#34495e',
        'textOpacity': 1,
        'textHaloFill': '#fff',
        'textHaloRadius': 5,
        'textWrapWidth': null,
        'textWrapCharacter': '\n',
        'textLineSpacing': 0,
        'textDx': 30,
        'textDy': 30,
        'textHorizontalAlignment': 'middle',
        'textVerticalAlignment': 'top',
        'textAlign': 'auto'
      }
    }
  }
}