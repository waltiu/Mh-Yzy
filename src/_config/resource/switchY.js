import { RestUrlConfig } from '../index';


export class SwitchYConfig extends RestUrlConfig {
  constructor () {
    super('switchY')

    this.map = '/api/ldsysOpticalCrossConnects/search/listLdsysOpticalCrossConnectsOCC'
    this.mapArgs = {}
  }
}