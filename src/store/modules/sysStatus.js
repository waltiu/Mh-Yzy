// import Vue from 'vue'
const state = {
  httpErr: {}
}

const mutations = {
  setSysStatus (state, { info, key }) {
    state[key] = info
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
