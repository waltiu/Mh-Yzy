

import { RestUrlConfig } from '../index';


export class ErrorConfig extends RestUrlConfig {
  constructor () {
    super('error')

    this.map = '/api/ldsysTroubles/search/listLdsysTroublesAndIsFixAndIsFixConfirm'
    this.mapArgs = { "isFix": false, "isFixConfirm": false }
  }
}