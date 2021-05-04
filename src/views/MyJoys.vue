/* eslint-disable prettier/prettier */
<template>
  <main>
    <div class="container-fluid sticky-top position-fixed bgorangegrad offsetpaddingmargin pb-5">
      <div class="w-75 text-center pt-5">
        <div class="row">
          <div class="col-md-6">
            <h1>My Joys</h1>
          </div>
          <div class="col-md-6">
            <form class="card card-sm">
              <div class="card-body p-0 row no-gutters align-items-center">
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
                    @search.prevent="keywordSearchMyJoys()"
                    @keydown.enter.prevent="keywordSearchMyJoys()"
                  />
                </div>
                <div class="col-auto">
                  <button @click.prevent="keywordSearchMyJoys()" class="btn btn-lg btn-primary btn-success">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="row align-items-center mt-4">
          <div class="col">
            <div class="btn-group">
              <button class="btn btn-primary me-2">2021</button>
              <button class="btn btn-primary me-2">
                All
                <!-- <span v-if="pagyObj">{{ totalCount }}</span> -->
              </button>
            </div>
          </div>
          <div class="col text-center">
            <div v-if="pagyObj" class="btn-group">
              <button @click="goToPage(1)" :disabled="!pagyObj.prev" class="btn btn-primary btn-sm">Start</button>

              <button @click="goToPage(pagyObj.prev)" :disabled="!pagyObj.prev" class="btn btn-primary btn-sm">
                Previous
              </button>

              <input v-model.number="pageNum" @change="keywordSearchMyJoys()" />

              <button @click="goToPage(pagyObj.next)" :disabled="!pagyObj.next" class="btn btn-primary btn-sm">
                Next
              </button>

              <button @click="goToPage(pagyObj.last)" :disabled="!pagyObj.next" class="btn btn-primary btn-sm">
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container-fluid sticky-top position-fixed bg-cream pb-4 ps-0">
      <div class="row banner mb-3">
        <div class="col-12 col-md-10 col-lg-8 py-4 mx-auto">
          <h2>My Joys</h2>
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
                  @search.prevent="keywordSearchMyJoys()"
                  @keydown.enter.prevent="keywordSearchMyJoys()"
                />
              </div>
              <div class="col-auto">
                <button @click.prevent="keywordSearchMyJoys()" class="btn btn-lg btn-primary btn-success">
                  Search
                </button>
              </div>
            </div>
          </form>
          <div v-if="keyword_search">
            Your search results for
            <span class="text-uppercase">{{ keyword_search }}</span>
          </div>
        </div>
        <p v-if="pagyObj">Showing {{ pagyObj.items }} Of {{ totalCount }} of Your Joys</p>
        <div v-if="pagyObj">
          
    <button @click="goToPage(1)" :disabled="!pagyObj.prev">Start</button>

          <button @click="goToPage(pagyObj.prev)" :disabled="!pagyObj.prev">Previous</button>

          <input v-model.number="pageNum" @change="keywordSearchMyJoys()" />

          <button @click="goToPage(pagyObj.next)" :disabled="!pagyObj.next">Next</button>

          <button @click="goToPage(pagyObj.last)" :disabled="!pagyObj.next">>></button>
        </div>
      </div>
    </div> -->
    <div class="container-fluid">
      <div id="viewjoys" class="row py-5 justify-content-center">
        <div v-if="keyword_search" class="text-center font-bold">
          Your search results for
          <span class="text-uppercase">{{ keyword_search }}</span>
        </div>
        <div v-if="joys.length > 0">
          <div class="container joys">
            <div class="col-md-10 mx-auto">
              <div class="row my-4 justify-content-center">
                <div v-for="joy in joys" v-bind:key="joy.id">
                  <!-- <div v-if="joy.user_id == user_id"> -->
                  <div class="card my-3 px-0 shadow grow">
                    <div class="card-block">
                      <div class="row">
                        <div class="col-md-10 pt-4 px-0">
                          <div class="px-3">
                            <router-link
                              title="View this Joy"
                              v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/' + joy.id }"
                            >
                              <h1 class="card-text brandname pink">{{ joy.body }}</h1>
                            </router-link>
                          </div>
                          <div class="card-footer mb-2">
                            <div class="card-text text-right">
                              <small class="text-uppercase">
                                You wrote this {{ joy.updated_at | diffForHumans }} |
                                <span v-if="joy.visibility == true">Public Joy</span>
                                <span v-if="joy.visibility == false">Private Joy</span>
                                <router-link
                                  title="Edit this Joy"
                                  v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/edit/' + joy.id }"
                                  class="ms-5"
                                >
                                  Edit Entry
                                </router-link>
                              </small>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2 pilledge p-0">
                          <router-link
                            title="Spread Joy"
                            v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/share/' + joy.id }"
                          >
                            <img src="/images/spreads_joy_icon.svg" alt="spreads joy" title="Spreads Joy" height="40" />
                            <br />
                            Spreads
                            <br />
                            Joy
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- </div> -->
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
      isNewKeyword: false,
      keyword_search: "",
      pageNum: 1,
      pagyObj: null,
    };
  },
  computed: {
    totalCount() {
      return this.pagyObj.items * this.pagyObj.pages;
    },
  },
  watch: {
    keyword_search(newValue, oldValue) {
      if (newValue !== oldValue) this.isNewKeyword = true;
    },
  },
  created: function () {
    // this.indexJoys();
    this.keywordSearchMyJoys();
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
      axios
        .get("/api/joys.json", {
          params: {
            page: this.pageNum,
          },
        })
        .then((response) => {
          this.joys = response.data.joys;
          this.pagyObj = response.data.pagy;
          this.pageNum = this.pagyObj.page;
          console.log("all joys:", this.joys);
        });
    },
    keywordSearchMyJoys: function () {
      if (this.isNewKeyword) {
        this.pageNum = 1;
        this.isNewKeyword = false;
      }
      console.log("keyword search:", this.keyword_search);
      // console.log("/api/joys/?keyword_search=" + this.keyword_search + "&user_id=" + this.user_id);
      console.log(`/api/joys/?keyword_search=${this.keyword_search}&user_id=${this.user_id}&page=${this.pageNum}`);
      axios
        .get(`/api/joys/?keyword_search=${this.keyword_search}&user_id=${this.user_id}&page=${this.pageNum}`)
        .then((response) => {
          this.joys = response.data.joys;
          this.pagyObj = response.data.pagy;
          this.pageNum = this.pagyObj.page;
          console.log("search results joys:", this.joys);
          console.log("pagy:", this.pagyObj);
        });
    },
    getCurrentUsername: function () {
      return localStorage.getItem("username");
    },
    goToPage: function (newPageNumber) {
      console.log(newPageNumber);
      this.pageNum = newPageNumber;
      // this.indexJoys();
      this.keywordSearchMyJoys();
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
          console.log(response.data.joys);
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
