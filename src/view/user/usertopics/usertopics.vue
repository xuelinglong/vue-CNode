<template>
  <div class="usertopics">
    <mu-appbar :title="this.title + ' (' + this.length + ')'">
      <mu-icon-button icon="close" @click="back" slot="left"/>
      <div slot="content">{{ this.title }}({{ this.length }})</div>
      <mu-icon-button icon="" slot="right" />
    </mu-appbar>

    <div class="list">
      <v-usertopicitem v-for="topic in lists" :key="topic.id" :topic="topic"></v-usertopicitem>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import router from './../../../router/index'
import Usertopicitem from './../../../components/usertopicitem/usertopicitem'
export default {
  name: 'Usertopics',
  data () {
    return {
      lists: [],
      title: '',
      length: 0
    }
  },
  components: {
    'v-usertopicitem': Usertopicitem
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.usertopics {
  width 100%
  height 100%
  position fixed
  top 0
  bottom 0
  left 0
  background #ffffff
  z-index 3
}

.mu-appbar {
  width 100%
  height 56px
  position fixed
  top 0
  left 0
}

.list {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 0
  overflow-y auto
}
</style>
