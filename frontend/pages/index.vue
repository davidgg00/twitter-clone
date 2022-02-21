<template>
  <div class="indexWrapper">
    <header>
      <h4>HOME</h4>
    </header>

    <FormTweet v-on:send-tweet="sendTweet" />

    <div class="wrapperTweet">
      <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FormTweet from '../components/FormTweet.vue'
import backendApiConnection from '../api/backendApiConnection'

export default Vue.extend({
  middleware: 'auth',
  components: {
    FormTweet,
  },
  created() {
    this.getTweets()
  },
  data() {
    return {
      user: {},
      tweets: {},
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    async getTweets() {
      try {
        const { data } = await backendApiConnection.get(
          'tweet/getTweetsFollowingUsers/' + this.$store.state.user.info.id,
          {
            headers: {
              'x-auth-token': this.$store.state.user.token,
            },
          }
        )
        this.tweets = data
      } catch (error: any) {
        console.log(error)
        return error
      }
    },
    async sendTweet(content) {
      try {
        const { data } = await backendApiConnection.post(
          'tweet/send',
          {
            user_id: this.$store.state.user.info.id,
            tweet_text: content,
          },
          {
            headers: {
              'x-auth-token': this.$store.state.user.token,
            },
          }
        )
        console.log(data)
        console.log(this.tweets)
        this.tweets.unshift(data.tweet)
        this.tweet = ''
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
})
</script>

<style scoped>
.indexWrapper {
  flex-grow: 15;
}
header {
  width: 100%;
  background: #fff;
  padding: 20px;
  border: 1px solid gray;
}

header h4 {
  color: gray;
  font-size: 20px;
  margin: 10px 0px;
}

.wrapperTweet {
  width: 100%;
  background: #fff;
  padding: 20px;
  border: 1px solid gray;
}
</style>
