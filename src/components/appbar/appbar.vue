<template>
  <mu-appbar :title="common.appbar.title" :zDepth="0">
  </mu-appbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Appbar',
  computed: {
    ...mapState([
      'common'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mu-appbar {
  width 100%
  height 56px
  position fixed
  top 0
  left 0
}
</style>
