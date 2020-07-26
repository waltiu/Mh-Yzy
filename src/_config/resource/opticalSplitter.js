import { RestUrlConfig } from '../index';


export class OpticalSplitterConfig extends RestUrlConfig {
  constructor () {
    super('opticalSplitter')

    this.map = '/api/ldsysOpticalSplitters/findByMap'
    this.mapArgs = {}
  }
}