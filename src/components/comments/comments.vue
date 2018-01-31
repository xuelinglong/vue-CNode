<template>
  <div class="comments">
    <mu-appbar :title="REPLIES_COUNT + '条评论'">
      <mu-icon-button icon="arrow_back" slot="left" @click="back" />
      <mu-icon-button icon="mode_edit" slot="right" @click="showReplies" />
    </mu-appbar>

    <div class="commentslist">
      <v-commentitem v-for="comment in info.detailsData.replies" :key="comment.id" :comment="comment"></v-commentitem>
    </div>

    <div class="replies-edit" v-show="info.showreplies">
      <div class="reply-content-box">
        <textarea class="input" v-model="content"></textarea>
        <div class="icon-button">
          <button class="push" @click="pushreply">发表</button>
          <button class="cancel" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState, mapGetters } from 'vuex'
import router from './../../router/index'
import Commentitem from './../commentitem/commentitem'
export default {
  name: 'Comments',
  data () {
    return {
      accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c',
      content: []
    }
  },
  computed: {
    ...mapState([
      'login',
      'info'
    ]),
    ...mapGetters([
      'REPLIES_COUNT'
    ])
  },
  components: {
    'v-commentitem': Commentitem
  },
  methods: {
    back () {
      router.go(-1)
    },
    showReplies () {
      if (this.login.loginData.success) {
        this.$store.dispatch(type.SHOW_REPLIES_EDIT)
      }
    },
    pushreply () {
      if (this.content.length > 0) {
        this.$store.dispatch(type.REPLY_PUSH, {
          accesstoken: this.accesstoken,
          content: this.content,
          topic_id: this.info.detailsData.id,
          reply_id: this.info.reply_toComment_id
        })
        this.$store.dispatch(type.SHOW_REPLIES_EDIT)
      }
    },
    cancel () {
      this.$store.dispatch(type.SHOW_REPLIES_EDIT)
      this.$store.dispatch(type.CLEAR_REPLY_ID)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.comments {
  width 100%
  height 100%
  position fixed
  top 0
  bottom 0
  left 0
  background #ffffff
  overflow-y auto
  z-index 3
}

.mu-appbar {
  width 100%
  height 56px
  position fixed
  top 0
  left 0
}

.mu-appbar-title {
  width 300px
  flex: 4
}

.commentslist {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 0
  overflow-y auto
}

.replies-edit {
  width 100%
  position fixed
  top 0
  left 0
  bottom 0
  overflow hidden
  background rgba(0,0,0,0.4)
  z-index 4
}

.reply-content-box {
  width 80%
  min-height 350px
  position fixed
  top 20%
  left 10%
  padding 10px 10px 0 10px
  // overflow-y auto
  box-sizing border-box
  background #ffffff
}

.input {
  width 100%
  min-height 280px
  border 1px solid #000000
}

.icon-button {
  width 100%
  height 70px
  display flex
  font-size 1.1rem
  padding 10px
  box-sizing border-box
}

.push {
  flex 1
  color #7e57c2
}

.cancel {
  flex 1
}
</style>
