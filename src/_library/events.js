import { EventEmitter } from 'events'


export class EventBus extends EventEmitter {
  constructor (data) {
    super()
    this.data = new Map(Object.entries(data))
  }

  setState (key, val) {
    this.data.set(key, val)
    this.emit('StateChange', { key, val }, this.data)
    return this
  }

  setFull (val) {
    this.data = new Map(val)
    this.emit('FullChange', val)
    return this
  }

  delState (key) {
    this.data.delete(key)
    this.emit('StateChange', key, this.data)
    return this
  }

  getData () {
    return Object.fromEntries(this.data)
  }

}