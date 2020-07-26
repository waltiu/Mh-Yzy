import defaultEvent from './defaultEvent'

let SameRouteDefaultEvent = {
  ...defaultEvent,
  icon: {
    ...defaultEvent.icon,
    onload: function ({ obj, args }) {
      if (args && args.flash) {
        obj.animate({ 'symbol': { 'markerHeight': 30, 'markerWidth': 30 } }, { 'duration': 1000, 'repeat': true })
      }
      obj.setZIndex(20)
    }
  },
  section: {
    ...defaultEvent.section,
    onload: function ({ obj, args }) {
      if (args && args.flash) {
        obj.setZIndex(100)
        obj.updateSymbol({
          lineWidth: 10
        })
        obj.flash(600, 1000000)
      }
    }
  }
}

export default SameRouteDefaultEvent
