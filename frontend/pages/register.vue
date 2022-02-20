<template>
  <form @submit.prevent="register">
    <h4>Sig up to Twitter</h4>
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      v-model="firstName"
      required
    />
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      v-model="lastName"
      required
    />
    <input
      type="text"
      name="email"
      placeholder="Email"
      v-model="email"
      required
    />
    <input type="date" name="dob" v-model="dob" required />
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
    <input
      type="password"
      name="repeatPassword"
      placeholder="Repeat password"
      v-model="repeatPassword"
      required
    />
    <button>Register</button>
    <div id="haveAccount">
      <p>Have an account?</p>
      <NuxtLink to="/login">Sign in</NuxtLink>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'login',
  middleware: 'auth',
  transition: 'login',
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    username: '',
    password: '',
    repeatPassword: '',
  }),

  methods: {
    async register() {
      if (this.password !== this.repeatPassword) {
        alert('Passwords do not match')
        return
      }
      const { ok, message } = await this.$store.dispatch('user/register', {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        dob: this.dob,
        username: this.username,
        password: this.password,
      })
      if (ok) {
        this.$swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'You have successfully registered!',
        })
        this.$router.push('/')
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error...',
          text: message as string,
        })
      }
    },
  },
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}

form input {
  margin-bottom: 20px;
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 10px;
  width: 125px;
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
