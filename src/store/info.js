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
    state.collect = action.data
  },
  [type.DEL_COLLECTED] (state, action) {
    state.del_collected = action.data
  },
  [type.REPLY_UPS] (state, action) {
    state.ups = action.data
  },
  [type.SHOW_REPLIES_EDIT] (state) {
    state.showreplies = !state.showreplies
  },
  [type.SAVE_REPLY_ID] (state, action) {
    state.reply_toComment_id = action.data
  },
  [type.CLEAR_REPLY_ID] (state) {
    state.reply_toComment_id = ''
  },
  [type.REPLY_PUSH] (state, action) {
    state.replyedit = action.data
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
    state.collect = false
    state.del_collected = false
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
  [type.REPLY_UPS] (context, payload) {
    axios.post('reply/' + payload.reply_id + '/ups', {
      accesstoken: payload.accesstoken
    }).then(res => {
      context.commit(type.REPLY_UPS, {
        data: res.data.success
      })
      context.dispatch(type.FETCH_TOPIC_DETAILS, {
        accesstoken: payload.accesstoken,
        id: payload.topic_id
      })
    })
  },
  [type.SHOW_REPLIES_EDIT] (context) {
    context.commit(type.SHOW_REPLIES_EDIT)
  },
  [type.SAVE_REPLY_ID] (context, payload) {
    context.commit(type.SAVE_REPLY_ID, {
      data: payload.reply_id
    })
  },
  [type.CLEAR_REPLY_ID] (context) {
    context.commit(type.CLEAR_REPLY_ID)
  },
  [type.REPLY_PUSH] (context, payload) {
    axios.post('topic/' + payload.topic_id + '/replies', {
      accesstoken: payload.accesstoken,
      content: payload.content,
      reply_id: payload.reply_id
    }).then(res => {
      context.commit(type.REPLY_PUSH, {
        data: res.data
      })
      context.dispatch(type.FETCH_TOPIC_DETAILS, {
        accesstoken: payload.accesstoken,
        id: payload.topic_id
      })
      context.commit(type.CLEAR_REPLY_ID)
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
    del_collected: false,
    ups: false,
    showreplies: false,
    replyedit: {
      success: '',
      reply_id: ''
    },
    reply_toComment_id: ''
  },
  getters,
  mutations,
  actions
}
