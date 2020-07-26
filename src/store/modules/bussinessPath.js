import Vue from 'vue'
const state = {
  edit: false,
  linkInfo: {},
  row: {}
}

const mutations = {
  setBussinessPathStatus (state, info) {
    Vue.set(state, info.key, info.val)
  },
  setBussinessPathLinkInfo (state, info) {
    state.linkInfo = info.linkInfo || {}
    state.row = info
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
