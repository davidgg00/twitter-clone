<template>
  <div class="tweet">
    <div class="wrapperIcon">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        alt=""
      />
    </div>
    <div class="wrapperContent">
      <div class="wrapperName">
        <h5>{{ tweet.user.first_name }} {{ tweet.user.last_name }}</h5>
        <p>
          <span>@{{ tweet.user.username }}</span>
        </p>
      </div>
      <p class="tweet_text">
        {{ tweet.tweet_text }}
      </p>
      <div class="actions">
        <div class="actionWrapper">
          <i
            class="fas fa-heart active"
            v-if="
              tweet.likes.find(
                (x) => x.user_id_send === $store.state.user.info.id
              ) !== undefined
            "
            @click="removeLike"
          ></i>
          <i class="fas fa-heart" v-else @click="likeTweet"></i>
          <span>{{ tweet.likes.length }}</span>
        </div>
        <div class="actionWrapper">
          <i
            class="fas fa-retweet activeRT"
            v-if="
              tweet.retweets.find(
                (x) => x.user_id_send === $store.state.user.info.id
              ) !== undefined
            "
            @click="removeRetweet"
          ></i>
          <i class="fas fa-retweet" v-else @click="retweet"></i>
          <span>{{ tweet.retweets.length }}</span>
        </div>
        <div class="actionWrapper">
          <i class="fas fa-comment" @click="comment"></i>
        </div>
        <div class="actionWrapper">
          <i
            class="fas fa-trash"
            v-if="$store.state.user.info.id === tweet.user.id"
            @click="removeTweet"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backendApiConnection from '../api/backendApiConnection'
export default {
  name: 'Tweet',
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async likeTweet() {
      const response = await backendApiConnection.post(
        'notification/new',
        {
          user_id: this.tweet.user.id,
          user_id_send: this.$store.state.user.info.id,
          type: 'like',
          tweet_id: this.tweet.id,
        },
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 201) {
        this.tweet.likes.push(response.data)
      }
    },

    async retweet() {
      const response = await backendApiConnection.post(
        'notification/new',
        {
          user_id: this.tweet.user.id,
          user_id_send: this.$store.state.user.info.id,
          type: 'retweet',
          tweet_id: this.tweet.id,
        },
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 201) {
        this.tweet.retweets.push(response.data)
      }
    },

    async removeLike() {
      const response = await backendApiConnection.delete(
        `notification/delete/${
          this.tweet.likes.find(
            (x) => x.user_id_send === this.$store.state.user.info.id
          ).id
        }`,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.tweet.likes = this.tweet.likes.filter(
          (x) => x.user_id_send !== this.$store.state.user.info.id
        )
      }
    },

    async removeRetweet() {
      const response = await backendApiConnection.delete(
        `notification/delete/${
          this.tweet.retweets.find(
            (x) => x.user_id_send === this.$store.state.user.info.id
          ).id
        }`,
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
      if (response.status === 200) {
        this.tweet.retweets = this.tweet.retweets.filter(
          (x) => x.user_id_send !== this.$store.state.user.info.id
        )
      }
    },

    async removeTweet() {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
        .then(async (result) => {
          if (result.value) {
            const response = await backendApiConnection.delete(
              `tweet/delete/${this.tweet.id}`,
              {
                headers: {
                  'x-auth-token': this.$store.state.user.token,
                },
              }
            )
            if (response.status === 200) {
              this.$emit('removeTweet', this.tweet.id)
              this.$swal.fire(
                'Deleted!',
                'Your tweet has been deleted.',
                'success'
              )
            }
          }
        })
    },

    async comment() {
      const { value: text } = await this.$swal.fire({
        input: 'textarea',
        inputLabel: 'Write Comment',
        inputPlaceholder: 'Type your tweet here...',
        inputAttributes: {
          'aria-label': 'Type your tweet here',
        },
        showCancelButton: true,
      })

      this.$swal.fire(text)
      await backendApiConnection.post(
        'tweet/send',
        {
          user_id: this.$store.state.user.info.id,
          tweet_text: text,
          original_tweet_id: this.tweet.id,
        },
        {
          headers: {
            'x-auth-token': this.$store.state.user.token,
          },
        }
      )
    },
  },
}
</script>

<style scoped>
h5 {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 20px;
  font-size: 16px;
}

.tweet {
  display: flex;
  flex-direction: row;
  background: #fff;
  margin-top: 10px;
  border-bottom: 1px solid black;
  padding: 10px 10px 0px 10px;
}

.wrapperIcon {
  margin-left: 10px;
  margin-right: 30px;
}

.wrapperIcon img {
  border-radius: 50%;
}

.wrapperContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wrapperName {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.wrapperName p {
  margin-top: 5px;
  margin-bottom: 5px;
}

img {
  width: 100px;
}

.tweet_text {
  margin-top: 0px;
}

.actions {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.actions i:hover {
  cursor: pointer;
}

.fa-heart:hover {
  color: red;
}

.fa-retweet:hover,
.activeRT {
  color: blue;
}

.fa-comment:hover {
  color: green;
}

.fa-trash:hover,
.active {
  color: red;
}

.actionWrapper {
  display: flex;
  flex-direction: row;
  margin-right: 100px;
}

.actionWrapper span {
  margin-left: 5px;
}
</style>
