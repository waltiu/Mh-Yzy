import { CableOrder } from './cableorder';
import { EventEmitter } from 'events';
import Vue from 'vue'

export class FormBus extends CableOrder {
  constructor (data = {}) {
    super()

    this.formData = Vue.observable(data)
    this.form = new EventEmitter()
  }

  setFull = (args) => {
    this.formData = args
    this.emit('FullChange', args)
    return this
  }

  setState = (key, val) => {
    this.formData[key] = val
    this.emit('StateChange', key, val)
    this.form.emit(key, val)
    return this
  }

  onForm = (...args) => {
    return this.form.on(...args)
  }

}