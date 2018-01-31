<template>
  <div class="push">
    <div class="push-login" v-if="!login.loginData.success">
      <div class="main-image">
        <img class="logo" src="./../../assets/logo.jpg" alt=""/>
      </div>
      <mu-raised-button label="去登录" :fullWidth="true" class="demo-raised-button" @click.native="goToLogin" primary/><br/>
    </div>

    <div class="push-view" v-if="login.loginData.success">
      <mu-select-field v-model="tab" :labelFocusClass="['label-foucs']" label="选择话题类型">
        <mu-menu-item v-for="item in list" :key="item.index" :value="item.tab" :title="item.title" />
      </mu-select-field><br/>
      <mu-text-field label="输入标题" hintText="标题不得少于10个字符" v-model="title"/><br/>
      <textarea class="content" v-model="content" placeholder="正文不能为空"></textarea>
      <mu-raised-button label="发布" class="demo-raised-button" @click="pushNewTopic" primary fullWidth/>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState } from 'vuex'
import router from './../../router/index'
export default {
  name: 'Push',
  data () {
    return {
      accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c',
      tab: 'ask',
      list: [
        {tab: 'ask', title: '问答'},
        {tab: 'share', title: '分享'},
        {tab: 'job', title: '招聘'},
        {tab: 'dev', title: '测试贴'}
      ],
      title: '',
      content: []
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {
    goToLogin () {
      router.push({name: 'user'})
      this.$store.dispatch(type.HANDEL_CHANGE, {
        active: 'user'
      })
    },
    pushNewTopic () {
      if (this.login.loginData.success) {
        if (this.content.length > 0) {
          this.$store.dispatch(type.PUSH_NEW_TOPIC, {
            accesstoken: this.accesstoken,
            loginname: this.login.loginData.loginname,
            title: this.title,
            tab: this.tab,
            content: this.content
          })
          this.tab = 'ask'
          this.title = ''
          this.content = []
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.push {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 56px
}

.push-login {
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

.push-view {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 56px
  padding-top 20px
  background #f0f0f0
}

.mu-dropDown-menu {
  text-align left
}

.mu-text-field-content {
  text-align left
}

.content {
  width 80%
  height 260px
  border 1px solid #000000
  background #f0f0f0
}

.demo-raised-button {
  margin-top 30px
  width 80%
}
</style>
