import { RestUrlConfig } from '.';

export class MapResource extends RestUrlConfig {
  constructor (key) {
    super(key)

    // without s
    this.map = `/api/${key}/search/${key}`
    this.mapArgs = {}
  }
}