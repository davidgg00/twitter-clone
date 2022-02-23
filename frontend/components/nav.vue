<template>
  <aside>
    <nav>
      <img
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
        alt=""
      />
      <a href="#"><i class="fa-solid fa-house"></i>Home</a>
      <a href="#"><i class="fa-solid fa-bell"></i>Notifications</a
      ><a href="#"><i class="fa-solid fa-user"></i>Profile</a
      ><a href="#"
        ><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</a
      >
    </nav>
  </aside>
</template>

<script>
export default {}
</script>

<style scoped>
nav {
  background: #fff;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid gray;
}

a:first-child {
  margin-top: 0px !important;
}

a {
  text-decoration: none;
  color: black;
  margin-top: 50px;
}

a:hover {
  color: #e27894;
}

a i {
  margin-right: 10px;
}

img {
  width: 100px;
}
</style>
