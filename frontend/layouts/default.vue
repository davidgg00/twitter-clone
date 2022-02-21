<template>
  <div class="container">
    <Nav />
    <Nuxt />
    <div class="whoToFollow">
      <h4>Who to follow</h4>
      <div class="wrapperUsers">
        <User v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from '../components/nav.vue'
import User from '../components/User.vue'
import BackendApiConnection from '../api/backendApiConnection'
export default {
  components: {
    Nav,
    User,
  },
  created() {
    this.getWhoToFollow()
  },
  methods: {
    async getWhoToFollow() {
      try {
        const { data } = await BackendApiConnection.get(
          'followers/getWhoToFollow/' + this.$store.state.user.info.id,
          {
            headers: {
              'x-auth-token': this.$store.state.user.token,
            },
          }
        )
        this.users = data
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
  data() {
    return {
      users: [],
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
.container {
  display: flex;
}

.whoToFollow {
  flex-grow: 1;
  background: #fff;
  padding: 10px;
  border: 1px solid gray;
}

img {
  width: 100px;
}

.wrapperUsers {
  padding: 10px;
  flex-wrap: wrap;
}

.user {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}
</style>
