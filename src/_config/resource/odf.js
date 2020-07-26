import { RestUrlConfig } from '../index';


export class OdfConfig extends RestUrlConfig {
  constructor () {
    super('odf')

    this.map = '/api/ldsysOpticalCrossConnects/search/listLdsysOpticalCrossConnectsODF'
    this.mapArgs = {}
  }
}