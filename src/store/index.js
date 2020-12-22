import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    access_token: localStorage.getItem('access_token') || '',
    refresh_token: localStorage.getItem('refresh_token') || '',
    username: '',
    groups: []
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token){
      state.status = 'success'
      state.refresh_token = token.refresh
      state.access_token = token.access
    },
    auth_failed(state){
      state.status = 'failed'
      state.refresh_token = ''
      state.access_token = ''
      state.username = ''
    },
    new_access(state, access_token){
      state.status = 'success'
      state.access_token = access_token
    },
    whoami(state, data){
      state.username = data
    },
    user_logout(state){
      state.status = ''
      state.refresh_token = ''
      state.access_token = ''
      state.username = ''
    },
    group_list(state, data){
      state.groups = data
    }
  },
  actions: {
    login({commit, dispatch}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        delete axios.defaults.headers.common['Authorization']
        axios({url: 'http://127.0.0.1:9000/auth/login/', data: user, method: 'POST'})
        .then(resp => {
          const refresh = resp.data.token.refresh
          const access = resp.data.token.access
          localStorage.setItem('refresh_token', refresh)
          localStorage.setItem('access_token', access)
          commit('auth_success', resp.data.token)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + access
          dispatch('cur_user')
          resolve(resp)
        })
        .catch(err => {
          commit('auth_failed')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('access_token')
          reject(err)
        })
      })
    },
    token_refresh({commit, dispatch}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        delete axios.defaults.headers.common['Authorization']
        let refresh = localStorage.getItem('refresh_token')
        axios({url: 'http://127.0.0.1:9000/auth/token/refresh/', data: {refresh}, method: 'POST'})
        .then(resp => {
          const access = resp.data.access
          localStorage.setItem('access_token', access)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + access
          commit('new_access', access)
          dispatch('cur_user')
          resolve(resp)
        })
        .catch(err => {
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('access_token')
          commit('auth_failed')
          reject(err)
        })
      })
    },
    cur_user({commit}){
      return new Promise((resolve, reject) => {
        axios({url: 'http://127.0.0.1:9000/auth/me/', method: 'GET'})
        .then(resp => {
          const user_data = resp.data.username
          commit('whoami', user_data)
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit('whoami', {username: 'guest'})
          reject(err)
        })
      })
    },
    logout({commit, state}){
      return new Promise((resolve, reject) => {
        const refresh_token = state.refresh_token
        axios({url: 'http://127.0.0.1:9000/auth/logout/', data: { refresh_token }, method: 'POST'})
        .then(resp => {
          commit('user_logout')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          delete axios.defaults.headers.common['Authorization']
          resolve(resp)
        })
        .catch(err => {
          commit('user_logout')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          delete axios.defaults.headers.common['Authorization']
          console.log(err)
          reject(err)
        })
      })
    },
    group_count({commit}){
      return new Promise((resolve, reject) => {
        axios({url: 'http://127.0.0.1:9000/sell/groups/', method: 'GET'})
        .then(resp => {
          let groups = resp.data
          commit('group_list', groups)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    }

  },
  getters:{
    isLoggedIn: state => {
      return state.status === 'success' || state.username !== ''
    },
    userNotFetched: state => {
      return (state.status !== 'success' && state.access_token !== '')
    }
  },
  modules: {
  }
})
