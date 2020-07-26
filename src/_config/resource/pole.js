
import { RestUrlConfig } from '../index';


export class PoleConfig extends RestUrlConfig {
  constructor () {
    super('pole')

    this.map = '/api/ldsysPoints/search/listLdsysPoints'
    this.mapArgs = { "type": 2 }
  }
}
