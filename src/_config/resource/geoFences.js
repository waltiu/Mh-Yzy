
import { RestUrlConfig } from '../index';


export class GeoFencesConfig extends RestUrlConfig {
  constructor () {
    super('geoFences')

    this.map = '/api/ldsysGeofences'
    this.mapArgs = { "page": 0, "size": 100000 }
  }
}
