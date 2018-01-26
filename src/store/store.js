import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import topics from './topics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    topics
  }
})
