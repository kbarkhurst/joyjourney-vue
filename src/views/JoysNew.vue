<template>
  <div class="container-fluid">
    <div class="row py-5">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="col-md-6 mx-auto">
        <div class="username">
          <h1>What Brought You Joy Today, {{ getUsername() }}?</h1>
          <form v-on:submit.prevent="createJoy()">
            <div class="form-group">
              <textarea class="form-control" v-model="body" id="broughtjoy" rows="6"></textarea>
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
    <!-- <div class="row bg-light py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <label class="h2" for="joysearch">Search your Joy Journey</label>
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              
              <div class="col">
                <input
                  v-model="keyword_search"
                  class="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Enter Joyful Search Term"
                  id="joysearch"
                />
              </div>
              
              <div class="col-auto">
                <button @click.prevent="keywordSearchJoys" class="btn btn-lg btn-success" type="submit">Search</button>
              </div>
              
            </div>
          </form>
        </div>
        
      </div>
    </div> -->
    <div id="viewjoys" class="row py-5">
      <h2>Joys</h2>

      <div class="col-10 mx-auto">
        <ul class="nav nav-tabs nav-justified">
          <li class="nav-item">
            <a class="nav-link" @click.prevent="setActive('mine')" :class="{ active: isActive('mine') }" href="#mine">
              My Joys
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              @click.prevent="setActive('public')"
              :class="{ active: isActive('public') }"
              href="#public"
            >
              All Public Joys
            </a>
          </li>
        </ul>
        <div class="tab-content py-3" id="myTabContent">
          <div class="tab-pane fade" :class="{ 'active show': isActive('mine') }" id="mine">
            <div class="row justify-content-center">
              <p>Select Date Range to Filter Joys</p>
              <div class="col-12 col-md-10 col-lg-8">
                <label class="h4" for="joysearch">Search your Joy Journey</label>
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
                      />
                    </div>
                    <!--end of col-->
                    <div class="col-auto">
                      <button @click.prevent="keywordSearchJoys" class="btn btn-lg btn-success" type="submit">
                        Search
                      </button>
                    </div>
                    <!--end of col-->
                  </div>
                </form>
              </div>
              <!--end of col-->
            </div>
            <div v-if="keyword_search">
              Search results for
              <span class="text-uppercase">{{ keyword_search }}</span>
            </div>
            <div v-for="joy in joys" v-bind:key="joy.id">
              <div v-if="joy.user_id == user_id">
                <div class="my-4">
                  <p class="mb-0">{{ joy.body }}</p>
                  <small class="text-uppercase">
                    You wrote this {{ joy.updated_at | diffForHumans }} |
                    <span v-if="joy.visibility == true">Public Joy</span>
                    <span v-if="joy.visibility == false">Private Joy</span>
                    <router-link title="Edit this Joy" v-bind:to="{ path: '/' + getUsername() + '/joys/' + joy.id }">
                      Edit
                    </router-link>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" :class="{ 'active show': isActive('public') }" id="public">
            <div v-for="joy in joys" v-bind:key="joy.id">
              <div v-if="joy.visibility">
                <div class="my-4">
                  <p class="mb-0">{{ joy.body }}</p>
                  <small class="text-uppercase">
                    {{ joy.username }} wrote this {{ joy.updated_at | diffForHumans }} | {{ joy.visibility }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  // name: "Username",
  // props: {
  //   username: {
  //     type: String,
  //     required: true,
  //     keyword: "",
  //   },
  // },
  // computed: {
  //   getUserName() {
  //     axios.get("/api/users/" + localStorage.getItem("user_id")).then(({ data }) => (this.username = data));
  //   },
  // },
  data: function () {
    return {
      joys: [],
      visibility: true,
      user_id: localStorage.getItem("user_id"),
      body: "",
      joy: "",
      activeItem: "mine",
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
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    indexJoys: function () {
      axios.get("/api/joys").then((response) => {
        this.joys = response.data;
        console.log("all joys:", this.joys);
      });
    },
    keywordSearchJoys: function () {
      console.log("keyword search:", this.keyword_search);
      let params = this.keyword_search;
      console.log("/api/joys/?keyword_search=" + params);
      axios.get("/api/joys/?keyword_search=" + params).then((response) => {
        this.joys = response.data;
        console.log("search results joys:", this.joys);
      });
    },
    getUsername: function () {
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
          // this.$router.push("{ path: '/' + getUsername() }");
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
