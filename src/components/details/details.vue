<template>
  <div class="Details">
    <div class="Details-paperbar">
      <div class="Details-paper-left">
        <mu-icon-button icon="arrow_back" slot="left" @click="back" />
      </div>
      <div class="Details-paper-center">
        <span class="title">话题正文</span>
      </div>
      <div class="Details-paper-right">
        <mu-badge :content="repliesCount" class="demo-icon-badge" slot="right" v-show="REPLIES_COUNT > 0" circle secondary>
          <mu-icon value="chat" @click="gotoComments"></mu-icon>
        </mu-badge>
        <mu-icon-button v-show="!info.detailsData.is_collect" @click="handelCollect" icon="star" slot="right" iconClass="collect"></mu-icon-button>
        <mu-icon-button v-show="info.detailsData.is_collect" @click="handelCollect" icon="star" slot="right" iconClass="collected" style="color: yellow"></mu-icon-button>
      </div>
    </div>

    <div class="Details-content">
      <p class="Details-title">{{ info.detailsData.title }}</p>
      <mu-list-item :title="info.detailsData.author.loginname" disabled>
        <mu-avatar slot="left" :src="info.detailsData.author.avatar_url"/>
        <div class="Details-time" slot="right">刚刚</div>
      </mu-list-item>

      <div class="Details-content-html" v-html="info.detailsData.content"></div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState, mapGetters } from 'vuex'
import router from './../../router/index'
export default {
  name: 'Details',
  data () {
    return {
      accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c',
      repliesCount: ''
    }
  },
  created () {
    if (this.login.loginData.success) {
      this.$store.dispatch(type.FETCH_TOPIC_DETAILS, {
        accesstoken: this.accesstoken,
        id: this.$route.params.id
      })
    } else {
      this.$store.dispatch(type.FETCH_TOPIC_DETAILS, {
        id: this.$route.params.id
      })
    }
  },
  beforeUpdate () {
    this.lengthToString()
  },
  methods: {
    lengthToString () {
      this.repliesCount = this.REPLIES_COUNT.toString()
    },
    back () {
      router.go(-1)
      this.$store.dispatch(type.CLEAR_TOPIC_DETAILS)
    },
    handelCollect () {
      if (this.login.loginData.success) {
        if (this.info.detailsData.is_collect) {
          this.$store.dispatch(type.DEL_COLLECTED, {
            accesstoken: this.accesstoken,
            topic_id: this.$route.params.id,
            loginname: this.login.loginData.loginname
          })
        } else {
          this.$store.dispatch(type.COLLECT, {
            accesstoken: this.accesstoken,
            topic_id: this.$route.params.id,
            loginname: this.login.loginData.loginname
          })
        }
      } else {
        router.push({name: 'user'})
        this.$store.dispatch(type.HANDEL_CHANGE, {
          active: 'user'
        })
      }
    },
    gotoComments () {
      router.push({name: 'comments'})
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
.Details {
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

.Details-paperbar {
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

.Details-paper-left {
  height 100%
  padding-top 3px
  box-sizing border-box
}

.Details-paper-center {
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

.Details-paper-right {
  height 100%
  padding-top 3px
  box-sizing border-box
}

.Details-content {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 0
  padding 5px
  text-align left
  overflow-y auto
}

.Details-title {
  font-size 1.2rem
}

.mu-list-item {
  font-size: 1.1rem
}

.mu-item-content {
  width 85%
}
</style>
