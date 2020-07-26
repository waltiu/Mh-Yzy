import { RestUrlConfig } from '../index';


export class PoleRoadConfig extends RestUrlConfig {
  constructor () {
    super('poleRoad')

    this.map = '/api/ldsysLines/search/listLdsysPoints'
    this.mapArgs = { "type": 2 }
  }
}