
import { RestUrlConfig } from '../index';

// TODO
export class LightRoadConfig extends RestUrlConfig {
  constructor () {
    super('geoFences')

    this.map = '/api/ldsysGeofences'
    this.mapArgs = { "page": 0, "size": 100000 }
  }
}
