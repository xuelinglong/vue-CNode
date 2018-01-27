<template>
  <div class="usertopics">
    <mu-appbar :title="this.$route.params.title + ' (' + this.length + ')'">
      <mu-icon-button icon="close" @click="back" slot="left"/>
    </mu-appbar>

    <div class="list">
      <v-contentitem v-for="topic in lists" :key="topic.id" :topic="topic"></v-contentitem>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import router from './../../../router/index'
import Contentitem from './../../../components/contentitem/contentitem'
export default {
  name: 'Usertopics',
  data () {
    return {
      lists: [],
      length: 0
    }
  },
  components: {
    'v-contentitem': Contentitem
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
        this.length = this.TOPIC_COLLECT
        break
      case 'recent_topics':
        this.lists = this.user.userData.data.recent_topics
        this.length = this.RECENT_TOPICS
        break
      case 'recent_replies':
        this.lists = this.user.userData.data.recent_replies
        this.length = this.RECENT_REPLIES
        break
    }
  },
  methods: {
    back () {
      router.back()
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
  z-index 10
}

.list {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 0
  overflow-y auto
  z-index 10
}
</style>
