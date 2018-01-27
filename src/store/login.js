import * as type from './type'
import axios from 'axios'

const mutations = {
  [type.LOGIN] (state, action) {
    state.loginData = action.data
  },
  [type.LOGINOUT] (state) {
    state.loginData = {
      avatarurl: '',
      id: '',
      loginname: '',
      success: false
    }
  }
}

const actions = {
  [type.LOGIN] (context, payload) {
    axios.post('accesstoken', {
      accesstoken: payload.accesstoken
    }).then(res => {
      context.commit(type.LOGIN, {
        data: res.data
      })
      context.dispatch(type.FETCH_USERDATA, {
        loginname: res.data.loginname
      })
      context.dispatch(type.FETCH_TOPIC_COLLECT, {
        loginname: res.data.loginname
      })
    })
  },
  [type.LOGINOUT] (context) {
    context.commit(type.LOGINOUT)
    context.commit(type.CLEAR_USERDATA)
    context.commit(type.CLEAR_MESSAGESDATA)
  }
}

export default {
  state: {
    loginData: {
      avatarurl: '',
      id: '',
      loginname: '',
      success: false
    }
  },
  mutations,
  actions
}
