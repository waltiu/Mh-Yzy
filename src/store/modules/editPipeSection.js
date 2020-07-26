import Vue from 'vue'

// editPipeSection
const state = {
  new: {},
  wellName: [],
  lines: [],
  pipeSection: [],
  newString: {
    lajibaidumap: []
  }
}

const mutations = {
  setInfo (state, status) {
    state.new = status
  },
  cleanEditPipeSectionStatus (state) {
    for (const key in state) {
      state = { ...state, [key]: [] }
    }
  },
  delLinesObj (state, id) {
    Vue.delete(state.lines, id)
  },
  setWellName (state, status) {
    state.wellName = status
  },
  setLineBindWell (state, status) {
    // status 坐标
    Vue.set(state.lines, state.newString.editIndex, status)
    state.newString.lajibaidumap.splice(state.newString.editIndex, 0, status)
  },
  newString (state, status) {
    Vue.set(state.newString, status.key, status.val)
  },
  setLine (state, status) {
    state.lines = status
  },
  setPipeSectionName (state, status) {
    var targetIndex = null
    for (const index in state.pipeSection) {
      if (state.pipeSection[index].id === status.id) {
        targetIndex = index
      }
    }
    Vue.set(state.pipeSection, targetIndex, {
      ...state.pipeSection[targetIndex],
      id: status.id,
      name: status.value
    })
  },
  setPipeSection (state, status) {
    state.pipeSection = status
  }
}

const getters = {
  // pipeSection: state => {
  //   var tmp = []
  //   var length = state.wellName.length
  //   for (let index = 0; index < length - 1; index++) {
  //     tmp.push({
  //       name: state.wellName[index].name + ' - ' + state.wellName[index + 1].name + '管道段',
  //       id: state.wellName[index].id
  //     })
  //   }
  //   return tmp
  // }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
