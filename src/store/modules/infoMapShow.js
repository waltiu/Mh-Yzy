import _ from 'lodash'
import Vue from 'vue'

const state = {
    // 查询One
    // 这里的只是用来在查询， 不可以进行curd
    detailsUrl: {
        'geoFences': { url: '/api/ldsysGeofences/', args: {} },
        'user': { url: '/api/sysUsers/', args: {} },
        'opticalSplitter': { url: '/api/ldsysOpticalSplitters/', args: {} },
        'poleSection': { url: '/api/ldsysLineSections/', args: { projection: 'ldsysLineSectionALL' } },
        'lightRoad': { url: '/api/ldsysOpticalCableWays/', args: {} },
        'citedSection': { url: '/api/ldsysLineSections/', args: { projection: 'ldsysLineSectionALL' } },
        'supportSection': { url: '/api/ldsysLineSections/', args: { projection: 'ldsysLineSectionALL' } },
        'error': { url: '/api/ldsysTroubles/', args: {} },
        'device': { url: '/api/ldsysEquipments/', args: {} },
        'deviceRoom': { url: '/api/ldsysMachineRooms/', args: {} },
        'business': { url: '/api/ldsysOpticaleCableWorks/map/', args: {} },
        'poleRoad': { url: '/api/ldsysLines/', args: { type: 2 } },
        'pipe': { url: '/api/ldsysLines/', args: { type: 1 } },
        'pipeSection': { url: '/api/ldsysLineSections/', args: { projection: 'ldsysLineSectionALL' } },
        'cran': { url: 'api/ldsysOpticalMultiplexers/', args: {} },


        'well': { url: '/api/ldsysPoints/', args: { projection: 'ldsysPointALL' } },
        'pole': { url: '/api/ldsysPoints/', args: { projection: 'ldsysPointALL' } },
        'cited': { url: '/api/ldsysPoints/', args: { projection: 'ldsysPointALL' } },
        'support': { url: '/api/ldsysPoints/', args: { projection: 'ldsysPointALL' } },

        'cable': { url: '/api/ldsysOpticalCables/search/findOne/', create: '/api/ldsysOpticalCables/', update: '/api/ldsysOpticalCables/', args: {} },
        'switchY': { url: '/api/ldsysOpticalCrossConnects/', args: {} },
        'odf': { url: '/api/ldsysOpticalCrossConnects/', create: '/api/ldsysOdfs/', update: '/api/ldsysOpticalCrossConnects/', args: {} },
        'station': { url: '/api/ldsysStations/', args: { projection: 'ldsysStationALL' } }
    },
    buttonStatus: {
        opticalSplitter: false,
        business: false,
        cable: false,
        cableLabel: false,
        device: false,
        deviceRoom: false,
        error: false,
        lightRoad: false,
        pole: false,
        poleRoad: false,
        poleSection: false,
        station: false,
        switchY: false,
        well: false,
        pipe: false,
        pipeSection: false,
        cited: false,
        citedSection: false,
        support: false,
        supportSection: false,
        geoFences: false
    },
    inputSelect: {
        geoFences: {
            display: [],
            selected: {},
            config: {}
        },
        supportSection: {
            display: [],
            selected: {},
            config: {}
        },
        pipeSection: {
            display: [],
            selected: {},
            config: {}
        },
        citedSection: {
            display: [],
            selected: {},
            config: {}
        },
        poleSection: {
            display: [],
            selected: {},
            config: {}
        },
        pipe: {
            display: [],
            selected: {},
            config: {}
        },
        poleRoad: {
            display: [],
            selected: {},
            config: {}
        },
        opticalMultiplexer: {
            display: [],
            selected: {},
            config: {}
        },

        cable: {
            display: [],
            selected: {},
            config: {}
        },
        support: {
            display: [],
            selected: {},
            config: {}
        },
        business: {
            display: [],
            selected: {},
            config: {}
        },
        device: {
            display: [],
            selected: {},
            config: {}
        },
        opticalSplitter: {
            display: [],
            selected: {},
            config: {}
        },
        cited: {
            display: [],
            selected: {},
            config: {}
        },
        deviceRoom: {
            display: [],
            selected: {},
            config: {}
        },
        error: {
            display: [],
            selected: {},
            config: {}
        },
        lightRoad: {
            display: [],
            selected: {},
            config: {}
        },
        pole: {
            display: [],
            selected: {},
            config: {}
        },
        station: {
            display: [],
            selected: {},
            config: {}
        },
        switchY: {
            display: [],
            selected: {},
            config: {}
        },
        odf: {
            display: [],
            selected: {},
            config: {}
        },
        well: {
            display: [],
            selected: {},
            config: {}
        }
    },
    mapProperty: {
        map: {},
        zoom: 18,
        center: { lng: '123.441443', lat: '41.825903' }
    },
    loading: '',
    showInMap: {
        geoFences: [],
        opticalSplitter: [],
        cited: [],
        citedSection: [],
        support: [],
        poleSection: [],
        poleRoad: [],
        pipe: [],
        pipeSection: [],
        business: [],
        cable: [],
        device: [],
        deviceRoom: [],
        error: [],
        lightRoad: [],
        pole: [],
        station: [],
        switchY: [],
        odf: [],
        well: [],
        supportSection: []
    },
    updateStatus: {
        geoFences: '',
        opticalSplitter: '',
        cited: '',
        citedSection: '',
        support: '',
        poleSection: '',
        poleRoad: '',
        pipe: '',
        pipeSection: '',
        business: '',
        cable: '',
        device: '',
        deviceRoom: '',
        error: '',
        lightRoad: '',
        pole: '',
        station: '',
        switchY: '',
        odf: '',
        well: '',
        supportSection: ''
    },
    zoomEvent: {
        showLabel: false
    },
    alertInfo: {},
    scale: false,
    allButtonStatus: true,
    mapStatus: false,
    mapv: true,
    loadingStatus: false,
    showLine: [],
    displayInMap: {},
    bar: {
        status: true
    },
    dragendPoint: {},
    showChangeAlert: false,
    keepCableShow: [],
    geoFencesList: []
}

