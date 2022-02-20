import Vuex from 'vuex'
import backendApiConnection from '../api/backendApiConnection'
import Cookie from 'js-cookie'
import User from '../../backend/models/User'
export const state = () => ({
  user: {},
  token: '',
})

export const mutations = {
  setUser(state: { user: any; token: any }, data: { user: any; idToken: any }) {
    state.user = data.user
    state.token = data.idToken
  },
  logout(state: { user: {}; token: string }) {
    state.user = {}
    state.token = ''
  },
}

export const actions = {
  async login({ commit }: any, user: any) {
    try {
      const { data } = await backendApiConnection.post('user/login', user)
      localStorage.setItem('token', data.idToken)
      Cookie.set('token', data.idToken)
      commit('setUser', data)
      return { ok: true }
    } catch (error: any) {
      console.log(error)
      return { ok: false, message: error.response.data.message }
    }
  },
  async register({ commit }: any, user: any) {
    try {
      const { data } = await backendApiConnection.post('user/register', user)
      return { ok: true }
    } catch (error: any) {
      return { ok: false, message: error.response.data.message }
    }
  },
  logout({ commit }: any) {
    localStorage.removeItem('token')
    localStorage.removeItem('vuex')
    Cookie.remove('token')
    commit('logout')
  },
}

export const getters = {
  getUser(state: { user: User }) {
    return state.user
  },
  getToken(state: { token: string }) {
    return state.token
  },
  isAuthenticated(state: { token: string }) {
    return state.token !== ''
  },
}
