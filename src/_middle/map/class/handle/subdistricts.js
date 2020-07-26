import { IconHandle } from '@/_public/map/class/MapHandle/base/icon'
import { EventEmitter } from 'events';
// import { alertInfo } from '@/_command/misc';

export class Subdistricts extends IconHandle {
  constructor (map, layerName = '_SubdistrictsLayer') {
    super(map, layerName)
    this.bus = new EventEmitter()
  }


  _defaultIcon () {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAADzAAAA8wFG8s9tAAAA9ElEQVQokZ2TsW3DMBREnwL3FsIBokJ9PII3SAoP4JTq7AnkTBBVYRmP4hHi2iycAQxYEyg4+MMgBBpmcsAvSP27fyKPxTAMOB9WwAaYch+9ek9N3RWPnwcRP4AfYJtBXgJPwFrkM6CanZr6fI/pfCiBb6CcmNVORPuwA56tdw/MY1Hrk8P2YSQ8M9W9rSWydT5snA/V2MUk4WwuS9H6xUrCr3HjeLJwtDMYIxa8Sc5GilylpqSQIu/M+p/JOpRFdFUxSueDDvMKhWQA3m3aV8bAN/u1VlelrCpymppjVzlQ9SLrQSjb2sjJtnou2f73q2rq7hftvEmwFdAAxwAAAABJRU5ErkJggg==`
  }

  /**
   * 
   * @param {Object} item
   */
  iconStyle () {
    return { markerFile: this._defaultIcon() }
  }

  bindEmitById (item, info) {
    item.on('click', () => this.bus.emit('click', info, item))
  }

  listenItemEvent = (...args) => this.bus.on(...args)
}