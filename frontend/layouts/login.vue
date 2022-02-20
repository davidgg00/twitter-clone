<template>
  <div class="wrapper">
    <div class="wrapperForm">
      <img
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
        alt=""
      />
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
/*Body bug sweet alert*/
html {
  overflow-y: auto;
}

body {
  background: #999999;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.wrapperForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  width: 350px;
  /* height: 425px; */
  border-radius: 10px;
  padding: 20px;
}

.wrapperForm img {
  width: 90px;
}

.wrapperForm h4 {
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

form button {
  width: 80%;
  border-radius: 5px;
  background: #2d2d2d;
  color: #ffffff;
  padding: 10px;
}

.login-enter-active,
.login-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.login-enter,
.login-leave-to {
  opacity: 0;
}
</style>
