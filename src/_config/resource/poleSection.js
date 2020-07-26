
import { RestUrlConfig } from '../index';


export class PoleSectionConfig extends RestUrlConfig {
  constructor () {
    super('poleSection')

    this.map = '/api/ldsysLineSections/search/listLdsysPoints'
    this.mapArgs = { "type": 2 }
  }
}