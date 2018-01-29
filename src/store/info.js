import * as type from './type'
import axios from 'axios'

const mutations = {
  [type.FETCH_TOPIC_DETAILS] (state, action) {
    state.detailsData = action.data
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
    }
  },
  mutations,
  actions
}
