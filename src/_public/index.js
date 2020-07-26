import Vue from 'vue'
import TableView from './table/table.vue'
import NextTableView from './table/next.vue'
import NextAlertPage from './alert/index.vue'
import NextAlertPageWithButton from './alert/button.vue'
import svgIcons from './icons'
import PublicMap from './map/index.vue'
import NextMap from './map/next.vue'
import ExcelDownload from './excel/download'
import renderObject from './render'
import form from './form'
import TableHeader from './tabletitle'
import DeleteButton from './tableoptions/delete.vue'
import Content from './content'
import PagIng from './paging'
import FormEvent from './form/event.vue'
import SelectPoint from './form/components/selectpoint.vue'
import EventTableView from './table/event.vue'


import EventTableHeader from './tabletitle/event.vue'
import EventDeleteButton from './tableoptions/event-delete.vue'
import DataTableView from './table/local.vue'
import EventPagIng from './paging/event.vue'
import EventMap from './map/event.vue'

Vue.component('public-event-paging', EventPagIng)
Vue.component('public-event-table-title', EventTableHeader)
Vue.component('public-event-delete-button', EventDeleteButton)
Vue.component('public-event-table-view', EventTableView)
Vue.component('public-event-map', EventMap)

Vue.component('public-data-table-view', DataTableView)


Vue.component('public-form-event', FormEvent)
Vue.component('public-form-select-point', SelectPoint)
Vue.component('public-paging', PagIng)
Vue.component('public-next-map', NextMap)
Vue.component('public-map', PublicMap)
Vue.component('public-alert-page-with-button', NextAlertPageWithButton)
Vue.component('public-alert-page', NextAlertPage)
Vue.component('public-table-view', TableView)
Vue.component('public-next-table-view', NextTableView)

Vue.component('public-svg-icons', svgIcons)
Vue.component('public-excel-download', ExcelDownload)
Vue.component('public-render', renderObject)
Vue.component('public-form', form)
Vue.component('public-table-title', TableHeader)
Vue.component('public-content', Content)

Vue.component('public-delete-button', DeleteButton)