<template>
  <main>
    <div class="container-fluid">
      <div id="viewjoys" class="row py-5 justify-content-center">
        <h2>My Joys</h2>

        <div class="col-12 col-md-10 col-lg-8">
          <!-- <label class="h4" for="joysearch">Search your Joy Journey</label> -->
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              <!--end of col-->
              <div class="col">
                <input
                  v-model="keyword_search"
                  class="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Enter Joyful Search Term"
                  id="joysearch"
                  @search.prevent="keywordSearchMyJoys()"
                  @keydown.enter.prevent="keywordSearchMyJoys()"
                />
              </div>
              <!--end of col-->
              <div class="col-auto">
                <button @click.prevent="keywordSearchMyJoys()" class="btn btn-lg btn-success">Search</button>
              </div>
              <!--end of col-->
            </div>
          </form>
        </div>

        <div v-if="keyword_search">
          Search results for
          <span class="text-uppercase">{{ keyword_search }}</span>
        </div>
        <div class="container">
          <div v-if="joys.length > 0">
            <div v-for="joy in joys" v-bind:key="joy.id">
              <div v-if="joy.user_id == user_id">
                <div class="row my-5 justify-content-center">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-11 text-left">
                        <router-link
                          title="Show this Joy"
                          v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/' + joy.id }"
                        >
                          <p class="mb-0">{{ joy.body }}</p>
                        </router-link>
                        <small class="text-uppercase">
                          You wrote this {{ joy.updated_at | diffForHumans }} |
                          <span v-if="joy.visibility == true">Public Joy</span>
                          <span v-if="joy.visibility == false">Private Joy</span>
                          <router-link
                            title="Edit this Joy"
                            v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/edit/' + joy.id }"
                          >
                            Edit
                          </router-link>
                        </small>
                      </div>
                      <div class="col-1 float-start">
                        <router-link
                          title="Spread Joy"
                          v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/share/' + joy.id }"
                        >
                          <img src="/images/spreads_joy_icon.svg" alt="spreads joy" title="Spreads Joy" height="40" />
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Nothing matches your search</p>
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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default {
  data: function () {
    return {
      joys: [],
      visibility: true,
      user_id: localStorage.getItem("user_id"),
      body: "",
      joy: "",
      errors: [],
      keyword_search: "",
    };
  },
  created: function () {
    this.indexJoys();
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
  // watch: {
  //   keyword_search(newValue) {
  //     console.log(newValue);
  //     if (newValue == "") this.keywordSearchMyJoys();
  //   },
  // },
  methods: {
    indexJoys: function () {
      axios.get("/api/joys").then((response) => {
        this.joys = response.data;
        console.log("all joys:", this.joys);
      });
    },
    keywordSearchMyJoys: function () {
      console.log("keyword search:", this.keyword_search);
      let params = this.keyword_search;
      console.log("/api/joys/?keyword_search=" + params);
      axios.get("/api/joys/?keyword_search=" + params).then((response) => {
        this.joys = response.data;
        console.log("search results joys:", this.joys);
      });
    },
    getCurrentUsername: function () {
      return localStorage.getItem("username");
    },
    spreadsJoy: function () {
      console.log("Spreading Joy");
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
          // this.$router.push("{ path: '/' + getCurrentUsername() }");
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
