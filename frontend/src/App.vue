<template>
  <div id="app">
    <!-- Top navigation across the app -->
    <Navbar/>
    <!-- Sidebar and main content -->
    <router-view></router-view>
  </div>
</template>

<script>

  import Navbar from "@/components/Navigation/Navbar.vue"

  export default {
    name: 'App',
    components: {
      Navbar
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
