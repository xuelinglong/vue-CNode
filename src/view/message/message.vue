<template>
  <div class="message">
    <div class="message-login" v-if="!login.loginData.success">
      <div class="main-image">
        <img class="logo" src="./../../assets/logo.jpg" alt=""/>
      </div>
      <mu-raised-button label="去登录" :fullWidth="true" class="demo-raised-button" @click.native="goToLogin" primary/><br/>
    </div>

    <div class="message-view" v-if="login.loginData.success">
      <div class="title-text">未读消息({{ HASNOT_READ_MESSAGES }})</div>
      <div class="messagelist" v-if="HASNOT_READ_MESSAGES > 0">
        <v-messageitem v-for="message in messages.messageData.hasnot_read_messages" :key="message.reply.id" :message="message"></v-messageitem>
      </div>
      <div class="blank" v-if="HASNOT_READ_MESSAGES === 0">
        无新消息
      </div>

      <div class="title-text">过往已读消息({{ HAS_READ_MESSAGES }})</div>
      <div class="messagelist" v-if="HAS_READ_MESSAGES > 0">
        <v-messageitem v-for="message in messages.messageData.has_read_messages" :key="message.id" :message="message"></v-messageitem>
      </div>
      <div class="blank" v-if="HAS_READ_MESSAGES === 0">
        无过往消息
      </div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState, mapGetters } from 'vuex'
import router from './../../router/index'
import Messageitem from './../../components/messageitem/messageitem'
export default {
  name: 'Message',
  computed: {
    ...mapState([
      'login',
      'messages'
    ]),
    ...mapGetters([
      'HASNOT_READ_MESSAGES',
      'HAS_READ_MESSAGES'
    ])
  },
  components: {
    'v-messageitem': Messageitem
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.message {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 56px
}

.message-login {
  width 100%
  height 100%
  padding 10% 0
  box-sizing border-box
}

.main-image {
  width 100%
  height 30%
  padding: 20px
  box-sizing border-box
}

.logo {
  width 300px
  height 150px
}

.demo-raised-button {
  width 80%
  margin 30px 0 15px 0
  font-size 1.1rem
}

.message-view {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 56px
  overflow-y auto
  background #f0f0f0
}

.title-text {
  width 100%
  height 40px
  padding: 5px 0 0 5px
  font-size 1.1rem
  text-align left
  box-sizing border-box
}

.messagelist {
  width 100%
  min-height 130px
  position relative
  top 0
  left 0
}

.blank {
  width 100%
  height 80px
  padding-top 20px
  text-align center
  box-sizing border-box
  background #ffffff
}
</style>
