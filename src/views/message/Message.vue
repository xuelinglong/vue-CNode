<template>
  <div class="Message">
    <div class="Message-login" v-if="!login.loginData.success">
      <div class="Message-main-image">
        <img class="Message-logo" src="./../../assets/logo.jpg" alt=""/>
      </div>
      <div class="Message-loginbutton">
        <mu-raised-button label="去登录" :fullWidth="true" class="Message-demo-raised-button" @click.native="goToLogin" primary/><br/>
      </div>
    </div>

    <div class="Message-view" v-if="login.loginData.success">
      <div class="Message-title-text">未读消息({{ HASNOT_READ_MESSAGES }})</div>
      <div class="Message-list" v-if="HASNOT_READ_MESSAGES > 0">
        <message-item v-for="message in messages.messageData.hasnot_read_messages" :key="message.reply.id" :message="message"></message-item>
      </div>
      <div class="Message-blank" v-if="HASNOT_READ_MESSAGES === 0">
        无新消息
      </div>

      <div class="Message-title-text">过往已读消息({{ HAS_READ_MESSAGES }})</div>
      <div class="Message-list" v-if="HAS_READ_MESSAGES > 0">
        <message-item v-for="message in messages.messageData.has_read_messages" :key="message.id" :message="message"></message-item>
      </div>
      <div class="Message-blank" v-if="HAS_READ_MESSAGES === 0">
        无过往消息
      </div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState, mapGetters } from 'vuex'
import router from './../../router/index'
import MessageItem from './MessageItem'
export default {
  name: 'Message',
  components: {
    'message-item': MessageItem
  },
  created () {
    if (this.login.loginData.success) {
      this.$store.dispatch(type.GET_MESSAGE_COUNT, {
        accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c'
      })
    }
  },
  methods: {
    goToLogin () {
      router.push({name: 'user'})
      this.$store.dispatch(type.HANDEL_CHANGE, {
        active: 'user'
      })
    }
  },
  computed: {
    ...mapState([
      'login',
      'messages'
    ]),
    ...mapGetters([
      'HASNOT_READ_MESSAGES',
      'HAS_READ_MESSAGES'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.Message {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 56px
}

.Message-login {
  width 100%
  height 100%
  padding 10% 0
  box-sizing border-box
}

.Message-main-image {
  width 100%
  height 30%
  padding: 20px
  box-sizing border-box
}

.Message-logo {
  width 100%
  height 150px
}

.Message-loginbutton {
  width 80%
  margin 10% 10%
}

.Message-demo-raised-button {
  font-size 1.1rem
}

.Message-view {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 56px
  overflow-y auto
  background #f0f0f0
}

.Message-title-text {
  width 100%
  height 40px
  padding: 5px 0 0 5px
  font-size 1.1rem
  text-align left
  box-sizing border-box
}

.Message-list {
  width 100%
  min-height 130px
  position relative
  top 0
  left 0
}

.Message-blank {
  width 100%
  height 80px
  padding-top 20px
  text-align center
  box-sizing border-box
  background #ffffff
}
</style>
