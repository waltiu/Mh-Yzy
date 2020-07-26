// import Vue from 'vue'
const state = {
  status: {},
  uploadFileOK: '',
  ableToDO: '',
  inAndOut: '',
  baUpdate: false,
  selection: []
}

const mutations = {
  getBaUpdate (state, info) {
    state.baUpdate = info
  },
  uploadFileOK (state) {
    state.uploadFileOK = Date.parse(new Date())
  },
  getAbleToDO (state, info) {
    state.ableToDO = info
  },
  getInAndOut (state, info) {
    state.inAndOut = info
  },
  getSelection (state, info) {
    state.selection = info
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
