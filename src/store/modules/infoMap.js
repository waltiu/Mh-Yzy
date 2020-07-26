import Vue from 'vue'

const state = {
  mapButton: {
    operating: true,
    editPipeSection: false
  },
  pluginStatus: {
    lines: false,
    points: false,
    wellAndPole: false
  },
  laying: {},
  lines: []
}

const mutations = {
  setLaying (state, info) {
    state.laying = info
  },
  setMapCable (state, status) {
    state.lines = status
  },
  updateMapCable (state, status) {
    state.lines = [...state.lines, status]
  },
  setPluginStatus (state, status) {
    Vue.set(state.pluginStatus, status.key, status.status)
  },
  undoLines (state) {
    state.lines.pop()
  },
  resetAddLines (state) {
    state.lines = []
    state.pluginStatus.lines = false
    state.pluginStatus.points = false
  }
}

const getters = {
  getAddLines: (state) => {
    var tmpLines = []
    var tmpInfo = []
    state.lines.map(res => {
      tmpLines.push({
        lat: res.lat,
        lng: res.lng
      })
      tmpInfo.push({
        id: res.id,
        length: res.length
      })
    })
    return {
      lines: tmpLines,
      info: tmpInfo
    }
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
