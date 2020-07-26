import _ from 'lodash'
import Vue from 'vue'

const state = {
  info: {},
  jumpInfo: {},
  status: {}
}

const mutations = {
  setLightRoad (state, info) {
    state[info.key] = info.status
  },
  setLightRoadJumpInfo (state, info) {
    state.jumpInfo = info
  },
  setLightRoadNodeInfo (state, { node, point, info }) {
    Vue.set(state.jumpInfo.node[node], point, info)
  }
}

const getters = {
  lightRoadCoreNum: (state) => {
    if (!_.isEmpty(state.info)) {
      if (state.info.coreNum === '双芯') {
        return 2
      } else {
        return 1
      }
    } else {
      return 0
    }
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
