<template>
  <main>
    <div class="banner">
      <div class="row justify-content-center pb-3">
        <div class="col-md-9 text-left">
          <h2 class="float-left">About {{ userName }}</h2>
          <img
            v-if="userName === 'Patricia'"
            src="/images/patricia-barnes.jpg"
            class="float-left rounded-circle moon"
            width="200"
          />
          <div class="float-left" v-if="userInfo && userInfo.journal_description">
            {{ userInfo.journal_description }}
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div id="viewjoys" class="row py-5 justify-content-center">
        <div v-if="keyword_search">
          Your search results for
          <span class="text-uppercase">{{ keyword_search }}</span>
        </div>
        <div v-if="joys.length > 0">
          <div class="container joys">
            <div class="row justify-content-evenly">
              <div class="col-md-10">
                <h2>{{ userName }}'s Joys</h2>
                <!-- <small>Search joys by years</small>
                <div class="btn-group" v-for="year in years" v-bind:key="year.id">
                  <button class="btn btn-primary m-2" v-on:click="onYearFilter(year)">{{ year }}</button>
                </div>
                <button class="btn btn-primary m-2" v-on:click="keywordSearchMyJoys()">All</button>
                <p v-if="pagyObj">{{ totalCount }} Joys</p>
                <p v-if="pagyObj">Showing {{ pagyObj.items }} Of {{ totalCount }} of Your Joys</p> -->
              </div>
            </div>
            <div class="row align-items-top mt-4">
              <div class="col-md-5">
                <small class="mb-2" style="display: block">Display joys by year</small>

                <div class="btn-group" v-for="year in years" v-bind:key="year.id">
                  <button
                    class="btn btn-primary me-2"
                    :class="{ active: yearSelected === year }"
                    v-on:click="onYearFilter(year)"
                  >
                    {{ year }}
                  </button>
                </div>
                <button
                  class="btn btn-primary m-2"
                  :class="{ active: yearSelected === null }"
                  v-on:click="onYearFilter(null)"
                >
                  All
                </button>
                <!-- <p v-if="pagyObj">{{ totalCount }} Joys</p>
            <p v-if="pagyObj">Showing {{ pagyObj.items }} Of {{ totalCount }} of Your Joys</p>
            <h2>{{ userName }}'s Joys</h2> -->
              </div>
              <div class="col text-center">
                <small class="mb-2" style="display: block">Pagination / Displays up to 30 Joys per page</small>
                <div v-if="pagyObj" class="btn-group">
                  <button @click="goToPage(1)" :disabled="!pagyObj.prev" class="btn btn-primary">First</button>

                  <button @click="goToPage(pagyObj.prev)" :disabled="!pagyObj.prev" class="btn btn-primary">
                    Previous
                  </button>

                  <input v-model.number="pageNum" @change="keywordSearchMyJoys()" />

                  <button @click="goToPage(pagyObj.next)" :disabled="!pagyObj.next" class="btn btn-primary">
                    Next
                  </button>

                  <button @click="goToPage(pagyObj.last)" :disabled="!pagyObj.next" class="btn btn-primary">
                    Last
                  </button>
                </div>
              </div>
            </div>
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
                                {{ userName }} wrote this {{ joy.updated_at | diffForHumans }} |
                                <span v-if="joy.visibility == true">Public Joy</span>
                                <span v-if="joy.visibility == false">Private Joy</span>
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
            <div class="text-center" v-if="pagyObj">
              <!-- buttons -->
              <button @click="goToPage(1)" :disabled="!pagyObj.prev">Start</button>

              <button @click="goToPage(pagyObj.prev)" :disabled="!pagyObj.prev">Previous</button>

              <input v-model.number="pageNum" @change="keywordSearchMyJoys()" />

              <button @click="goToPage(pagyObj.next)" :disabled="!pagyObj.next">Next</button>

              <button @click="goToPage(pagyObj.last)" :disabled="!pagyObj.next">>></button>
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
      userInfo: null,
      years: [],
      yearSelected: null,
    };
  },
  computed: {
    totalCount() {
      return this.pagyObj.items * this.pagyObj.pages;
    },
    userName() {
      return this.$route.params.username;
    },
  },
  watch: {
    keyword_search(newValue, oldValue) {
      if (newValue !== oldValue) this.isNewKeyword = true;
    },
  },
  created: function () {
    axios
      .get(`/api/users?username=${this.userName}`)
      .then(({ data }) => {
        this.userInfo = data;
        // this.indexJoys();
        this.keywordSearchMyJoys();
        this.viewByYear();
      })
      .catch((error) => (this.errors = error));
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
      // console.log(`/api/joys/?keyword_search=${this.keyword_search}&user_id=${this.user_id}&page=${this.pageNum}`);
      axios
        .get(`/api/joys/?keyword_search=${this.keyword_search}&user_id=${this.userInfo.user}&page=${this.pageNum}`)
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
    onYearFilter: function (year) {
      if (this.yearSelected === year) return;

      if (!year) {
        this.yearSelected = year;
        this.keywordSearchMyJoys();
        return;
      } else {
        this.yearSelected = year;
      }

      let apiUrl = `/api/joys/?user_id=${this.userInfo.user}&page=${this.pageNum}&year=${year}`;
      if (this.keyword_search || this.keyword_search.length > 0) {
        apiUrl += `&keyword_search=${this.keyword_search}`;
      }
      axios.get(apiUrl).then((response) => {
        this.joys = response.data.joys;
        this.pagyObj = response.data.pagy;
        this.pageNum = this.pagyObj.page;
        console.log("search results joys:", this.joys);
        console.log("pagy:", this.pagyObj);
      });
    },
    spreadsJoy: function () {
      console.log("Spreading Joy");
    },
    viewByYear: function () {
      axios.get(`/api/joys/years/${this.userInfo.user}`).then((response) => {
        this.years = response.data.years;
        console.log("Entries for these years:", this.years);
      });
    },
  },
};
</script>
