import { RestUrlConfig } from '../index';


export class SupportConfig extends RestUrlConfig {
  constructor () {
    super('support')

    this.map = '/api/ldsysPoints/search/listLdsysPoints'
    this.mapArgs = { "type": 9 }
  }
}
