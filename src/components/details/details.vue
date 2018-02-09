<template>
  <div class="Details">
    <div class="paperbar">
      <div class="paper-left">
        <mu-icon-button icon="arrow_back" slot="left" @click="back" />
      </div>
      <div class="paper-center">
        <span class="title">话题正文</span>
      </div>
      <div class="paper-right">
        <span class="replies-count" slot="right" v-show="REPLIES_COUNT > 0">{{ REPLIES_COUNT }}</span>
        <mu-icon-button icon="chat" @click="gotoComments" slot="right"></mu-icon-button>
        <mu-icon-button v-show="!info.detailsData.is_collect" @click="handelCollect" icon="star" slot="right" iconClass="collect"></mu-icon-button>
        <mu-icon-button v-show="info.detailsData.is_collect" @click="handelCollect" icon="star" slot="right" iconClass="collected" style="color: yellow"></mu-icon-button>
      </div>
    </div>

    <div class="content-details">
      <p class="details-title">{{ info.detailsData.title }}</p>
      <mu-list-item :title="info.detailsData.author.loginname" disabled>
        <mu-avatar slot="left" :src="info.detailsData.author.avatar_url"/>
        <div class="details-time" slot="right">刚刚</div>
      </mu-list-item>

      <div class="details-content" v-html="info.detailsData.content"></div>
    </div>
  </div>
</template>

<script>
import * as type from './../../store/type'
import { mapState, mapGetters } from 'vuex'
import router from './../../router/index'
// import Contentitem from './../../../components/contentitem/contentitem'
export default {
  name: 'Details',
  data () {
    return {
      accesstoken: 'af0a22ca-d49f-47ec-afef-51b9cabf4c3c'
    }
  },
  // components: {
  //   'v-contentitem': Contentitem
  // },
  computed: {
    ...mapState([
      'login',
      'info'
    ]),
    ...mapGetters([
      'REPLIES_COUNT'
    ])
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
  methods: {
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
  padding-left 8px
  padding-right 8px
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

.replies-count {
  width 30px
  height 30px
  position relative
  left 50px
  bottom 23px
  text-align center
  border-radius 100%
  background #e91e63
}

.content-details {
  width 100%
  position fixed
  top 56px
  left 0
  bottom 0
  padding 5px
  text-align left
  overflow-y auto
}

.details-title {
  font-size 1.2rem
}

.mu-list-item {
  font-size: 1.1rem
}

.mu-item-content {
  width 85%
}
</style>
