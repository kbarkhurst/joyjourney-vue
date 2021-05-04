<template>
  <main>
    <div class="container text-center">
      <div class="row">
        <div class="col-md-8 mx-auto mt-5">
          <h1 class="serif orange">Edit your joy</h1>
          <p>Created On: {{ joy.created_at }} | Last Updated:{{ joy.updated_at }}</p>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <form v-on:submit.prevent="updateJoy(joy)">
            <div class="row">
              <div class="form-group">
                <textarea class="form-control" v-model="joy.body" id="broughtjoy" rows="6"></textarea>
              </div>
              <div class="col-md-6 mx-auto">
                <div class="form-group my-3">
                  <select class="form-control" v-model="joy.visibility" id="visibility">
                    <option value="true">Public Entry</option>
                    <option value="false">Private Entry</option>
                  </select>
                </div>
              </div>
              <div class="form-group m-3">
                <a href="#" @click="goBack">Cancel</a>
                <button type="submit" class="btn btn-primary btn-lg m-3">Resubmit Joy</button>
              </div>
            </div>
          </form>
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
      joy: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/api/joys/${this.$route.params.id}`).then((response) => {
      console.log(`/api/joys/${this.$route.params.id}`);
      console.log(response.data);
      this.joy = response.data;
    });
  },
  methods: {
    updateJoy: function (joy) {
      console.log("Updating this joy");
      var params = {
        body: joy.body,
        visibility: joy.visibility,
      };
      axios
        .patch("/api/joys/" + this.$route.params.id, params)
        .then(() => {
          this.$router.push({ name: "ShowJoy" });
        })
        .catch((error) => console.log(error.response));
    },
    goBack: function () {
      return this.$router.go(-1);
    },
  },
};
</script>
