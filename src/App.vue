<template>
  <div id="app">
    <v-appbar></v-appbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <v-bottomnav></v-bottomnav>
  </div>
</template>

<script>
import Bottomnav from './components/bottomnav/bottomnav'
import Appbar from './components/appbar/appbar'
export default {
  name: 'App',
  components: {
    'v-bottomnav': Bottomnav,
    'v-appbar': Appbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
