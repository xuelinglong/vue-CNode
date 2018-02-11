<template>
  <div class="UserTopicsItem">
    <router-link :to="{name: 'details', params: {id: topic.id}}">
      <div class="UserTopicsItem-image-author">
        <img class="UserTopicsItem-image" :src="topic.author.avatar_url" />
      </div>
      <div class="UserTopicsItem-name-author">
        {{ topic.author.loginname}}
      </div>
      <div class="UserTopicsItem-title-topic">
        {{ topic.title}}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'UserTopicsItem',
  props: {
    topic: Object
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.UserTopicsItem {
  width 100%
  min-height 100px
  padding: 5px
  overflow-x hidden
  overflow-y auto
  border-bottom 5px solid #f0f0f0
  box-sizing border-box
  background #ffffff
}

.UserTopicsItem-image-author {
  width 50px
  height 50px
  float left
  border-radius: 100%
}

.UserTopicsItem-image {
  width 50px
  height 50px
  border-radius: 100%
}

.UserTopicsItem-name-author {
  width 80%
  height 25px
  float right
  font-size 0.9rem
  text-align left
}

.UserTopicsItem-title-topic {
  width 80%
  min-height 25px
  float right
  font-size 1.0rem
  text-align left
  color #000000
}
</style>
