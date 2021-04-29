<template>
  <div id="app">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-orangegradient fixed-top" id="sideNav">
      <a class="navbar-brand">
        <span class="d-block d-lg-none">Joy Journey</span>
        <span class="d-none d-lg-block">
          <img
            class="img-fluid mx-auto mb-2"
            style="min-width: 200px"
            src="/images/joyjourney-flower-gradient-01.svg"
            alt="Patricia Barnes"
          />
        </span>
      </a>
      <h2 class="brandname">Joy Journey</h2>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <!-- <li class="nav-item" v-if="isLoggedIn()">Hi, {{ getCurrentUsername() }}!</li> -->
          <li class="nav-item" v-if="!isLoggedIn()">
            <router-link to="/signup" class="nav-link">Sign Up</router-link>
          </li>

          <li class="nav-item" v-if="!isLoggedIn()">
            <router-link to="/login" class="nav-link">Log In</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn()">
            <router-link :to="{ path: '/' + getCurrentUsername() + '/addjoy' }" class="nav-link">Add Joy</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn()">
            <router-link :to="{ path: '/' + getCurrentUsername() + '/joys' }" class="nav-link">My Joys</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn()">
            <router-link :to="{ path: '/' + getCurrentUsername() + '/explore' }" class="nav-link">
              Explore Joys
            </router-link>
          </li>
          <li class="nav-item nav-secondary" v-if="isLoggedIn()">
            <router-link to="/logout" class="">Log Out</router-link>
          </li>
          <!-- <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">About</a></li>
            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#experience">Experience</a></li>
            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#education">Education</a></li>
            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#skills">Skills</a></li>
            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#interests">Interests</a></li>
            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#awards">Awards</a></li> -->
        </ul>
      </div>
    </nav>

    <!-- <nav class="navbar navbar-expand-sm navbar-light">
        <div class="container">
          <a class="navbar-brand" href="/">JoyJourneys</a>
          <ul class="navbar-nav mr-auto">
            <p v-if="isLoggedIn()" class="pe-2">Hi, {{ getCurrentUsername() }}!</p>
            <li class="nav-item" v-if="!isLoggedIn()">
              <router-link to="/signup">Sign Up</router-link>
            </li>

            <li class="nav-item" v-if="!isLoggedIn()">
              <router-link to="/login">Log In</router-link>
            </li>
            <li class="nav-item pe-2" v-if="isLoggedIn()">
              <router-link :to="{ path: '/' + getCurrentUsername() }">My Joys</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <router-link to="/logout">Log Out</router-link>
            </li>
          </ul>
        </div>
      </nav> -->
    <router-view />
  </div>
</template>

<style>
/* @import "src/styles/styles.css"; */
#app {
  text-align: center;
  color: #2c3e50;
  background-color: #fcf6d1;
  height: 100vh;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
<script>
export default {
  data: function () {
    return {
      username: localStorage.getItem("username"),
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    getCurrentUsername: function () {
      return localStorage.getItem("username");
    },
  },
};
</script>
