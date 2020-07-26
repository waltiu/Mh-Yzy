import { SectionHandle } from '@/_public/map/class/MapHandle/base/section'
import store from '@/store'
import { alertInfo } from '@/_command/misc';

export class CitedSection extends SectionHandle {
  constructor (map, layerName = '_CableLayer') {
    super(map, layerName)
  }

  _defaultSection () {
    return store.getters.vendorNameByTypeArray['citedSection'].color
  }

  sectionStyle () {
    return { lineColor: this._defaultSection() }
  }

  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'citedSection'))
  }

}