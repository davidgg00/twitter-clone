<template>
  <div class="profileWrapper">
    <div class="shortInfo">
      <h4>
        {{ $store.state.user.info.first_name }}
        {{ $store.state.user.info.last_name }}
      </h4>
      <p id="totalTweets">3 Tweets</p>
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
            <h4>
              {{ $store.state.user.info.first_name }}
              {{ $store.state.user.info.last_name }}
            </h4>
            <p id="username">@username</p>
            <p>Biography</p>
          </div>
          <div class="infoFollower">
            <div class="info">
              <span id="following"
                >{{ user.info.totalFollowing }} Following</span
              >

              <span id="followers"
                >{{ user.info.totalFollowers }} Followers</span
              >
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
import backendApiConnection from '../api/backendApiConnection'
export default {
  data() {
    return {
      tweets: [],
      user: {
        info: {
          id: '',
          first_name: '',
          last_name: '',
          username: '',
          biography: '',
          email: '',
          password: '',
          followers: [],
          totalFollowers: 0,
          following: [],
          totalFollowing: 0,
          tweets: [],
        },
      },
    }
  },
  created() {
    this.getFollowings()
    this.getFollowers()
    this.getTweets()
  },
  methods: {
    async getFollowings() {
      const response = await backendApiConnection.get(
        'followers/getFollowing/' + this.$store.state.user.info.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.user.info.following = response.data
        this.user.info.totalFollowing = response.data.length
      }
    },
    async getFollowers() {
      const response = await backendApiConnection.get(
        'followers/getFollowers/' + this.$store.state.user.info.id,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.user.info.followers = response.data
        this.user.info.totalFollowers = response.data.length
      }
    },
    async getTweets() {
      const response = await backendApiConnection.get(
        'tweet/getAllUserTweets/' + this.$store.state.user.info.id,
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
</style>
