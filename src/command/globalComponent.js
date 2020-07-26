import Vue from 'vue'

// 引入组件
import dialogPage from '../public/alertPage/alertPage.vue'
import editAndAddInfo from '../public/editAndAdd/noDialog.vue'
import autoComplete from '../public/autoComplete'
import showTableInfo from '../public/alertPage/noDialog.vue'
import infoMapShow from '@/manage/infoMap/mapLibrary.vue'
import tableAndPaging from '../public/tableAndPaging'
import mdAttach from '../public/mdAdd'
import sysRoleCheck from '../public/sysRoleList'
import sysRoleList from '../public/sysRoleList/list.vue'
import dragTable from '../public/dragTable'
import diffTable from '../public/diffTable'
import fileOperating from '../public/fileOperating'
import pagingPage from '../public/paging'
import bigSelectDown from '../public/bigSelectDown'
import tableSearchBar from '../public/tableSearch'
import loadingComponents from '../public/loading'
import tableList from '../public/tableList'
import tableBase from '../public/table'
import baseInfoAlert from '../public/alertPage/baseInfo'
import baseInfoEdit from '../public/editAndAdd/baseInfo'
import colorPicker from '../public/colorPicker'
import selectCanton from '../public/selectCanton'

Vue.component('select-canton', selectCanton)
Vue.component('table-search-bar', tableSearchBar)
Vue.component('loading-components', loadingComponents)
Vue.component('big-select-down', bigSelectDown)
Vue.component('paging-page', pagingPage)
Vue.component('file-operating', fileOperating)
Vue.component('diff-table', diffTable)
Vue.component('drag-table', dragTable)
Vue.component('sys-role-list', sysRoleList)
Vue.component('sys-role-check', sysRoleCheck)
Vue.component('dialog-page', dialogPage)
Vue.component('edit-add-info', editAndAddInfo)
Vue.component('auto-complete-info', autoComplete)
Vue.component('show-table-info', showTableInfo)
Vue.component('info-map-show', infoMapShow)
Vue.component('table-and-paging', tableAndPaging)
Vue.component('md-attach', mdAttach)
Vue.component('table-list', tableList)
Vue.component('table-base', tableBase)
Vue.component('base-info-alert', baseInfoAlert)
Vue.component('color-picker', colorPicker)
Vue.component('base-info-edit', baseInfoEdit)

