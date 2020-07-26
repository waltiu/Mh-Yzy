import { SectionHandle } from '@/_public/map/class/MapHandle/base/section'
import store from '@/store'
import { alertInfo } from '@/_command/misc';

export class PipeSection extends SectionHandle {
  constructor (map, layerName = '_PipeSectionLayer') {
    super(map, layerName)
  }

  _defaultSection () {
    return store.getters.vendorNameByTypeArray['pipeSection'].color
  }

  sectionStyle () {
    return { lineColor: this._defaultSection() }
  }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'pipeSection'))
  }

}