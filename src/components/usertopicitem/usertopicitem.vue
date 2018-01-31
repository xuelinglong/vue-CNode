<template>
  <div class="usertopicitem">
    <router-link :to="{name: 'details', params: {id: topic.id}}">
      <div class="image-author">
        <img class="author" :src="topic.author.avatar_url" />
      </div>
      <div class="name-author">
        {{ topic.author.loginname}}
      </div>
      <div class="title-topic">
        {{ topic.title}}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Usertopicitem',
  props: ['topic']
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.usertopicitem {
  width 100%
  min-height 100px
  padding: 5px
  overflow-x hidden
  overflow-y auto
  border-bottom 5px solid #f0f0f0
  box-sizing border-box
  background #ffffff
}

.image-author {
  width 50px
  height 50px
  float left
  border-radius: 100%
}

.name-author {
  width 80%
  height 25px
  float right
  font-size 0.9rem
  text-align left
}

.title-topic {
  width 80%
  min-height 25px
  float right
  font-size 1.0rem
  text-align left
  color #000000
}
</style>
