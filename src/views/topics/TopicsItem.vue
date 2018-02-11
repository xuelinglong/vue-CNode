<template>
  <div class="TopicsItem">
    <router-link :to="{name: 'details', params: {id: topic.id}}">
      <div class="TopicsItem-top-box">
        <div class="TopicsItem-author-img">
          <img class="TopicsItem-author" :src="topic.author.avatar_url" />
        </div>
        <div class="TopicsItem-title-box">
          {{ topic.title }}
        </div>
        <div class="TopicsItem-label-box">
          <span class="label">{{ topic.tab }}</span>
        </div>
      </div>
      <div class="TopicsItem-icon-box">
        <div class="TopicsItem-icon-left">
          <span class="TopicsItem-author-name">{{ topic.author.loginname }}   {{ topic.create_at | filterTime }} </span>
        </div>
        <div class="TopicsItem-icon-right">
          <mu-icon value="visibility" :size="19" color="#D3DCE6"/>
          <span class="TopicsItem-visit-count">{{ topic.visit_count }}</span>
          <mu-icon value="textsms" :size="19" color="#D3DCE6"/>
          <span class="TopicsItem-reply-count">{{ topic.reply_count }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TopicsItem',
  props: {
    topic: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.TopicsItem {
  width 100%
  min-height 120px
  padding: 15px 5px
  overflow-x hidden
  overflow-y auto
  border-bottom 5px solid #f0f0f0
  box-sizing border-box
  background #ffffff
}

.TopicsItem-top-box {
  width 100%
  min-height 50px
  display flex
}

.TopicsItem-author-img {
  flex 1
  width 60px
  height 50px
  border-radius 15px
}

.TopicsItem-author {
  width 50px
  height 50px
  border-radius 100%
}

.TopicsItem-title-box {
  flex 6
  min-height 50px
  padding 0 5px 0 10px
  font-size 1.1rem
  text-align left
  color #000000
}

.TopicsItem-label-box {
  flex 1
  width 60px
  height 20px
  margin-top 10px
  background pink
}

.TopicsItem-label {
  width 50px
  height 20px
}

.TopicsItem-icon-box {
  width 100%
  height 20px
  display flex
  color #000000
  margin-top 10px
}

.TopicsItem-icon-left {
  flex 1.5
  text-align left
  padding-left 3%
  width 50%
  box-sizing border-box
}

.TopicsItem-icon-right {
  flex 1
  text-align right
  padding-right 5px
  width 50%
  box-sizing border-box
}

.TopicsItem-visit-count {
  width 80px
  height 20px
  position relative
  bottom 5px
}

.TopicsItem-reply-count {
  width 80px
  height 20px
  position relative
  bottom 5px
}
</style>
