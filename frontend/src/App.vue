<template>
  <div id="app">
    <Sidebar/>

    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "@/components/Navigation/Sidebar.vue"

export default {
  name: 'App',
  components: {
    Sidebar
  },
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>

<style>
</style>
