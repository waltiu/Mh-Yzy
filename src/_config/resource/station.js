import { RestUrlConfig } from '../index';


export class StationConfig extends RestUrlConfig {
  constructor () {
    super('station')

    this.map = '/api/ldsysStations/search/listLdsysPoints'
    this.mapArgs = {}
  }
}