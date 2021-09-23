import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    selectedTemplate: null,
    vendorCode: null,
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
    }
  },
  modules: {
  }
})
