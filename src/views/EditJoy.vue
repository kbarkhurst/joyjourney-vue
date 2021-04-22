<template>
  <div class="container">
    <h1>Edit your joy</h1>
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent="updateJoy(joy)">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group my-3">
            <select class="form-control" v-model="joy.visibility" id="visibility">
              <option value="true">Public Entry</option>
              <option value="false">Private Entry</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <textarea class="form-control" v-model="joy.body" id="broughtjoy" rows="6"></textarea>
          <div class="form-group mt-3">
            <a href="#" @click="goBack">Cancel</a>
            <button type="submit" class="btn btn-primary btn-lg">Resubmit Joy</button>
          </div>
        </div>
      </div>
    </form>
  </div>
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
    console.log(this.$route);
    axios.get("/api/joys/" + this.$route.params.id).then((response) => {
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
          this.$router.push("/joysnew");
        })
        .catch((error) => console.log(error.response));
    },
    goBack: function () {
      return this.$router.go(-1);
    },

  },
};
</script>
