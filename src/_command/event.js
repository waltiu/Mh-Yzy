import { EventEmitter } from 'events'


export class FormEventBus extends EventEmitter {
  constructor (fullData) {
    super()
    this.fullData = fullData || {}
    this.formDataEventBus = new EventEmitter()
    this.emit('OnLoad')
  }

  setState (key, val) {
    this.fullData[key] = val
    this.emit('StateChange', { key, val }, this.fullData)
    this.emitFormEvent(key, val)
    return this
  }

  setFull (val) {
    this.fullData = val
    this.emit('FullChange', val)
    return this
  }

  delState (key) {
    delete this.fullData[key]
    this.emit('StateChange', key, this.fullData)
    this.emitFormEvent(key)
    return this
  }

  /**
   * 监视 form 表单 key 更改
   */
  onFormChange (...args) {
    return this.formDataEventBus.on(...args)
  }

  /**
   * 广播 事件 form 表单 key 更改
   */
  emitFormEvent (...args) {
    return this.formDataEventBus.emit(...args)
  }

  submit () {
    this.emit('Submit')
    return this.fullData
  }

}