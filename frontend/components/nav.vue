<template>
  <aside>
    <nav>
      <img
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
        alt=""
      />
      <NuxtLink to="/"><i class="fa-solid fa-house"></i>Home</NuxtLink>
      <a href="#"
        ><i class="fa-solid fa-bell"></i>Notifications ({{
          newNotifications
        }})</a
      >
      <NuxtLink to="/profile"><i class="fa-solid fa-user"></i>Profile</NuxtLink>
      <a @click="logout"
        ><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</a
      >
    </nav>
  </aside>
</template>

<script>
import backendApiConnection from '../api/backendApiConnection'
export default {
  data() {
    return {
      newNotifications: 0,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
  },
  created() {
    backendApiConnection
      .get('/notification/getNew/' + this.$store.state.user.info.id, {
        headers: {
          'x-auth-token': this.$store.state.user.token,
        },
      })
      .then((response) => {
        this.newNotifications = response.data.length
      })
  },
}
</script>

<style scoped>
nav {
  background: #fff;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid gray;
}

a:first-child {
  margin-top: 0px !important;
}

a {
  text-decoration: none;
  color: black;
  margin-top: 50px;
}

a:hover {
  color: #e27894;
  cursor: pointer;
}

a i {
  margin-right: 10px;
}

img {
  width: 100px;
}
</style>
