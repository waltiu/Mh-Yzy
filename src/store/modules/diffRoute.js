import Vue from 'vue'
const state = {
  diffLoading: false,
  diffTime: '',
  diffRouteList: []
}

const mutations = {
  setDiffRouteStatus (state, info) {
    Vue.set(state, info.key, info.val)
  },
  pushDiffList (state, info) {
    state.diffRouteList.push(info)
  },
  pushDiffListSingle (state, info) {
    var list = state.diffRouteList
    Vue.set(state.diffRouteList, list.length - 1, [...list[list.length - 1], info])
  },
  delGroup (state, num) {
    Vue.delete(state.diffRouteList, num)
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
