<template>
  <div class="MessageItem">
    <router-link :to="{name: 'details', params: {id: message.topic.id}}">
      <div class="top-box">
        <div class="authorimg-box">
          <img class="author-img" :src="message.author.avatar_url" />
        </div>
        <div class="authorname-box">
          来自：{{ message.author.loginname }}
        </div>
        <div class="time-box">
          {{ message.reply.create_at | filterTime }}
        </div>
      </div>
      <div class="content">
        {{ message.reply.content }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    message: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.MessageItem {
  width 100%
  min-height 130px
  padding: 5px
  overflow-x hidden
  overflow-y auto
  border-bottom 5px solid #f0f0f0
  box-sizing border-box
  background #ffffff
}

.MessageItem-top-box {
  width 100%
  min-height 50px
  display flex
}

.MessageItem-authorimg-box {
  flex 1
  width 60px
  height 50px
  border-radius 15px
}

.MessageItem-author-img {
  width 50px
  height 50px
  border-radius 100%
}

.MessageItem-authorname-box {
  flex 3
  min-height 50px
  padding 15px 5px 0 10px
  font-size 1.1rem
  text-align left
  color #000000
}

.MessageItem-time-box {
  flex 2
  width 60px
  text-align right
  padding 15px 5px 0 10px
  font-size 1.1rem
}

.MessageItem-content {
  width 100%
  min-height 80px
  padding: 10px
  text-align left
  box-sizing border-box
}
</style>
