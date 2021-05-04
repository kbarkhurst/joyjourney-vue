<template>
  <main>
    <div class="container-fluid joys">
      <div class="row py-5">
        <div class="col-md-10 mx-auto">
          <p><a href="#" @click="goBack">Go Back</a></p>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div v-if="joy.parents && joy.parents.length > 0" class="my-5">
            <h3 class="serif">Inspired by</h3>
            <div v-for="parent in joy.parents" v-bind:key="parent.id">
              <div class="card my-3 px-0 text-center shadow">
                <div class="card-block">
                  <div class="row">
                    <div class="col-md-10 pt-4 px-0">
                      <div class="px-3">
                        <router-link
                          title="Show this Joy"
                          v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/' + parent.id }"
                        >
                          <h1 class="card-text brandname pink">{{ parent.body }}</h1>
                        </router-link>
                      </div>
                      <div class="card-footer mb-2">
                        <div class="card-text text-right">
                          <small class="name text-uppercase">
                            <router-link title="View Joys" v-bind:to="{ path: '/' + parent.username }">
                              {{ parent.username }}
                            </router-link>
                            wrote this {{ parent.updated_at | diffForHumans }}
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
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-10 mx-auto">
          <h2 class="serif">Your joy</h2>
          <div class="card my-3 px-0 text-center shadow scaled">
            <div class="card-block">
              <div class="row">
                <div class="col-md-10 pt-4 px-0">
                  <div class="px-3">
                    <router-link
                      title="Show this Joy"
                      v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/' + joy.id }"
                    >
                      <h1 class="card-text brandname pink">{{ joy.body }}</h1>
                    </router-link>
                  </div>
                  <div class="card-footer mb-2">
                    <div class="card-text text-right">
                      <small class="name text-uppercase">
                        <router-link title="View Joys" v-bind:to="{ path: '/' + joy.username }">
                          {{ joy.username }}
                        </router-link>
                        wrote this {{ joy.updated_at | diffForHumans }}
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
        </div>
      </div>

      <!-- <h1>{{ joy.body }}</h1>
          <small class="text-uppercase">{{ joy.username }} wrote this {{ joy.created_at | diffForHumans }}</small>
        </div>
      </div> -->

      <div v-if="joy.inspireds && joy.inspireds.length > 0" class="row">
        <h2 class="serif">Inspired The Following</h2>
        <div v-for="inspired in joy.inspireds" v-bind:key="inspired.id">
          <div class="my-4">
            <!-- <router-link title="Show this Joy" to="{ name: 'ShowJoy'}, params: { username: inspired.username }">
              <p class="mb-0">{{ inspired.body }}</p>
            </router-link> -->
            <router-link
              title="Show this Joy"
              v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/' + inspired.id }"
            >
              <p class="mb-0">{{ inspired.body }}</p>
            </router-link>

            <small class="name text-uppercase">
              <router-link title="View Joys" v-bind:to="{ path: '/' + joy.username }">
                {{ inspired.username }}
              </router-link>
              wrote this {{ inspired.created_at | diffForHumans }}
              <!-- | {{ inspired.visibility }} -->
            </small>
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
      errors: [],
      inspireds: {},
      parents: {},
      body: "",
      username: "",
    };
  },
  created: function () {
    this.$watch(
      () => this.$route.params.id,
      (toJoyId, fromJoyId) => {
        console.log(`To ${toJoyId}`, `From ${fromJoyId}`);
        // react to route changes...
        this.fetchJoy(toJoyId);
      }
    );

    this.fetchJoy(this.$route.params.id);
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
    fetchJoy(toJoyId) {
      axios.get(`/api/joys/${toJoyId}`).then((response) => {
        console.log(`/api/joys/${toJoyId}`);
        console.log(response.data);
        this.joy = response.data;
      });
    },
    goBack: function () {
      return this.$router.go(-1);
    },
    getCurrentUsername: function () {
      return localStorage.getItem("username");
    },
  },
};
</script>
