import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    selectedTemplate: null,
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
    },
    setSelectedTemplate(state, template) {
      state.selectedTemplate = template
    }
  },
  actions: {
    setIsLogin(context, isLogin) {
      context.commit('setIsLogin', isLogin)
    },
    setSelectedTemplate(context, template) {
      context.commit('setSelectedTemplate', template)
    }
  },
  modules: {
  }
})
