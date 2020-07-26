import { EventEmitter } from 'events'

export class VueComponent extends EventEmitter {
  constructor (h) {
    super()
    this.h = h
  }

  get render () {
    return 1
  }

  _render () {
  }

}


