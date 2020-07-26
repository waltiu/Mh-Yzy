import { EventEmitter } from 'events';
import { Delay } from '@/_command/tools';

import { Device } from '../handle/device'
import { DeviceRoom } from '../handle/deviceRoom'
import { Cited } from '../handle/cited'
import { CitedSection } from '../handle/citedSection'
import { Cable } from '../handle/cable'
import { SwitchY } from '../handle/switchY'
import { Odf } from '../handle/odf'
import { Pole } from '../handle/pole'
import { PoleSection } from '../handle/poleSection'
import { Support } from '../handle/support'
import { SupportSection } from '../handle/supportSection'
import { Well } from '../handle/well'
import { PipeSection } from '../handle/pipeSection'
import { LightRoad } from '../handle/lightRoad'

export class InfoMap extends EventEmitter {
  constructor () {
    super()

    // CoorType 地图类型
    this.coorType = 'BD'

    this.buttonStatusChange = new EventEmitter()
    this.delay = new Delay(1000 * 3)

    // Button Status
    this.buttonStatus = {}

    // 实例化所有class
    this.equipment = new Device(this.map)
    this.machineRoom = new DeviceRoom(this.map)
    this.ledUp = new Cited(this.map)
    this.ledUpLineSection = new CitedSection(this.map)
    this.oc = new Cable(this.map)
    this.occ = new SwitchY(this.map)
    this.odf = new Odf(this.map)
    this.pole = new Pole(this.map)
    this.poleLineSection = new PoleSection(this.map)
    this.support = new Support(this.map)
    this.supportLineSection = new SupportSection(this.map)
    this.well = new Well(this.map)
    this.wellLineSection = new PipeSection(this.map)
    this.lightRoad = new LightRoad(this.map)

  }

  /**
   * key string resource name.
   * status boolen switch status
   */
  setButtonStatus = (key, status) => {
    this.buttonStatus[key] = status
    this.buttonStatusChange.emit(key, status)
    this.emit('AllStatusChange', key, status)
    return this
  }

  /**
   * set map coor type, BD, WGS, GCJ
   */
  setCoor = (type) => {
    this.coorType = type
    this.emit('CoorChange', type)
    return this
  }

  getloadStatus () {
    return Object.values(this.buttonStatus).includes(true)
  }

  /**
   * http requests
   */
  _loadResource = () => {
  }

  resourceRender = (resourceName, data, callback = () => { }) => {
    callback(this[resourceName].show(data))
    return this
  }

  // null function
  bindEvent = () => {
  }




}