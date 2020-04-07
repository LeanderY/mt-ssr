export const state = () => ({
  menu: [],
  hotPlace: [],
  user: {}
})

export const mutations = {
  SET_MENU (state, val) {
    state.menu = val
  },
  SET_HOT_PLACE (state, val) {
    state.hotPlace = val
  },
  SET_USER: (state, val) => {
    state.user = val
  }
}

export const actions = {
  setMenu ({ commit }, menu) {
    commit('SET_MENU', menu)
  },
  setHotPlace: ({ commit }, hot) => {
    commit('SET_HOT_PLACE', hot)
  },
  setUser: ({ commit }, user) => {
    commit('SET_USER', user)
  }
}
