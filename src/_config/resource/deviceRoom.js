
import { RestUrlConfig } from '../index';


export class DeviceRoomConfig extends RestUrlConfig {
  constructor () {
    super('deviceRoom')

    this.map = '/api/ldsysMachineRooms/search/listLdsysMachineRoom'
    this.mapArgs = {}
  }
}