import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    selectedTemplate: null,
    vendorCode: null,
    email: null,
    tryAccess: false,
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
    },
    setSelectedTemplate(state, template) {
      state.selectedTemplate = template
    },
    setVendorCode(state, code) {
      state.vendorCode = code;
    },
    setTryAccess(state, tryAccess) {
      state.tryAccess = tryAccess;
    },
    setEmail(state, email) {
      state.email = email;
    }
  },
  actions: {
    setIsLogin(context, isLogin) {
      context.commit('setIsLogin', isLogin)
    },
    setSelectedTemplate(context, template) {
      context.commit('setSelectedTemplate', template)
    },
    setVendorCode(context, code) {
      context.commit('setVendorCode', code)
    },
    setTryAccess(context, tryAccess) {
      context.commit('setTryAccess', tryAccess)
    },
    setEmail(context, email) {
      context.commit('setEmail', email)
    }
  },
  modules: {
  }
})
