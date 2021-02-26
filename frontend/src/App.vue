<template>
  <div id="app">
    <!-- Top navigation across the app -->
    <Navbar/>
    <!-- Sidebar and main content -->
    <div class="flex h-screen pt-14">
      <Sidebar/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  import Navbar from "@/components/Navigation/Navbar.vue"
  import Sidebar from "@/components/Navigation/Sidebar.vue"

  export default {
    name: 'App',
    components: {
      Navbar,
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
