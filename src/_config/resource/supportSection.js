
import { RestUrlConfig } from '../index';


export class SupportSectionConfig extends RestUrlConfig {
  constructor () {
    super('supportSection')

    this.map = '/api/ldsysLineSections/search/listLdsysPoints'
    this.mapArgs = { "type": 4 }
  }
}