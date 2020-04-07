export const state = () => ({
  city: '滁州'
})

export const mutations = {
  SET_CITY (state, city) {
    state.city = city
  }
}

// {commit} 是对象解构赋值，因为action里面的方法默认接受一个参数context，
export const actions = {
  setCity ({ commit }, position) {
    commit('SET_CITY', position)
  }
}
