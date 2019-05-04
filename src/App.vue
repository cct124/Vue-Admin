<template>
  <router-view></router-view>
</template>



<script>
import { refreshAddRouter } from './detection.js'
import { localfetch } from './api/access.js'

export default {
  name: "app",
  beforeCreate() {
    refreshAddRouter(this)
    if (!JSON.parse(sessionStorage.getItem('addRoutes'))) {
      this.$store.dispatch('listinFormationinJection')
      return this.$router.replace({
        path: '/login'
      });
    }
    setTimeout(() =>{
      this.$router.replace({
        path: '/Admin'
      })
    }, 0)
    this.$store.dispatch('listinFormationinJection')
  }
};
</script>
<style>
</style>
