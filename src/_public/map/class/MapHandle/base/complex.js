import { Handle } from './index'

export class ComplexHandle extends Handle {
  constructor (map, layerName = '_ComplexLayer') {
    super(map, layerName)
  }
}