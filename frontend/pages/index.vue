<template>
  <div>
    <h2>Only you can access here if you are logged in</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'auth',
  data() {
    return {}
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
  },
})
</script>
