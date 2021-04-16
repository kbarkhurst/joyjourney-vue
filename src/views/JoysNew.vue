<template>
  <div class="container-fluid">
    <div class="row py-5">
      <div class="col-md-6 mx-auto">
        <div class="username">
          <h1>What Brought You Joy Today, {{ username }}</h1>
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
    <div class="row bg-light py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h2>Search your Joy Journey</h2>
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              <!--end of col-->
              <div class="col">
                <input
                  class="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Enter Joyful Search Term"
                />
              </div>
              <!--end of col-->
              <div class="col-auto">
                <button class="btn btn-lg btn-success" type="submit">Search</button>
              </div>
              <!--end of col-->
            </div>
          </form>
        </div>
        <!--end of col-->
      </div>
    </div>
    <div id="viewjoys" class="row py-5">
      <h2>Joys</h2>
      <p>Select Date Range to Filter Joys</p>
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
            <div v-for="joy in joys" v-bind:key="joy.id">
              <div v-if="joy.user_id == user_id">
                <router-link title="More about this Joy" v-bind:to="`joys/${joy.id}`">
                  <div class="my-4">
                    <p class="mb-0">{{ joy.body }}</p>
                    <small class="text-uppercase">
                      {{ joy.username }} | Dateline {{ joy.updated_at }} | {{ joy.visibility }}
                    </small>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" :class="{ 'active show': isActive('public') }" id="public">
            <div v-for="joy in joys" v-bind:key="joy.id">
              <div v-if="joy.visibility">
                <div class="my-4">
                  <p class="mb-0">{{ joy.body }}</p>
                  <small class="text-uppercase">
                    {{ joy.username }} | Dateline {{ joy.updated_at }} | {{ joy.visibility }}
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
export default {
  name: "Username",
  props: {
    username: {
      type: String,
      required: true,
    },
  },
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
      yourusername: this.username,
    };
  },
  created: function () {
    this.indexJoys();
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
          this.$router.push("/:username/#viewjoys");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
