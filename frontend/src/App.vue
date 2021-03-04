<template>
  <div id="app" class="text-base bg-white dark:bg-gray-900">
    <!-- Top navigation across the app -->
    <component :is="navbarComponent"/>
    <!-- Sidebar and main content -->
    <router-view></router-view>
  </div>
</template>

<script>

  import Navbar from "@/components/Navigation/Navbar.vue"
  import NavbarEditor from "@/components/Navigation/NavbarEditor.vue"

  export default {
    name: 'App',
    components: {
      Navbar,
      NavbarEditor
    },
    computed: {
      count() {
        return this.$store.state.count
      },
      navbarComponent() {
        if (this.$route.name === 'create-rule-view') {
          return NavbarEditor;
        } else {
          return Navbar
        }
      }
    }
  }
</script>