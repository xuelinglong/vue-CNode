import * as type from './type'
import axios from 'axios'

const mutations = {
  [type.PUSH_NEW_TOPIC] (state, action) {
    state.newTopic = action.data
  }
}

const actions = {
  [type.PUSH_NEW_TOPIC] (context, payload) {
    axios.post('topics', {
      accesstoken: payload.accesstoken,
      title: payload.title,
      tab: payload.tab,
      content: payload.content
    }).then(res => {
      context.commit(type.PUSH_NEW_TOPIC, {
        data: res.data
      })
      context.dispatch(type.FETCH_USERDATA, {
        loginname: payload.loginname
      })
    })
  }
}

export default {
  state: {
    newTopic: {
      success: false,
      topic_id: ''
    }
  },
  mutations,
  actions
}
