<template>
  <form @submit.prevent="login">
    <h4>Sig in to Twitter</h4>
    <input
      type="text"
      name="username"
      placeholder="Username"
      v-model="username"
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      v-model="password"
      required
    />
    <button>Login</button>
    <div id="haveAccount">
      <p>No account?</p>
      <NuxtLink to="/register">Sign up</NuxtLink>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'login',
  transition: 'login',
  middleware: 'auth',

  data: () => ({
    username: '',
    password: '',
  }),

  methods: {
    async login() {
      const { ok, message }: { ok: Boolean; message: String } =
        await this.$store.dispatch('user/login', {
          username: this.username,
          password: this.password,
        })

      if (!ok) {
        console.log(this)
        this.$swal.fire({
          icon: 'error',
          title: 'Error...',
          text: message as string,
        })
      } else {
        this.$router.push('/')
      }
    },
  },
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-bottom: 20px;
}

form input {
  margin-bottom: 20px;
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 20px;
  font-size: 14px;
  border-radius: 10px;
}

#haveAccount {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

#haveAccount p {
  margin-right: 10px;
}
</style>
