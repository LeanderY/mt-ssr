
import cookieToJson from '../server/utils/cookie'

export const actions = {
  // 没有dom对象也没有this实例，该请求在控制台不可见
  async nuxtServerInit ({ commit }, { req, app }) {
    // city
    const city = app.store.state.geo.city
    commit('geo/SET_CITY', cookieToJson(req, 'city'))

    const { menu } = await app.$axios.get('geo/menu')
    commit('home/SET_MENU', menu)
    //
    const { hot } = await app.$axios.get('search/hot', {
      params: {
        city,
        type: 'food'
      }
    })
    commit('home/SET_HOT_PLACE', hot)
  }
}
