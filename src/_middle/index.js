import Vue from 'vue'

import ExcelExportImport from './excel/button.vue'
import RelatedPointEdit from './relatedpoint/withmodel.vue'
import SearchInfo from './search/index.vue'
import ExcelExportByArray from './excel/selectItem'
import FilterButtonInMap from './filterbutton/map.vue'
import NextMap from './map/next.vue'
import NativeMap from './map/map.vue'
import DiffTableView from './diff/index.vue'
import layerSwicther from './map/layerswitcher/index.vue'


import EventTableView from './table/event.vue'

Vue.component('middle-event-table-view', EventTableView)


Vue.component('middle-map', NativeMap)
Vue.component('middle-next-map', NextMap)
Vue.component('middle-excel-export-import', ExcelExportImport)
Vue.component('middle-excel-export-byarray', ExcelExportByArray)
Vue.component('middle-related-point-edit', RelatedPointEdit)
Vue.component('middle-search-info', SearchInfo)
Vue.component('middle-filter-button-in-map', FilterButtonInMap)
Vue.component('middle-diff-table-view', DiffTableView)
Vue.component('middle-layer-switcher', layerSwicther)