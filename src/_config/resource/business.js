import { RestUrlConfig } from '../index';


export class BusinessConfig extends RestUrlConfig {
  constructor () {
    super('ldsysOpticaleCableWorks')

    this.map = this.search
    this.mapArgs = this.searchArgs
  }
}