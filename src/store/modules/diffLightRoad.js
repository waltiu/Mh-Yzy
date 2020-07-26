import Vue from 'vue'
const state = {
  diffLoading: false,
  diffTime: '',
  diffLightRoadList: []
}

const mutations = {
  setDiffLightRoadStatus (state, info) {
    Vue.set(state, info.key, info.val)
  },
  pushDiffLightRoadList (state, info) {
    state.diffLightRoadList.push(info)
  },
  pushDiffLightRoadListSingle (state, info) {
    var list = state.diffLightRoadList
    Vue.set(state.diffLightRoadList, list.length - 1, [...list[list.length - 1], info])
  },
  delDiffLightRoad (state, num) {
    Vue.delete(state.diffLightRoadList, num)
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
