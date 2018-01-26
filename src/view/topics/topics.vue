<template>
  <div class="topics">
    <div class="tab">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="all" title="全部"/>
        <mu-tab value="good" title="精华"/>
        <mu-tab value="share" title="分享"/>
        <mu-tab value="ask" title="问答"/>
        <mu-tab value="job" title="招聘"/>
        <mu-tab value="dev" title="测试帖"/>
      </mu-tabs>
    </div>

    <div class="contentlist">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="loadTop"/>
      <v-contentitem v-for="topic in topics.topicsdata" :key="topic.id" :topic="topic"></v-contentitem>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="正在加载..."/>
    </div>

  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState } from 'vuex'
import Contentitem from './../../components/contentitem/contentitem'
let tabName = 'all'
export default {
  name: 'Topics',
  data () {
    return {
      activeTab: tabName,
      page: 0,
      refreshing: false,
      trigger: null,
      loading: false,
      scroller: null
    }
  },
  components: {
    'v-contentitem': Contentitem
  },
  computed: {
    ...mapState([
      'topics'
    ])
  },
  created () {
    this.fetchtopics('all', 0, 20)
    this.page = 1
  },
  mounted () {
    this.trigger = this.$el
    this.scroller = this.$el
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
      tabName = val
      this.$store.dispatch(type.CLEAR_TOPICSDATA)
      switch (val) {
        case 'all':
          this.fetchtopics('all', 0, 20)
          break
        case 'good':
          this.fetchtopics('good', 0, 20)
          break
        case 'share':
          this.fetchtopics('share', 0, 20)
          break
        case 'ask':
          this.fetchtopics('ask', 0, 20)
          break
        case 'job':
          this.fetchtopics('job', 0, 20)
          break
        case 'dev':
          this.fetchtopics('dev', 0, 20)
          break
      }
    },
    fetchtopics (tab, page, limit) {
      this.$store.dispatch(type.FETCH_TOPICS, {
        tab, page, limit
      })
    },
    loadTop () {
      this.refreshing = true
      this.$store.dispatch(type.CLEAR_TOPICSDATA)
      setTimeout(() => {
        this.fetchtopics(this.activeTab, 0, 20)
        this.page = 1
        this.refreshing = false
      }, 2000)
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        this.page += 1
        this.fetchtopics(this.activeTab, this.page, 20)
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.topics {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 56px
  overflow-y auto
  background #f0f0f0
}

.tab {
  width 100%
}

.contentlist {
  width 100%
  position fixed
  top 104px
  left 0
  bottom 56px
  overflow-y auto
}
</style>
