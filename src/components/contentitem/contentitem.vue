<template>
  <div class="contentitem">
    <div class="top-box">
      <div class="author-img">
        <img class="author" :src="topic.author.avatar_url" />
      </div>
      <div class="title-box">
        {{ topic.title }}
      </div>
      <div class="label-box">
        <span class="label">{{ topic.tab }}</span>
      </div>
    </div>
    <div class="icon-box">
      <div class="icon-left">
        <span class="author-name">{{ topic.author.loginname }}</span>
      </div>
      <div class="icon-right">
        <mu-icon value="visibility" :size="15" color="#D3DCE6"/>
        <span class="visit-count">{{ topic.visit_count }}</span>
        <mu-icon value="textsms" :size="15" color="#D3DCE6"/>
        <span class="reply-count">{{ topic.reply_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contentitem',
  props: ['topic']
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.contentitem {
  width 100%
  min-height 130px
  padding: 5px
  overflow-x hidden
  overflow-y auto
  border-bottom 5px solid #f0f0f0
  box-sizing border-box
  background #ffffff
}

.top-box {
  width 100%
  min-height 50px
  display flex
}

.author-img {
  flex 1
  width 60px
  height 50px
  border-radius 15px
}

.author {
  width 50px
  height 50px
  border-radius 100%
}

.title-box {
  flex 6
  min-height 50px
  padding 5px 5px 0 10px
  font-size 1.1rem
  text-align left
  color #000000
}

.label-box {
  flex 1
  width 60px
  height 20px
  margin-top 10px
  background pink
}

.label {
  width 50px
  height 20px
}

.icon-box {
  width 100%
  height 50px
  display flex
  margin-top 10px
}

.icon-left {
  flex 1
  text-align left
  padding-left 3%
  width 50%
  box-sizing border-box
}

.icon-right {
  flex 1
  text-align right
  padding-right 10px
  width 50%
  box-sizing border-box
}

.visit {
  width 20px
  height 20px
}

.visit-count {
  width 80px
  height 20px
}

.msg {
  width 20px
  height 20px
}

.reply-count {
  width 80px
  height 20px
  // float right
}
</style>
