

import { RestUrlConfig } from '../index';


export class CitedSectionConfig extends RestUrlConfig {
  constructor () {
    super('citedSection')

    this.map = '/api/ldsysLineSections/search/listLdsysPoints'
    this.mapArgs = { "type": 3 }
  }
}
