<template>
  <div class="flex flex-col flex-grow bg-gray-200 dark:bg-gray-900">

    <!-- Header content section -->
    <div class="flex flex-shrink-0 w-full items-center h-16 px-4 bg-white border-b border-gray-300 dark:border-white dark:border-opacity-10 dark:bg-gray-700">
      <h1 class="text-2xl mb-0">Overview</h1>
    </div>

    <!-- Main content section -->
    <vue-scroll>
      <div></div>
    </vue-scroll>

  </div>
</template>

<script>

export default {
  name: "GuildRules",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
  }
}
</script>
