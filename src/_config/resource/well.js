import { RestUrlConfig } from '../index';


export class WellConfig extends RestUrlConfig {
  constructor () {
    super('well')

    this.map = '/api/ldsysPoints/search/listLdsysPoints'
    this.mapArgs = { "type": 1 }
  }
}