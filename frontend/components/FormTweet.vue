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
    </form>
    <div class="buttons">
      <i class="fas fa-image"></i>
      <button @click="sendTweet">Tweet</button>
    </div>
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
  display: flex;
  flex-direction: column;
}

.writeTweet form {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
}

.wrapperIcon {
  margin-right: 10px;
}

.wrapperIcon img {
  border-radius: 50%;
}

textarea {
  width: calc(90% - 50px);
  border-radius: 10px;
  border: 2px solid black;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  width: 90%;
}

.buttons button {
  width: 100px;
  background: #ca2055;
  border-radius: 120px;
}

.buttons i {
  font-size: 35px;
}

img {
  width: 100px;
}
</style>
