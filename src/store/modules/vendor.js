// import Vue from 'vue'
const state = {
    status: {},
    vendorName: {
        'transport': {
            name: '传输系统',
            alert: 'icon',
            map: 'transport',
            useType: 'item'
        },
        'opticalMultiplexer': {
            name: 'CRAN',
            alert: 'opticalMultiplexer',
            map: 'icon',
            type: 10,
            useType: 'item'
        },
        'geoFences': {
            name: 'vendorList.geoFences', // 地理围栏
            alert: 'geoFences',
            map: 'fences',
            useType: 'virtual'
        },
        'equipment': {
            name: 'vendorList.equipment', // 设备
            icon: 'device',
            alert: 'device',
            map: 'icon',
            type: 10,
            useType: 'item'
        },
        'well': {
            name: 'vendorList.well', // 井
            icon: 'well',
            type: 1,
            alert: 'well',
            map: 'icon',
            useType: 'bearer'
        },
        // fake machineRooms
        'machineRooms': {
            name: 'vendorList.machineRooms', // 机房
            icon: 'deviceRoom',
            alert: 'deviceRoom',
            map: 'icon',
            type: 5,
            useType: 'item'
        },
        'machineRoom': {
            name: 'vendorList.machineRoom', // 机房
            icon: 'deviceRoom',
            alert: 'deviceRoom',
            map: 'icon',
            type: 5,
            useType: 'item'
        },
        'odf': {
            name: 'vendorList.odf', // ODF
            type: 8,
            icon: 'odf',
            alert: 'odf',
            map: 'icon',
            useType: 'item'
        },
        'ledUp': {
            name: 'vendorList.ledUp', // 引上
            icon: 'cited',
            type: 3,
            alert: 'cited',
            map: 'icon',
            useType: 'bearer'
        },
        'ledUpLineSection': {
            name: 'vendorList.ledUpLineSection', // 引入段
            alert: 'citedSection',
            color: '#CC9933',
            map: 'section',
            useType: 'bearer'
        },
        'wellLineSection': {
            name: 'vendorList.wellLineSection', // 管道段
            icon: 'pipeSection',
            alert: 'pipeSection',
            color: 'green',
            map: 'section',
            useType: 'bearer'
        },
        'occ': {
            name: 'vendorList.occ', // 光交
            alert: 'switchY',
            type: 7,
            icon: 'switchY',
            map: 'icon',
            useType: 'item'
        },
        'oc': {
            name: 'vendorList.oc', // 光缆
            alert: 'cable',
            color: 'red',
            map: 'line',
            useType: 'item'
        },
        'supportLineSection': {
            alert: 'supportSection',
            name: 'vendorList.supportLineSection', // 挂墙段
            color: 'MAGENTA', // 粉色
            map: 'section',
            useType: 'bearer'
        },
        'pole': {
            alert: 'pole',
            name: 'vendorList.pole', // 电杆
            type: 2,
            icon: 'pole',
            map: 'icon',
            useType: 'bearer'
        },
        'station': {
            alert: 'station',
            name: 'vendorList.station', // 局站
            icon: 'station',
            map: 'icon',
            type: 6,
            useType: 'bearer'
        },
        'support': {
            alert: 'support',
            type: 9,
            name: 'vendorList.support', // 撑点
            icon: 'support',
            map: 'icon',
            useType: 'bearer'
        },
        'trouble': {
            alert: 'error',
            name: 'vendorList.error', // 故障
            icon: 'error',
            map: 'icon',
            useType: 'item'
        },
        // fake
        'pipe': {
            alert: 'pipe',
            name: 'vendorList.pipe', // 管道
            color: 'green',
            map: 'section',
            useType: 'bearer'
        },
        'business': {
            alert: 'business',
            name: 'vendorList.business', // 业务
            map: 'complex',
            useType: 'complex'
        },
        'lightPath': {
            alert: 'lightRoad',
            name: 'vendorList.lightPath', // 光路
            map: 'complex',
            useType: 'complex'
        },
        'poleRoad': {
            alert: 'poleRoad',
            name: 'vendorList.poleRoad', // 杆路
            color: 'blue',
            map: 'section',
            useType: 'bearer'
        },
        'poleLineSection': {
            alert: 'poleSection',
            name: 'vendorList.poleLineSection', // 杆路段
            color: 'blue',
            map: 'section',
            useType: 'bearer'
        },
        'opticalSplitter': {
            alert: 'opticalSplitter',
            name: 'vendorList.opticalSplitter', // 分光器
            icon: 'opticalSplitter',
            map: 'icon',
            type: 12,
            useType: 'item'
        }
    },
    drawType: {
        line: {}
    }
}

const getters = {
    vendorNameByName: (state) => {
        let row = state.vendorName
        let tmp = {}
        Object.entries(row).forEach(([key, val]) => {
            tmp[val.name] = {...val, vendor: key }
        })

        return tmp
    },
    // 属性联动
    vendorNameByType: (state) => {
        return Object.entries(state.vendorName).reduce((res, [key, val]) => {
            if (key !== 'machineRooms') {
                let tmp = val
                tmp = {...tmp, vendor: key }
                res[tmp.map] = res[tmp.map] ? [...res[tmp.map], tmp] : [tmp]
            }
            return res
        }, {})
    },
    vendorNameByTypeArray: (state) => {
        let row = state.vendorName
        let tmp = {}
        Object.entries(row).forEach(([key, val]) => {
            tmp[val.alert] = {...val, vendor: key }
        })
        return tmp
    },
    vendorNameByUseType: (state) => {
        return Object.entries(state.vendorName).reduce((res, [key, val]) => {
            if (key !== 'machineRooms') {
                res[val.useType] = res[val.useType] || []
                res[val.useType].push(val)
            }
            return res
        }, {})
    },
    vendorNameByTypeNumber: (state) => {
        return Object.entries(state.vendorName).reduce((res, [, val]) => {
            if (val.type) res[val.type] = val
            return res
        }, {})
    }
}

const mutations = {}

export default {
    state,
    getters,
    mutations
}