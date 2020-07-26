import { RestUrlConfig } from '../index';


export class DeviceConfig extends RestUrlConfig {
  constructor () {
    super('device')

    this.map = '/api/ldsysEquipments/search/listLdsysLdsysEquipments'
    this.mapArgs = {}
  }
}