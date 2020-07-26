import { Device } from './device'
import { DeviceRoom } from './deviceRoom'
import { Cited } from './cited'
import { CitedSection } from './citedSection'
import { Cable } from './cable'
import { SwitchY } from './switchY'
import { Odf } from './odf'
import { Pole } from './pole'
import { PoleSection } from './poleSection'
import { Support } from './support'
import { SupportSection } from './supportSection'
import { Well } from './well'
import { PipeSection } from './pipeSection'

import { ComplexHandle } from '@/_public/map/class/MapHandle/base/complex'

export class LightRoad extends ComplexHandle {
  constructor (map, layerName = '_BusinessLayer') {
    super(map, layerName)
    this.equipment = new Device(this.map, this.layer)
    this.machineRoom = new DeviceRoom(this.map, this.layer)
    this.ledUp = new Cited(this.map, this.layer)
    this.ledUpLineSection = new CitedSection(this.map, this.layer)
    this.oc = new Cable(this.map, this.layer)
    this.occ = new SwitchY(this.map, this.layer)
    this.odf = new Odf(this.map, this.layer)
    this.pole = new Pole(this.map, this.layer)
    this.poleLineSection = new PoleSection(this.map, this.layer)
    this.support = new Support(this.map, this.layer)
    this.supportLineSection = new SupportSection(this.map, this.layer)
    this.well = new Well(this.map, this.layer)
    this.wellLineSection = new PipeSection(this.map, this.layer)
  }

  /**
   * 
   * @param {Object} item 分类渲染
   */
  _render (item) {
    Object.entries(item).forEach(([key, val]) => {
      this[key] || this[key].add(val)
    })
  }

}