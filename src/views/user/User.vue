<template>
  <div class="user">
    <div class="view-login" v-if="!login.loginData.success">
      <mu-text-field hintText="accesstoken" v-model="accesstoken" type="string" icon="lock_outline" underlineFocusClass="line-focus"/><br/>
      <div class="button-box">
        <div class="main-button">
          <mu-raised-button label="登录" :fullWidth="true" class="demo-raised-button" @click.native="tapToLogin" primary/><br/>
        </div>
        <div class="main-button">
          <mu-raised-button label="注册" :fullWidth="true" class="demo-raised-button" href="https://www.vue-js.com/signup" primary/>
        </div>
      </div>
    </div>

    <div class="view-user" v-if="login.loginData.success">
      <div class="author-image">
        <img class="image" :src="login.loginData.avatar_url" alt=""><br/>
        <span class="loginname">{{ login.loginData.loginname }}</span>
      </div>

      <mu-list>
        <mu-list-item title="我收藏的话题" :to="{name: 'usertopics', params: {type: 'topic_collect'}}" titleClass="left">
          <mu-icon slot="left" value="star" style="color: #ffd600"/>
          <span class="count" slot="right">{{ TOPIC_COLLECT }}</span>
          <mu-icon slot="right" value="chevron_right"/>
        </mu-list-item>
        <mu-list-item title="我参与的话题" :to="{name: 'usertopics', params: {type: 'recent_replies'}}">
          <mu-icon slot="left" value="chat" style="color: #00b1fe"/>
          <span class="count" slot="right">{{ RECENT_REPLIES }}</span>
          <mu-icon slot="right" value="chevron_right"/>
        </mu-list-item>
        <mu-list-item title="我最近的话题" :to="{name: 'usertopics', params: {type: 'recent_topics'}}">
          <mu-icon slot="left" value="bubble_chart" style="color: #e91e63"/>
          <span class="count" slot="right">{{ RECENT_TOPICS }}</span>
          <mu-icon slot="right" value="chevron_right"/>
        </mu-list-item>
      </mu-list>

      <div class="loginout">
        <mu-raised-button label="退出登录" :fullWidth="true" class="demo-raised-button" @click.native="loginOut" primary/>
      </div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'User',
  data () {
    return {
      accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c'
    }
  },
  computed: {
    ...mapState([
      'login'
    ]),
    ...mapGetters([
      'RECENT_REPLIES',
      'RECENT_TOPICS',
      'TOPIC_COLLECT'
    ])
  },
  methods: {
    tapToLogin () {
      this.$store.dispatch(type.LOGIN, {
        accesstoken: this.accesstoken
      })
    },
    loginOut () {
      this.$store.dispatch(type.LOGINOUT)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.user {
  width 100%
  text-align center
  position fixed
  top 56px
  left 0
  bottom 56px
  background #f0f0f0
}

.view-login {
  width 100%
  height 100%
  padding 10% 0
  box-sizing border-box
}

.button-box {
  width 80%
  margin-left 10%
}

.main-button {
  width 100%
  margin-top 30px
}

.demo-raised-button {
  font-size 1.1rem
}

.view-user {
  width 100%
  height 100%
}

.author-image {
  width 100%
  height 37%
  padding-top 5%
  background #7e57c2
}

.image {
  border-radius 100%
}

.loginname {
  font-size 1.1rem
  color #ffffff
}

.mu-list {
  padding 15px 0
  text-align left
}

.mu-item-wrapper {
  background #ffffff
  border-bottom 1px solid #f0f0f0
}

.mu-item-right {
  width 50px
}

.count {
  width 24px
  height 24px
  font-size 0.9rem
  color #ffffff
  text-align center
  border-radius 100%
  background #e91e63
}

.loginout {
  width 80%
  position relative
  top 5%
  left 10%
  font-size 1.2rem
}
</style>
