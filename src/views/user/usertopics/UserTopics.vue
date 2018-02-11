<template>
  <div class="Usertopics">
    <div class="Usertopics-paperbar">
      <div class="Usertopics-paper-left">
        <mu-icon-button icon="close" @click="back" slot="left"/>
      </div>
      <div class="Usertopics-paper-center">
        <span class="title">{{ title }} ( {{ length }} )</span>
      </div>
      <div class="Usertopics-paper-right">
        <mu-icon-button icon="" slot="right"/>
        <mu-icon-button icon="" slot="right"/>
      </div>
    </div>

    <div class="Usertopics-list">
      <user-topics-item v-for="topic in lists" :key="topic.id" :topic="topic"></user-topics-item>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import router from './../../../router/index'
import UserTopicsItem from './UserTopicsItem'
export default {
  name: 'UserTopics',
  components: {
    'user-topics-item': UserTopicsItem
  },
  data () {
    return {
      lists: [],
      title: '',
      length: 0
    }
  },
  created () {
    let type = this.$route.params.type
    switch (type) {
      case 'topic_collect':
        this.lists = this.user.topic_collect.data
        this.title = '我收藏的话题'
        this.length = this.TOPIC_COLLECT
        break
      case 'recent_topics':
        this.lists = this.user.userData.recent_topics
        this.title = '我最近的话题'
        this.length = this.RECENT_TOPICS
        break
      case 'recent_replies':
        this.lists = this.user.userData.recent_replies
        this.title = '我参与的话题'
        this.length = this.RECENT_REPLIES
        break
    }
  },
  methods: {
    back () {
      router.go(-1)
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    ...mapGetters([
      'RECENT_REPLIES',
      'RECENT_TOPICS',
      'TOPIC_COLLECT'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.Usertopics {
  width 100%
  height 100%
  position fixed
  top 0
  bottom 0
  left 0
  background #ffffff
  z-index 3
}

.Usertopics-paperbar {
  width 100%
  height 56px
  display flex
  position fixed
  top 0
  left 0
  color #ffffff
  padding 2px 0
  box-sizing border-box
  background #7e57c2
}

.Usertopics-paper-left {
  height 100%
  padding-top 3px
  box-sizing border-box
}

.Usertopics-paper-center {
  flex 3
  padding-left 6px
  padding-right 6px
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  overflow hidden
  font-size 20px
  font-weight 400
  line-height 56px
}

.Usertopics-paper-right {
  height 100%
  padding-top 3px
  box-sizing border-box
}

.Usertopics-list {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 0
  overflow-y auto
}
</style>