const mutations = {
    setMapt: (state, status) => {
        state.mapProperty = {...state.mapProperty, mapt: status }
    },
    delGeoFences(state, index) {
        state.geoFencesList.splice(index, 1)
    },
    geoFencesListPush(state, info) {
        state.geoFencesList.push(info)
    },
    cleanAll(state, info) {
        state.showInMap[info] = []
    },
    setSecondaryObject(state, info) {
        state[info.key] = {...state[info.key], [info.secKey]: info.status }
            // Vue.set(state[info.key], info.secKey, info.status)
    },
    setZoomEvent(state, info) {
        state.zoomEvent = {...state.zoomEvent, [info.key]: info.info }
            // Vue.set(state.zoomEvent, info.key, info.info)
    },
    setMapProperty(state, info) {
        state.mapProperty = {...state.mapProperty, [info.key]: info.info }
    },
    setMapButtonStatus(state, status) {
        state.allButtonStatus = status
    },
    setMapStatus(state, status) {
        state[status.key] = status.status
    },
    deleteCardDisplay(state, status) {
        Vue.delete(state.inputSelect[status.keys].display, status.id)
    },
    setAllButtonStatus(state, status) {
        for (const key in state.buttonStatus) {
            state.buttonStatus = {...state.buttonStatus, [key]: status }
        }
    },
    setCoordinate(state, status) {
        state.showInMap.coordinate = status
    },
    setDefaultShow(state, status) {
        state.showInMap[status.name] = status.lines
        state.updateStatus[status.name] = Math.random()
            // state.showInMap = { ...state.showInMap, [status.name]: status.lines } // 优化性能
            // Vue.set(state.showInMap, status.name, status.lines) // store.watch 存在问题
    },
    setMapZoom(state, status) {
        state.mapProperty = {...state.mapProperty, zoom: status }
    },
    setMapCenter(state, status) {
        // 拦截不合法的请求
        if (!_.isEmpty(status) && ((status.lng && status.lat) || (status.x && status.y))) {
            // state.mapProperty.center = status
            // Vue.set(state.mapProperty, 'center', status)
            if (status.x && status.y) {
                state.mapProperty = {...state.mapProperty, center: { lng: status.x, lat: status.y } }
            } else {
                state.mapProperty = {...state.mapProperty, center: status }
            }
        }
    },
    updateKeepCableShow(state, status) {
        state.keepCableShow.push(status)
    },
    updateDisplayListConfig(state, status) {
        state.inputSelect[status.name].config = status.val
    },
    updateDisplayListArray(state, status) {
        state.inputSelect[status.name].display = status.val
    },
    updateDisplayList(state, status) {
        state.inputSelect[status.name].display = state.inputSelect[status.name].display || []
        if (status.val) {
            if (!state.inputSelect[status.name].display.length) {
                state.inputSelect[status.name].display.push(status.val)
            } else {
                for (const obj of state.inputSelect[status.name].display) {
                    if (obj.id.toString() !== status.val.id.toString()) {
                        state.inputSelect[status.name].display.push(status.val)
                    }
                }
            }
        }
    },
    setInputSelect(state, status) {
        state.inputSelect[status.name].selected = {...state.inputSelect[status.name].selected, ...status.val }
            // state.inputSelect[status.name].selected[status.name] = { ...state.inputSelect[status.name].selected[status.name], ...status.val }
    },
    setInputAddOne(state, status) {
        state.inputSelect[status.name] = {...state.inputSelect[status.name], ...status.val }
    },
    setButtonStatus(state, status) {

        state.buttonStatus = {...state.buttonStatus, ...status }
    },
    setDragendPoint(state, status) {
        state.dragendPoint = status
    },
    setShowChangeAlert(state, status) {
        state.showChangeAlert = status
    }
}

const getters = {
    getKeepCableShowById: (state) => state.keepCableShow.map(item => item.id),
    getCenterByBaidu: (state) => [state.mapProperty.center.lng, state.mapProperty.center.lat]
}

Vue.prototype.$baseUrl = state.detailsUrl

export default {
    state,
    mutations,
    getters
}