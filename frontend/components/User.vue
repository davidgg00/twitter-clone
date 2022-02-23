<template>
  <div class="user">
    <div class="wrapperImage">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        alt=""
      />
    </div>
    <div class="dataUser">
      <p>{{ user.first_name }} {{ user.last_name }}</p>
      <p>@{{ user.username }}</p>
    </div>

    <button @click="unfollow" v-if="following">Unfollow</button>
    <button @click="follow" v-else>Follow</button>
  </div>
</template>

<script>
import backendApiConnection from '../api/backendApiConnection'
export default {
  name: 'UserPage',
  props: ['user'],
  data() {
    return {
      following: false,
    }
  },
  methods: {
    async follow() {
      try {
        await backendApiConnection.post(
          '/followers/followUser',
          {
            user_id: this.user.id,
            follower_id: this.$store.state.user.info.id,
          },
          {
            headers: {
              'x-auth-token': this.$store.state.user.token,
            },
          }
        )
        this.following = true
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.response.data.message,
        })
      }
    },

    async unfollow() {
      try {
        await backendApiConnection.post(
          '/followers/unfollowUser/' +
            this.user.id +
            '/' +
            this.$store.state.user.info.id,
          {},
          {
            headers: {
              'x-auth-token': this.$store.state.user.token,
            },
          }
        )
        this.following = false
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.response.data.message,
        })
      }
    },
  },
}
</script>

<style scoped>
.wrapperImage img {
  border-radius: 50%;
}
</style>
