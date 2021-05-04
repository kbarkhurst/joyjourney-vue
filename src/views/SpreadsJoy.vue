<template>
  <main>
    <div class="bgorangegrad offsetpaddingmargin text-center py-4">
      <h5>You are inspired by the following:</h5>
      <h3 class="mb-0 script">{{ joy.body }}</h3>
      <small>
        <router-link title="View Joys" v-bind:to="{ path: '/' + joy.username }">
          {{ joy.username }}
        </router-link>
        wrote {{ joy.updated_at | diffForHumans }}
      </small>
    </div>
    <div class="container-fluid">
      <div class="row py-5">
        <div class="col-md-10 bgtan-gradient mx-auto border-radius-8 jjshadow">
          <div class="col-md-10 mx-auto pb-4">
            <div>
              <h2 class="mt-5 mb-3 script orange">Write how this brings you joy, too</h2>
              <form v-on:submit.prevent="createJoy()">
                <div class="form-group">
                  <textarea
                    class="form-control addjoy"
                    rows="6"
                    placeholder="Add your joy..."
                    v-model="body"
                  ></textarea>
                </div>
                <div class="form-group my-3">
                  <select class="form-control" v-model="visibility">
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
    </div>
  </main>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default {
  data: function () {
    return {
      joy: {},
      body: "",
      visibility: true,
    };
  },
  created: function () {
    axios.get(`/api/joys/${this.$route.params.id}`).then((response) => {
      console.log(`/api/joys/${this.$route.params.id}`);
      console.log(response.data);
      this.joy = response.data;
    });
    dayjs.extend(relativeTime);
  },
  filters: {
    diffForHumans: (date) => {
      if (!date) {
        return null;
      }

      return dayjs(date).fromNow();
    },
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
        parent_id: this.joy.id,
      };
      console.log("the original joy is the parent_id:" + this.joy.id);
      axios
        .post("/api/joys/", params)
        .then((response) => {
          console.log(response.data);
          // this.$router.push("{ path: '/' + getCurrentUsername() }");
          this.$router.push({ path: "/" + this.getCurrentUsername() + "/joys" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
