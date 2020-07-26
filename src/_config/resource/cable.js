import { RestUrlConfig } from '../index';


export class CableConfig extends RestUrlConfig {
  constructor () {
    super('cable')

    this.map = '/api/ldsysOpticalCables/search/listLdsysOpticalCables'
    this.mapArgs = { "interval": 10 }
  }
}
