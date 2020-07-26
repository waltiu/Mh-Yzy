import Vue from 'vue'

const state = {
  all: {},
  jump: {},
  editStatus: true
}

const mutations = {
  setDefaultLightRoad (state) {
    // 模板
    var info = {
      jumperInfo: {
        'end': {
          'id': '0',
          'po': 'PTN',
          'type': '10',
          'portA': '新设备'
        },
        'node': [
          [{
            'id': '',
            'name': '',
            'type': '0'
          }, {
            'id': '0',
            'name': '新设备',
            'type': 8888,
            'portA': '',
            'portB': '',
            'jumpType': '',
            'portAJump': '',
            'portBJump': ''
          }, {
            'id': '',
            'name': '',
            'type': '0'
          }]
        ],
        'start': {
          'id': '27',
          'po': 'PTN',
          'type': '10',
          'portA': '新设备'
        }
      }
    }
    state.all = info
    state.jump = info.jumperInfo || {}
  },
  setStartEndInfo (state, { type, info }) {
    // 开始结束的线信息
    Vue.set(state.jump, type, info)
  },
  changeJumpPoint (state, { node, point, info }) {
    Vue.set(state.jump.node[node], point, info)
  },
  delJumpPoint (state, { node, point }) {
    // node 第几层节点
    // point 第几个
    Vue.delete(state.jump.node[node], point)
    // 删除后id前移, 删除默认
    Vue.delete(state.jump.node[node], point)
  },
  addJumpPoint (state, { node, point }) {
    // node 第几层节点
    // point 第几个之后
    // info 节点信息
    // 插入数据
    // 默认插入一个线段
    state.jump.node[node].splice(Number(point) + 1, 0, ...[{
      id: '',
      name: '新增设备',
      portA: '',
      portAJump: '',
      portB: '',
      portBJump: '',
      type: 8888,
      jumpType: 'room'
    }, {
      id: '',
      name: '新增光缆',
      type: 0
    }])
  },
  setLightValue (state, info) {
    Vue.set(state, info.key, info.status)
  },
  setAll (state, info) {
    state.all = info
    state.jump = info.jumperInfo || {}
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
