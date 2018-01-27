import * as type from './type'
import axios from 'axios'

const getters = {
  [type.HASNOT_READ_MESSAGES] (state) {
    let arr = state.messageData.hasnot_read_messages
    if (arr) {
      return arr.length
    } else {
      return 0
    }
  },
  [type.HAS_READ_MESSAGES] (state) {
    let arr = state.messageData.has_read_messages
    if (arr) {
      return arr.length
    } else {
      return 0
    }
  }
}

const mutations = {
  [type.GET_MESSAGE_COUNT] (state, action) {
    state.count = action.data
  },
  [type.CLEAR_MESSAGESDATA] (state) {
    state.count = 0
    state.messageData = {
      has_read_messages: [],
      hasnot_read_messages: []
    }
  }
}

const actions = {
  [type.GET_MESSAGE_COUNT] (context, payload) {
    axios.get('message/count', {
      params: {
        accesstoken: payload.accesstoken
      }
    }).then(res => {
      context.commit(type.GET_MESSAGE_COUNT, {
        data: res.data
      })
    })
  },
  [type.CLEAR_MESSAGESDATA] (context) {
    context.commit(type.CLEAR_MESSAGESDATA)
  }
}

export default {
  state: {
    messageData: {
      has_read_messages: [],
      hasnot_read_messages: []
    },
    count: 0
  },
  getters,
  mutations,
  actions
}
