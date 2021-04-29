<template>
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
      </form>
      <div class="text-center">
        Need an account?
        <a href="/signup">Sign-up here</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  min-height: 41px;
  box-shadow: none;
  border-color: #e6e6e6;
}
.form-control:focus {
  border-color: #00c1c0;
}
.form-control,
.btn {
  border-radius: 3px;
}
.signup-form {
  width: 425px;
  margin: 0 auto;
  padding: 30px 0;
}
.signup-form h2 {
  color: #333;
  font-weight: bold;
  margin: 0 0 25px;
}
.signup-form form {
  margin-bottom: 15px;
  background: #fff;
  border: 1px solid #f4f4f4;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 40px 50px;
}
.signup-form .form-group {
  margin-bottom: 20px;
}
.signup-form label {
  font-weight: normal;
  font-size: 14px;
}
.signup-form input[type="checkbox"] {
  position: relative;
  top: 1px;
}
.signup-form .btn,
.signup-form .btn:active {
  font-size: 16px;
  font-weight: bold;
  background: #00c1c0 !important;
  border: none;
  min-width: 140px;
}
.signup-form .btn:hover,
.signup-form .btn:focus {
  background: #00b3b3 !important;
}
.signup-form a {
  color: #00c1c0;
  text-decoration: none;
}
.signup-form a:hover {
  text-decoration: underline;
}
</style>
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
          this.$router.push({ path: "/" + localStorage.getItem("username") + "/joys" });
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
