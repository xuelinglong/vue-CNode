import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import topics from './topics'
import user from './user'
import messages from './messages'
import push from './push'
import info from './info'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    topics,
    user,
    messages,
    push,
    info,
    login
  }
})
