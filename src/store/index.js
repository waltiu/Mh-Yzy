import Vue from 'vue'
import Vuex from 'vuex'
import searchPlugin from 'vuex-search'

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules,
    // 定义状态
    state: {
        drawArray: "",
        deleteFransh: false,
        mapDetailEdit: false,
        mapEditInfo: null,
        gefencesState: false,
        outLineLoadedData: [],
        // 默认不允许拖拽mark
        draggable: false,
        token: {
            'x-auth-token': ''
        },
        rowDictionaries: [],
        preDictionaries: [
            // 增加服务端不重要的枚举信息
            {
                preData: true,
                code: 'gllx',
                id: '8888',
                name: '光路类型',
                parentId: '0',
                type: '光路类型'
            },
            {
                preData: true,
                code: 'PTN',
                id: '88881',
                name: 'PTN',
                parentId: '8888',
                type: '光路类型'
            },
            {
                preData: true,
                code: 'OLP',
                id: '88882',
                name: 'OLP',
                parentId: '8888',
                type: '光路类型'
            },
            {
                preData: true,
                code: 'SDH',
                id: '88883',
                name: 'SDH',
                parentId: '8888',
                type: '光路类型'
            },
            {
                preData: true,
                code: '分光器上联',
                id: '88884',
                name: '分光器上联',
                parentId: '8888',
                type: '光路类型'
            },
            {
                preData: true,
                code: 'glqs',
                id: '9999',
                name: '光路纤数',
                parentId: '0',
                type: '光路纤数'
            },
            {
                preData: true,
                code: '单芯',
                id: '99992',
                name: '单芯',
                parentId: '9999',
                type: '光路纤数'
            },
            {
                preData: true,
                code: '双芯',
                id: '99991',
                name: '双芯',
                parentId: '9999',
                type: '光路纤数'
            }
        ],
        userInfos: {},
        // base64icons
        icons: {},
        // 扩展属性
        rowProperties: {},
        // 用户组
        groups: {},
        settings: {},
    },
    mutations: {
        // 准备废弃
        changeDrawArray: (state, info) => {

            state.drawArray = info
        },
        setgefencesState: (state, info) => {
            state.gefencesState = info
        },
        mapEditInfoUpdate: (state, info) => {
            state.mapEditInfo = info
        },
        deleteFranshTf: (state, info) => {
            state.deleteFransh = info
        },
        mapDetailEditChange: (state, info) => {
            state.mapDetailEdit = info
        },
        setIsOutLineLoadedData: (state, info) => {
            state.outLineLoadedData = info
        },
        // 准备废弃
        setDraggable: (state, info) => {
            state.draggable = info
        },
        setToken: (state, info) => {
            window.sessionStorage.setItem('token', info)
            state.token['x-auth-token'] = info
        },
        setUserInfos: (state, info) => {
            window.sessionStorage.setItem('other', JSON.stringify(info))
            state.userInfos = info
        },
        setRowDictionaries: (state, info) => {
            state.rowDictionaries = [...state.preDictionaries, ...info]
        },
        setIcons: (state, info) => {
            state.icons[info.key] = info.data
        },
        setSettings: (state, info) => {
            state.settings = info.reduce((res, val) => {
                res[val.key] = val
                return res
            }, {})
        }
    },
    getters: {
        loginToken: (state) => {
            return state.token['x-auth-token'] ? state.token['x-auth-token'] : window.sessionStorage['token']
        },
        getCityList: (state) => {
            if (state.settings.city) {
                return state.settings.city.valueJson.provinces
            }
            return []
        },
        getUserRole: (state) => {
            var tmp = []
            if (state.userInfos.sysAuthList) {
                for (const key of state.userInfos.sysAuthList) {
                    tmp.push(key.code)
                }
            }
            if (tmp.includes('fgqgdgl.sgryxz')) {
                tmp.push('yhgl.c')
            }
            return tmp
        },
        // 属性联动
        getObjByType: (state) => {
            var row = state.rowDictionaries
                // 对应children
            var child = {}
            for (const b in row) {
                if (row[b].parentId === '0') {
                    child[row[b].type] = []
                }
            }
            for (const b in row) {
                if (row[b].parentId.toString() !== '0') {
                    child[row[b].type].push(row[b])
                }
            }
            return child
        },
        getObjByCode: (state) => {
            var row = state.rowDictionaries
                // 对应children
            var child = {}
            for (const key in row) {
                child[row[key].code] = row[key]
            }
            return child
        }
    },
    plugins: [
        searchPlugin({
            resources: {
                transferSystem: {
                    // what fields to index
                    index: ['name'],
                    // access the state to be watched by Vuex Search
                    getter: state => state.transferSystem.transferSystem,
                    // how resource should be watched
                    watch: { delay: 500 }
                }
                // otherResource: { index, getter, watch, searchApi },
            }
        })
    ]
})

export default store