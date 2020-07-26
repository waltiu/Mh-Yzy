import { RestUrlConfig } from '../index';


export class PipeConfig extends RestUrlConfig {
  constructor () {
    super('pipe')

    this.map = '/api/ldsysLines/search/listLdsysPoints'
    this.mapArgs = { "type": 1 }
  }
}