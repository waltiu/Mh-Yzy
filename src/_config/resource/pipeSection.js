import { RestUrlConfig } from '../index';


export class PipeSectionConfig extends RestUrlConfig {
  constructor () {
    super('pipeSection')

    this.map = '/api/ldsysLineSections/search/listLdsysPoints'
    this.mapArgs = { "type": 1 }
  }
}