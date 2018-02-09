<template>
  <div id="app">
    <app-appbar></app-appbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <app-bottomnav></app-bottomnav>
  </div>
</template>

<script>
import Bottomnav from './components/bottomnav/Bottomnav'
import Appbar from './components/appbar/Appbar'
export default {
  name: 'App',
  components: {
    'app-bottomnav': Bottomnav,
    'app-appbar': Appbar
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
