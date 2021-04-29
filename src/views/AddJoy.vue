<template>
  <main>
    <div class="container-fluid">
      <div class="row py-5">
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="col-md-6 mx-auto">
          <div class="username">
            <h2>What Brought You Joy Today, {{ getCurrentUsername() }}?</h2>
            <form v-on:submit.prevent="createJoy()">
              <div class="form-group">
                <textarea
                  class="form-control"
                  placeholder="Add your joy"
                  v-model="body"
                  id="broughtjoy"
                  rows="6"
                ></textarea>
              </div>
              <div class="form-group my-3">
                <select class="form-control" v-model="visibility" id="visibility">
                  <option value="true">Public Entry</option>
                  <option value="false">Private Entry</option>
                </select>
              </div>
              <div class="form-group mt-3">
                <button type="submit" class="btn btn-primary btn-lg">Share Joy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.form-control-borderless {
  border: none;
}

.form-control-borderless:hover,
.form-control-borderless:active,
.form-control-borderless:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
</style>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      visibility: true,
      user_id: localStorage.getItem("user_id"),
      username: localStorage.getItem("username"),
      body: "",
      joy: "",
      errors: [],
    };
  },
  methods: {
    getCurrentUsername: function () {
      return localStorage.getItem("username");
    },
    createJoy: function () {
      console.log("Creating your new joy.");
      var params = {
        body: this.body,
        visibility: this.visibility,
      };
      axios
        .post("/api/joys/", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "MyJoys" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
