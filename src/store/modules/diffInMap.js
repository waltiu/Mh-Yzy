import Vue from 'vue'
import _ from 'lodash'

const state = {
  rawData: {},
  status: {}
}

const mutations = {
  setTmpString (state, info) {
    Vue.set(state.status, info.key, info.val)
  },
  setDiffInfo (state, info) {
    if (_.isObject(info)) {
      state.rawData = [info]
    } else {
      state.rawData = info
    }
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
