import * as type from './type'
import axios from 'axios'

const getters = {
  [type.REPLIES_COUNT] (state) {
    let arr = state.detailsData.replies
    if (arr) {
      return arr.length
    } else {
      return 0
    }
  }
}

const mutations = {
  [type.FETCH_TOPIC_DETAILS] (state, action) {
    state.detailsData = action.data
  },
  [type.COLLECT] (state, action) {
    state.collected = action.data
  },
  [type.DEL_COLLECTED] (state, action) {
    state.del_collect = action.data
  },
  [type.CLEAR_TOPIC_DETAILS] (state) {
    state.detailsData = {
      id: '',
      author_id: '',
      tab: '',
      content: '',
      title: '',
      last_reply_at: 0,
      good: false,
      top: false,
      reply_count: 0,
      visit_count: 0,
      create_at: '',
      author: {
        loginname: '',
        avatar_url: ''
      },
      replies: [],
      is_collect: false
    }
  }
}

const actions = {
  [type.FETCH_TOPIC_DETAILS] (context, payload) {
    axios.get('topic/' + payload.id, {
      params: {
        accesstoken: payload.accesstoken
      }
    }).then(res => {
      context.commit(type.FETCH_TOPIC_DETAILS, {
        data: res.data.data
      })
    })
  },
  [type.COLLECT] (context, payload) {
    axios.post('topic_collect/collect', {
      accesstoken: payload.accesstoken,
      topic_id: payload.topic_id
    }).then(res => {
      context.commit(type.COLLECT, {
        data: res.data.success
      })
      context.dispatch(type.FETCH_TOPIC_DETAILS, {
        accesstoken: payload.accesstoken,
        id: payload.topic_id
      })
      context.dispatch(type.FETCH_TOPIC_COLLECT, {
        loginname: payload.loginname
      })
    })
  },
  [type.DEL_COLLECTED] (context, payload) {
    axios.post('topic_collect/de_collect', {
      accesstoken: payload.accesstoken,
      topic_id: payload.topic_id
    }).then(res => {
      context.commit(type.DEL_COLLECTED, {
        data: res.data.success
      })
      context.dispatch(type.FETCH_TOPIC_DETAILS, {
        accesstoken: payload.accesstoken,
        id: payload.topic_id
      })
      context.dispatch(type.FETCH_TOPIC_COLLECT, {
        loginname: payload.loginname
      })
    })
  },
  [type.CLEAR_TOPIC_DETAILS] (context) {
    context.commit(type.CLEAR_TOPIC_DETAILS)
  }
}

export default {
  state: {
    detailsData: {
      id: '',
      author_id: '',
      tab: '',
      content: '',
      title: '',
      last_reply_at: 0,
      good: false,
      top: false,
      reply_count: 0,
      visit_count: 0,
      create_at: '',
      author: {
        loginname: '',
        avatar_url: ''
      },
      replies: [],
      is_collect: false
    },
    collect: false,
    del_collected: false
  },
  getters,
  mutations,
  actions
}
