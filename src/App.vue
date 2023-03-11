<script>
import { RouterView } from 'vue-router'

export default {
  name: 'App',

  components: {
    RouterView,
  },

  mounted() {
    this.$router.push('/landing-page')
  },
}
</script>

<template>
  <RouterView />
</template>
