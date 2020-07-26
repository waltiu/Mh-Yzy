import { Handle } from './index'
import _ from 'lodash'

export class TipsHandle extends Handle {
  constructor (map, layerName = '_tipsLayer') {
    if (_.isString(layerName)) {
      layerName = map.getLayer(layerName) || layerName
    }
    super(map, layerName)
  }
}