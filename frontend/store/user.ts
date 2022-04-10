import Vuex from 'vuex'
import backendApiConnection from '../api/backendApiConnection'
import Cookie from 'js-cookie'
import User from '../../backend/models/User'
export const state = () => ({
  info: {},
  token: '',
})

export const mutations = {
  setUser(state: { info: any; token: any }, data: { user: any; idToken: any }) {
    state.info = data.user
    state.token = data.idToken
  },
  logout(state: { info: {}; token: string }) {
    console.log('entro aquii')
    state.info = {}
    state.token = ''
  },
  updateUser(state: { info: any; token: any }, data: any) {
    state.info.first_name = data.first_name
    state.info.last_name = data.last_name
    state.info.bio = data.bio
    state.info.dob = data.dob
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
      console.log('----4')
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
