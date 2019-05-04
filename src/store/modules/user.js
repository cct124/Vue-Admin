import {
  localsave,
  localfetch,
  sessionsave
} from '../../api/access'

export default {
  state: {
    loginFrom: {
      username: '',
      password: ''
    },
    pass: false,
    userInfo: []
  },
  mutations: {
    verification(state) {
      var date = localfetch("userInfo") || [];
      if (
        !!date.find((item) => {
          if (item.username == state.loginFrom.username && item.password == state.loginFrom.password) {
            return true
          } else {
            return false
          }
        })
      ) {
        state.pass = true;
        sessionsave('Logininformation', state.pass);
        state.loginFrom.username = '';
        state.loginFrom.password = '';
      }
    },
    inputuser(state, payload) {
      state.loginFrom.username = payload.username;
      state.loginFrom.password = payload.password;
    },
    defaultPass(state) {
      state.pass = false
    }
  },
  actions: {
    verification(context) {
      context.commit('verification')
    },
    inputuser(context, payload) {
      context.commit('inputuser', payload);
    },
    localSave(context, payload) {
      context.state.userInfo = localfetch('userInfo') || [];
      context.state.userInfo.push({
        username: payload.username,
        password: payload.password
      })
      localsave('userInfo', context.state.userInfo)
    }
  }
}
