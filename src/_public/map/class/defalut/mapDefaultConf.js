import store from '@/store'

export default {
  'line': function () {
    return {
      arrowStyle: null,
      arrowPlacement: 'vertex-last',
      visible: true,
      editable: true,
      cursor: null,
      shadowBlur: 0,
      shadowColor: 'black',
      draggable: false,
      dragShadow: false,
      drawOnAxis: null,
      symbol: {
        'lineColor': 'red',
        'lineOpacity': 0.5,
        'lineWidth': 3
      }
    }
  },
  'icon': function (key, item) {
    return {
      'draggable': store ? store.state.draggable : false,
      'properties': {
        'lng': item.lng,
        'lat': item.lat,
        'name': item.name,
        'id': item.id,
        'type': key
      },
      'symbol': {
        'markerFile': this.computedColor(key, item, 'icon'),
        'markerWidth': 16,
        'markerHeight': 16,
        'markerDx': 0,
        'markerDy': 8,
        'markerOpacity': 1
      }
    }
  },
  'section': function (key, item, style) {
    return {
      arrowPlacement: 'vertex-last',
      visible: true,
      editable: true,
      draggable: false,
      symbol: {
        ...style.lineStyle,
        'lineColor': this.computedColor(key, item, 'section')
      }
    }
  },
  'fences': function () {
    return {
      visible: true,
      editable: false,
      cursor: 'pointer',
      shadowBlur: 0,
      shadowColor: 'black',
      draggable: false,
      dragShadow: false,
      drawOnAxis: null,
      symbol: {
        'polygonOpacity': 0.1,
        'lineWidth': 2
      }
    }
  },
  'tips': function (rowData) {
    return {
      'properties': {
        'name': rowData.name
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
