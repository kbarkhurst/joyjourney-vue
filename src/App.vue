<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-sm navbar-light">
        <div class="container">
          <a class="navbar-brand" href="/">JoyJourneys</a>
          <ul class="navbar-nav mr-auto">
            <!-- <li>
              <router-link to="/">Home</router-link>
            </li> -->
            <li class="nav-item" v-if="!isLoggedIn()">
              <router-link to="/signup">Sign Up</router-link>
            </li>

            <li class="nav-item" v-if="!isLoggedIn()">
              <router-link to="/login">Log In</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <router-link to="/joysnew">My Joys</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <router-link to="/editjoy">Edit Joy</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <router-link to="/logout">Log Out</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style>
/* @import "src/styles/styles.css"; */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
