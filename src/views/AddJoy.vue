<template>
  <main class="imagery">
    <div class="container-fluid">
      <div class="row pt-3 pb-5">
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="col-md-8 mx-auto text-center">
          <img class="mb-2" src="/images/whatbrought-joy.png" width="400" alt="What brought you joy?" />
          <div class="username">
            <!-- <h2>What Brought You Joy Today, {{ getCurrentUsername() }}?</h2> -->
            <form v-on:submit.prevent="createJoy()">
              <div class="form-group">
                <textarea
                  class="form-control addjoy"
                  placeholder="Add your joy"
                  v-model="body"
                  id="broughtjoy"
                  rows="6"
                  required
                ></textarea>
              </div>
              <div class="form-group my-3">
                <select class="form-control bg-tan" v-model="visibility" id="visibility">
                  <option value="true">Public Entry</option>
                  <option value="false">Private Entry</option>
                </select>
              </div>
              <div class="form-group mt-3">
                <button type="submit" class="btn grow btn-primary btn-lg shadow">Share Your Joy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

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
      // FRONT END CATCH
      // if (!this.body) {
      //   alert("Joy cannot be empty");
      //   return;
      // }
      var params = {
        body: this.body,
        visibility: this.visibility,
      };
      console.log("Creating your new joy.");
      axios
        .post("/api/joys/", params)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "MyJoys" });
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = error.response.data.error;
        });
    },
  },
};
</script>
