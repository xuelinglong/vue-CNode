<template>
  <mu-paper>
    <mu-bottom-nav :value="common.bottomnav.active" @change="handleChange">
      <mu-bottom-nav-item value="topics" title="话题" to="/topics" icon="view_list"/>
      <mu-bottom-nav-item value="message" title="消息" to="/message" icon="note"/>
      <mu-bottom-nav-item value="push" title="发布" to="/push" icon="send"/>
      <mu-bottom-nav-item value="user" title="我的" to="/user" icon="face"/>
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
import * as type from './../../store/type'
import { mapState } from 'vuex'
export default {
  name: 'Bottomnav',
  computed: {
    ...mapState([
      'common'
    ])
  },
  methods: {
    handleChange (val) {
      this.$store.dispatch(type.HANDEL_CHANGE, {
        active: val
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mu-paper-1 {
  width 100%
  height 56px
  position fixed
  bottom 0
  left 0
  color #ffffff
  z-index 10
}
</style>
