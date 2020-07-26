import { SectionHandle } from '@/_public/map/class/MapHandle/base/section'
import store from '@/store'
import { alertInfo } from '@/_command/misc';

export class SupportSection extends SectionHandle {
  constructor (map, layerName = '_SupportSetionLayer') {
    super(map, layerName)
  }

  _defaultSection () {
    return store.getters.vendorNameByTypeArray['supportSection'].color
  }

  sectionStyle () {
    return { lineColor: this._defaultSection() }
  }


  bindEmitById (item, info) {
    item.on('click', () => alertInfo(info, 'supportSection'))
  }


}