import * as type from './type'

const mutations = {
  [type.HANDEL_CHANGE] (state, action) {
    state.bottomnav.active = action.data
    switch (action.data) {
      case 'topics':
        state.appbar.title = '话题'
        break
      case 'message':
        state.appbar.title = '消息'
        break
      case 'push':
        state.appbar.title = '发布'
        break
      case 'user':
        state.appbar.title = '我的'
        break
    }
  }
}

const actions = {
  [type.HANDEL_CHANGE] (context, payload) {
    context.commit(type.HANDEL_CHANGE, {
      data: payload.active
    })
  }
}

export default {
  state: {
    // tabbar
    bottomnav: {
      active: 'topics'
    },
    // appbar
    appbar: {
      title: '话题'
    }
  },
  mutations,
  actions
}
