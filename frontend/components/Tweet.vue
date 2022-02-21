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
          <i class="fas fa-globe-americas"></i>
          <span>@{{ tweet.user.username }}</span>
        </p>
      </div>
      <p>
        {{ tweet.tweet_text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tweet',
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.tweet {
  display: flex;
  flex-direction: row;
  background: #fff;
}

.wrapperIcon {
  width: 25%;
}

.wrapperContent {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.wrapperName {
  display: flex;
  flex-direction: row;
  align-items: center;
}

img {
  width: 100px;
}
</style>
