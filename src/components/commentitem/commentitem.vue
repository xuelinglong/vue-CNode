<template>
  <div class="commentitem">
    <div class="top-box">
      <div class="authorimg-box">
        <img class="author-img" :src="comment.author.avatar_url" />
      </div>
      <div class="authorname-box">
        {{ comment.author.loginname }}
      </div>
      <div class="time-box">
        时间
      </div>
    </div>
    <div class="content" v-html="comment.content"></div>
    <div class="icon-box">
      <div class="left">
        <mu-icon-button icon="comment" @click="replyToComment" :size="14" style="color: #aaaaaa"></mu-icon-button>
        <span class="text">回复</span>
      </div>
      <div class="right">
        <mu-icon-button v-show="!comment.is_uped" icon="thumb_up" :size="14" @click="ups" style="color: #aaaaaa"></mu-icon-button>
        <mu-icon-button v-show="comment.is_uped" icon="thumb_up" :size="14" @click="ups" style="color: #ffd600"></mu-icon-button>
        <span class="text">{{ comment.ups.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState } from 'vuex'
import router from './../../router/index'
export default {
  name: 'Commentitem',
  data () {
    return {
      accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c',
      number: 0
    }
  },
  props: ['comment'],
  computed: {
    ...mapState([
      'login',
      'info'
    ])
  },
  methods: {
    ups () {
      if (this.login.loginData.success) {
        this.$store.dispatch(type.REPLY_UPS, {
          accesstoken: this.accesstoken,
          reply_id: this.comment.id,
          topic_id: this.info.detailsData.id
        })
      } else {
        router.push({name: 'user'})
        this.$store.dispatch(type.HANDEL_CHANGE, {
          active: 'user'
        })
      }
    },
    replyToComment () {
      if (this.login.loginData.success) {
        this.$store.dispatch(type.SHOW_REPLIES_EDIT)
        this.$store.dispatch(type.SAVE_REPLY_ID, {
          reply_id: this.comment.id
        })
      } else {
        router.push({name: 'user'})
        this.$store.dispatch(type.HANDEL_CHANGE, {
          active: 'user'
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.commentitem {
  width 100%
  min-height 180px
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

.authorimg-box {
  flex 1
  width 60px
  height 50px
  border-radius 15px
}

.author-img {
  width 50px
  height 50px
  border-radius 100%
}

.authorname-box {
  flex 4
  min-height 50px
  padding 15px 5px 0 10px
  font-size 1.1rem
  text-align left
  color #000000
}

.time-box {
  flex 1
  width 60px
  padding 15px 5px 0 10px
  font-size 1.1rem
}

.content {
  width 100%
  min-height 80px
  padding: 10px
  text-align left
  box-sizing border-box
}

.icon-box {
  width 100%
  height 50px
  display flex
  // text-align right
}

.left {
  flex 1
  text-align left
}

.right {
  flex 1
  text-align right
}

.text {
  width 48px
  height 48px
  padding 10px 0
  position relative
  bottom 5px
  right 5px
  box-sizing border-box
}

</style>
