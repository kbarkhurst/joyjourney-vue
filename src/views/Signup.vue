<template>
  <main>
    <div class="login">
      <div class="signup-form">
        <form v-on:submit.prevent="submit()">
          <h2>Start your Joy Journey</h2>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="first_name"
              placeholder="First Name"
              required="required"
              v-model="first_name"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="last_name"
              placeholder="Last Name"
              required="required"
              v-model="last_name"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Username"
              required="required"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email Address"
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
            <input
              type="password"
              class="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
              required="required"
              v-model="passwordConfirmation"
            />
          </div>
          <!-- <div class="form-group">
            <label class="form-check-label">
              <input type="checkbox" required="required" />
              I accept the
              <a href="#">Terms of Use</a>
              &amp;
              <a href="#">Privacy Policy</a>
            </label>
          </div> -->
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
          </div>
          <div class="mt-5">
            <small class="text-center">
              Already have an account?
              <a href="/login">Login here</a>
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
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
