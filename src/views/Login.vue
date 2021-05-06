<template>
  <main class="imagery">
    <div class="login">
      <div class="signup-form">
        <form v-on:submit.prevent="submit()">
          <h2>Log In</h2>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="email"
              placeholder="Email"
              required="required"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              required="required"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">Log In</button>
          </div>
          <div class="mt-5">
            <small class="text-center">
              Need an account?
              <a href="/signup">Sign up here</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("username", response.data.username);
          this.$router.push({ path: "/" + localStorage.getItem("username") + "/addjoy" });
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
