<template>
  <div class="Comments">
    <div class="paperbar">
      <div class="paper-left">
        <mu-icon-button icon="arrow_back" slot="left" @click="back" />
      </div>
      <div class="paper-center">
        <span class="title">{{ REPLIES_COUNT }}条评论</span>
      </div>
      <div class="paper-right">
        <mu-icon-button icon="mode_edit" slot="right" @click="showReplies" />
      </div>
    </div>

    <div class="commentslist">
      <comments-list-item v-for="comment in info.detailsData.replies" :key="comment.id" :comment="comment"></comments-list-item>
    </div>

    <div class="replies-edit" v-show="info.showreplies">
      <div class="reply-content-box">
        <textarea class="input" v-model="content"></textarea>
        <div class="replies-button">
          <button class="replies-push" @click="pushreply">发表</button>
          <button class="replies-cancel" @click="cancel">取消</button>
        </div>
        <mu-toast v-if="toast" message="评论正文不能为空" @close="hideToast"/>
      </div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState, mapGetters } from 'vuex'
import router from './../../router/index'
import CommentsItem from './CommentsItem'
export default {
  name: 'Comments',
  components: {
    'comments-list-item': CommentsItem
  },
  data () {
    return {
      accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c',
      content: [],
      toast: false
    }
  },
  methods: {
    back () {
      router.go(-1)
    },
    showReplies () {
      if (this.login.loginData.success) {
        this.$store.dispatch(type.SHOW_REPLIES_EDIT)
      } else {
        router.push({name: 'user'})
        this.$store.dispatch(type.HANDEL_CHANGE, {
          active: 'user'
        })
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
        this.content = []
      } else {
        this.toast = true
        setTimeout(() => {
          this.hideToast()
        }, 1000)
      }
    },
    cancel () {
      this.$store.dispatch(type.SHOW_REPLIES_EDIT)
      this.$store.dispatch(type.CLEAR_REPLY_ID)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.Comments {
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

.paperbar {
  width 100%
  height 56px
  display flex
  position fixed
  top 0
  left 0
  color #ffffff
  padding 2px 0
  box-sizing border-box
  background #7e57c2
}

.paper-left {
  height 100%
  padding-top 3px
  box-sizing border-box
}

.paper-center {
  flex 3
  padding-left 6px
  padding-right 6px
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  overflow hidden
  font-size 20px
  font-weight 400
  line-height 56px
}

.paper-right {
  height 100%
  padding-top 3px
  box-sizing border-box
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

.replies-button {
  width 100%
  height 70px
  display flex
  font-size 1.1rem
  padding 10px
  box-sizing border-box
}

.replies-push {
  flex 1
  color #7e57c2
}

.replies-cancel {
  flex 1
}

.mu-toast {
  position fixed
  top 40%
  left 0
}
</style>
