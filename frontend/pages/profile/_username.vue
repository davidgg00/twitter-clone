<template>
  <div class="profileWrapper">
    <div class="shortInfo">
      <h4>
        {{ user.first_name }}
        {{ user.last_name }}
      </h4>
      <p id="totalTweets">{{ tweets.length }} Tweets</p>
    </div>
    <div class="profile">
      <div class="background">
        <img
          src="https://www.rccaraction.com/wp-content/uploads/2014/04/600-x-200-banner.jpg"
          alt=""
        />
      </div>
      <div class="profileInfoWrapper">
        <div class="profileInfo">
          <div class="profileImage">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              alt=""
            />
          </div>
          <div class="profileName">
            <div class="row">
              <h4>
                {{ user.first_name }}
                {{ user.last_name }}
              </h4>
            </div>
            <p id="username">@{{ user.username }}</p>
            <p v-if="user.bio === null">Biography</p>
            <p v-else>{{ user.bio }}</p>
          </div>
          <div class="infoFollower">
            <div class="info">
              <span id="following" @click="showFollowingUsers"
                >{{ user.totalFollowing }} Following</span
              >

              <span id="followers">{{ user.totalFollowers }} Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tweets">
      <div class="wrapperTweet">
        <Tweet
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          v-on:removeTweet="removeTweet"
        />
      </div>
    </div>
  </div>
</template>

<script>
import backendApiConnection from '../../api/backendApiConnection'
export default {
  data() {
    return {
      tweets: [],
      paramsRoute: this.$route.params,
      user: {},
    }
  },
  created() {
    this.getDataUser()
  },
  methods: {
    async getDataUser() {
      let response = await backendApiConnection
        .get(`/user/getUserByUsername/${this.paramsRoute.username}`, {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        })
        .catch((error) => {
          this.$router.push('/')
        })
      this.user = response.data
      if (this.user.username === this.$store.state.user.info.username) {
        this.$router.push('/profile')
      }

      response = await backendApiConnection.get(
        'followers/getFollowing/' + this.user.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.user.following = response.data
        this.user.totalFollowing = response.data.length
      }

      response = await backendApiConnection.get(
        'followers/getFollowers/' + this.user.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.user.followers = response.data
        this.user.totalFollowers = response.data.length
      }

      response = await backendApiConnection.get(
        'tweet/getAllUserTweets/' + this.user.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.tweets = response.data
      }
    },
    async removeTweet(tweetId) {
      this.tweets = this.tweets.filter((x) => x.id !== tweetId)
    },
    async showFollowingUsers() {
      this.$swal({
        title: 'Following',
        html: this.user.info.followers.user
          .map((x) => `<p>${x.first_name} ${x.last_name}</p>`)
          .join(''),
        showConfirmButton: false,
        showCloseButton: true,
      })
    },
  },
}
</script>

<style scoped>
.profileWrapper {
  flex-grow: 15;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.shortInfo {
  background: #fff;
  border: 1px solid gray;
}

.shortInfo > h4 {
  margin: 1em 1.33em;
}

.shortInfo > #totalTweets {
  margin: 1em 1.33em;
  color: gray;
}

.background img {
  width: 100%;
  height: 150px;
}

.profileInfoWrapper {
  background: #fff;
  margin-top: -70px;
  border-bottom: 1px solid black;
}

.row {
  display: flex;
  justify-content: space-between;
}

.profileInfo {
  width: 95%;
  margin: 0 auto;
}

.profileInfo img {
  width: 100px;
  border-radius: 50%;
}

.profileInfo h4 {
  margin: 0;
}

.profileInfo #username {
  color: gray;
  margin-top: 5px;
}

.info {
  display: inline-block;
  width: 100%;
}

.info span:last-child {
  margin-left: 20px;
}

.tweets {
  background: #fff;
}

#dob {
  width: 80% !important;
}
</style>
