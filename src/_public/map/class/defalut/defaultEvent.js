import store from '@/store'

let amplificationSzie = {
    lineWidth: 4,
    lineOpacity: 0.4
}

export default {
    'line': {
        on: {
            click({ item, key, _this }) {
                _this.self.$alertInfo(item, key)
                _this.baseLayer['tips'].clear()
            },
            contextmenu: function({ item, _this, $event, obj }) {
                item._oldSymbol = obj.getSymbol()
                store.commit('updateKeepCableShow', item)
                _this.tipsHandler({
                    ...item,
                    lng: $event.coordinate.x,
                    lat: $event.coordinate.y
                }, _this.baseLayer['cableTips'])
            },
            mouseenter: function({ obj, $event, item, _this }) {
                item._oldSymbol = obj.getSymbol()
                obj.updateSymbol({
                    lineWidth: item._oldSymbol.lineWidth + amplificationSzie.lineWidth,
                    lineOpacity: item._oldSymbol.lineOpacity + amplificationSzie.lineOpacity,
                    lineColor: '#8B008B'
                })
                _this.tipsHandler({
                    ...item,
                    lng: $event.coordinate.x,
                    lat: $event.coordinate.y
                })
            },
            mouseout: function({ obj, _this, item }) {
                obj.updateSymbol(item._oldSymbol)
                _this.baseLayer['tips'].clear()
            }
        },
        onload: function({ item, obj }) {
            let index = store.getters.getKeepCableShowById.indexOf(item.id)
            if (index !== -1) {
                item = store.state.infoMapShow.keepCableShow[index]
                obj.updateSymbol({
                    lineWidth: item._oldSymbol.lineWidth + amplificationSzie.lineWidth,
                    lineOpacity: item._oldSymbol.lineOpacity + amplificationSzie.lineOpacity,
                    lineColor: '#8B008B'
                })
            }
        }
    },
    'icon': {
        on: {
            click: function({ item, key, _this }) {
                _this.self.$alertInfo(item, key)
                _this.baseLayer['tips'].clear()
            },
            mouseenter: function({ item, _this }) {
                _this.tipsHandler(item)
            },
            mouseout: function({ _this }) {
                _this.baseLayer['tips'].clear()
            },
            dragend: function({ $event }) {
                store.commit('setDragendPoint', $event)
                store.commit('setShowChangeAlert', true)
            }
        }
    },
    'fences': {
        on: {
            click: function({ item, key, _this }) {
                _this.self.$alertInfo(item, key)
                _this.baseLayer['tips'].clear()
            },
            mouseenter: function({ obj, $event, item, _this }) {
                item._oldSymbol = obj.getSymbol()
                obj.updateSymbol({
                    lineWidth: item._oldSymbol.lineWidth + amplificationSzie.lineWidth,
                    lineOpacity: item._oldSymbol.lineOpacity + amplificationSzie.lineOpacity,
                    lineColor: '#8B008B'
                })
                _this.tipsHandler({
                    ...item,
                    lng: $event.coordinate.x,
                    lat: $event.coordinate.y
                })
            },
            mouseout: function({ obj, _this, item }) {
                obj.updateSymbol(item._oldSymbol)
                _this.baseLayer['tips'].clear()
            }
        }
    },
    'section': {
        on: {
            click: function({ item, key, _this }) {
                _this.self.$alertInfo(item, key)
            },
            mouseenter: function({ obj, item }) {
                item._oldSymbol = obj.getSymbol()
                obj.updateSymbol({
                    lineWidth: item._oldSymbol.lineWidth + amplificationSzie.lineWidth,
                    lineOpacity: item._oldSymbol.lineOpacity + amplificationSzie.lineOpacity
                })
            },
            mouseout: function({ obj, item }) {
                obj.updateSymbol(item._oldSymbol)
            }
        }
    },
    'tips': {}
}