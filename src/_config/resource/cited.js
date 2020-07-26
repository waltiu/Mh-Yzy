import { RestUrlConfig } from '../index';


export class CitedConfig extends RestUrlConfig {
  constructor () {
    super('cited')

    this.map = '/api/ldsysPoints/search/listLdsysPoints'
    this.mapArgs = { "type": 3 }
  }
}