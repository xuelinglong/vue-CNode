<template>
  <div class="comments">
    <mu-appbar :title="REPLIES_COUNT + '条评论'">
      <mu-icon-button icon="arrow_back" slot="left" @click="back" />
      <mu-icon-button icon="" slot="right" />
    </mu-appbar>

    <div class="commentslist">
      <v-commentitem v-for="comment in info.detailsData.replies" :key="comment.id" :comment="comment"></v-commentitem>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import router from './../../router/index'
import Commentitem from './../commentitem/commentitem'
export default {
  name: 'Comments',
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
</style>
