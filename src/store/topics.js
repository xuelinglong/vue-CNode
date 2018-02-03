import * as type from './type'
import axios from 'axios'

const getters = {
  [type.TOPICS_DATA_LENGTH] (state) {
    let arr = state.topicsdata
    if (arr) {
      return arr.length
    } else {
      return 0
    }
  }
}

const mutations = {
  [type.FETCH_TOPICS] (state, action) {
    state.topicsdata = action.data
  },
  [type.CLEAR_TOPICSDATA] (state) {
    state.topicsdata = []
  }
}

const actions = {
  [type.FETCH_TOPICS] (context, payload) {
    axios.get('topics', {
      params: {
        tab: payload.tab,
        page: payload.page,
        limit: payload.limit
      }
    }).then(res => {
      let DATA = res.data.data
      let arr = context.state.topicsdata.concat(DATA)
      context.commit(type.FETCH_TOPICS, {
        data: arr
      })
    })
  },
  [type.CLEAR_TOPICSDATA] (context) {
    context.commit(type.CLEAR_TOPICSDATA)
  }
}

export default {
  state: {
    topicsdata: []
  },
  getters,
  mutations,
  actions
}
