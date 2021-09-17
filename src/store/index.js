import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    setIsLogin(context, isLogin) {
      context.commit('setIsLogin', isLogin)
    }
  },
  modules: {
  }
})
