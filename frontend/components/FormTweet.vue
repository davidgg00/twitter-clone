<template>
  <div class="writeTweet">
    <form @submit.prevent="">
      <div class="wrapperIcon">
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          alt=""
        />
      </div>
      <textarea
        name="content"
        placeholder="What's happening?"
        v-model="content"
      ></textarea>
      <div class="buttons">
        <button type="button">
          <i class="fas fa-camera">Image</i>
        </button>
        <button @click="sendTweet">Tweet</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormTweet',
  data() {
    return {
      content: '',
    }
  },
  methods: {
    sendTweet() {
      this.$emit('send-tweet', this.content)
      this.content = ''
    },
  },
}
</script>

<style scoped>
.writeTweet {
  background: #fff;
  padding: 20px;
  border: 1px solid gray;
}

.writeTweet form {
  display: flex;
  flex-wrap: wrap;
}

.wrapperIcon {
  margin-right: 10px;
}

textarea {
  width: 70%;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-self: flex-start;
}

.buttons button {
  width: 25%;
}

img {
  width: 100px;
}
</style>
