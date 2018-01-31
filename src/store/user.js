import * as type from './type'
import axios from 'axios'

const getters = {
  [type.RECENT_REPLIES] (state) {
    let arr = state.userData.recent_replies
    if (arr) {
      return arr.length
    } else {
      return 0
    }
  },
  [type.RECENT_TOPICS] (state) {
    let arr = state.userData.recent_topics
    if (arr) {
      return arr.length
    } else {
      return 0
    }
  },
  [type.TOPIC_COLLECT] (state) {
    let arr = state.topic_collect.data
    if (arr) {
      return arr.length
    } else {
      return 0
    }
  }
}

const mutations = {
  [type.FETCH_USERDATA] (state, action) {
    state.userData = action.data
  },
  [type.FETCH_TOPIC_COLLECT] (state, action) {
    state.topic_collect = action.data
  },
  [type.CLEAR_USERDATA] (state) {
    state.userData = {
      loginname: '',
      avatarurl: '',
      githubUsername: '',
      reate_at: '',
      score: 0,
      recent_topics: [],
      recent_replies: []
    }
    state.topic_collect = []
  }
}

const actions = {
  [type.FETCH_USERDATA] (context, payload) {
    axios.get('user/' + payload.loginname, {
      params: {
        loginname: payload.loginname
      }
    }).then(res => {
      context.commit(type.FETCH_USERDATA, {
        data: res.data.data
      })
    })
  },
  [type.FETCH_TOPIC_COLLECT] (context, payload) {
    axios.get('topic_collect/' + payload.loginname, {
      params: {
        loginname: payload.loginname
      }
    }).then(res => {
      context.commit(type.FETCH_TOPIC_COLLECT, {
        data: res.data
      })
    })
  },
  [type.CLEAR_USERDATA] (context) {
    context.commit(type.CLEAR_USERDATA)
  }
}

export default {
  state: {
    userData: {
      loginname: '',
      avatarurl: '',
      githubUsername: '',
      reate_at: '',
      score: 0,
      recent_topics: [],
      recent_replies: []
    },
    topic_collect: []
  },
  getters,
  mutations,
  actions
}
