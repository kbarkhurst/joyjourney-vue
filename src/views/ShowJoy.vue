<template>
  <main>
    <div class="container-fluid joys">
      <div class="row">
        <div class="col-md-10 mx-auto">
          <p><a href="#" @click="goBack">Go Back</a></p>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <!-- If Joy is Yours  {{ user_id }} {{ joy.user_id }}-->
          <div v-if="user_id == joy.user_id">
            <!-- JOY IS YOURS -->

            <div v-if="joy.parents && joy.parents.length > 0" class="my-5">
              <h5 class="sans-serif text-center text-uppercase">Your Joy Was Inspired By This Joy</h5>
              <div class="row" v-for="parent in joy.parents" v-bind:key="parent.id">
                <div class="col-md-10 mx-auto">
                  <div class="card my-3 px-0 text-center shadow scaleddown grow">
                    <div class="card-block">
                      <div class="row">
                        <div class="col-md-10 pt-4 px-0">
                          <div class="px-3">
                            <router-link
                              title="Show this Joy"
                              v-bind:to="{ path: '/' + parent.username + '/joys/' + parent.id }"
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
            <div v-else class="text-center"><small class="pink text-uppercase">This joy is the start.</small></div>

            <div class="row my-4">
              <div class="col-md-10 mx-auto">
                <h5 class="mb-3 sans-serif text-center text-uppercase">Your Joy</h5>
                <div class="card my-3 px-0 text-center shadow scaledup">
                  <div class="row">
                    <div class="col-md-10 px-0 align-self-center">
                      <div class="p-3">
                        <h1 class="card-text brandname orange">{{ joy.body }}</h1>
                      </div>
                      <div class="card-footer fixed-footer">
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
                    <div class="col-md-2 pilledge p-3">
                      <router-link
                        title="Spread Joy"
                        v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/share/' + joy.id }"
                      >
                        <img
                          src="/images/spreads_joy_icon.svg"
                          alt="spreads joy"
                          title="Spreads Joy"
                          height="40"
                          class="img-fluid"
                        />
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

            <div class="row">
              <div class="col-md-10 mx-auto">
                <div v-if="joy.inspireds && joy.inspireds.length > 0" class="my-5">
                  <h5 class="mb-3 sans-serif text-center text-uppercase">Your joy inspired more joys</h5>
                  <div v-for="inspired in joy.inspireds" v-bind:key="inspired.id">
                    <div class="card my-3 px-0 text-center shadow scaleddown grow">
                      <div class="card-block">
                        <div class="row">
                          <div class="col-md-10 pt-4 px-0">
                            <div class="px-3">
                              <router-link
                                title="Show this Joy"
                                v-bind:to="{ path: '/' + inspired.username + '/joys/' + inspired.id }"
                              >
                                <h1 class="card-text brandname pink">{{ inspired.body }}</h1>
                              </router-link>
                            </div>
                            <div class="card-footer mb-2">
                              <div class="card-text text-right">
                                <small class="name text-uppercase">
                                  <router-link title="View Joys" v-bind:to="{ path: '/' + inspired.username }">
                                    {{ inspired.username }}
                                  </router-link>
                                  wrote this {{ inspired.updated_at | diffForHumans }}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-2 pilledge p-0">
                            <router-link
                              title="Spread Joy"
                              v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/share/' + inspired.id }"
                            >
                              <img
                                src="/images/spreads_joy_icon.svg"
                                alt="spreads joy"
                                title="Spreads Joy"
                                height="40"
                              />
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
          </div>

          <!-- If Joy is someone elses  -->
          <div v-if="user_id != joy.user_id">
            <!-- JOY IS NOT YOURS -->
            <div v-if="joy.parents && joy.parents.length > 0" class="row my-5">
              <h5 class="sans-serif text-center text-uppercase">The Joy That Inspired This Joy</h5>
              <div class="col-md-10 mx-auto">
                <div v-for="parent in joy.parents" v-bind:key="parent.id">
                  <div class="card my-3 px-0 text-center shadow scaleddown grow">
                    <div class="card-block">
                      <div class="row">
                        <div class="col-md-10 pt-4 px-0">
                          <div class="px-3">
                            <router-link
                              title="Show this Joy"
                              v-bind:to="{ path: '/' + parent.username + '/joys/' + parent.id }"
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
                  <div></div>
                </div>
              </div>
            </div>
            <div v-else class="text-center"><small class="pink text-uppercase">This joy is the start.</small></div>

            <div class="row my-4">
              <div class="col-md-10 mx-auto">
                <h5 class="mb-3 sans-serif text-center text-uppercase orange">{{ joy.username }}'s Joy</h5>
                <div class="card my-3 px-0 text-center shadow scaledup">
                  <div class="row">
                    <div class="col-md-10 px-0 align-self-center">
                      <div class="p-3">
                        <h1 class="card-text brandname orange">{{ joy.body }}</h1>
                      </div>
                      <div class="card-footer fixed-footer">
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
                    <div class="col-md-2 pilledge p-3">
                      <router-link
                        title="Spread Joy"
                        v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/share/' + joy.id }"
                      >
                        <img
                          src="/images/spreads_joy_icon.svg"
                          alt="spreads joy"
                          title="Spreads Joy"
                          height="40"
                          class="img-fluid"
                        />
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

            <div class="row">
              <div class="col-md-10 mx-auto">
                <div v-if="joy.inspireds && joy.inspireds.length > 0" class="my-5">
                  <h5 class="mb-3 sans-serif text-center text-uppercase">
                    {{ joy.username }}'s Joy Inspired More Joys
                  </h5>
                  <div v-for="inspired in joy.inspireds" v-bind:key="inspired.id">
                    <div class="card my-3 px-0 text-center shadow scaleddown grow">
                      <div class="card-block">
                        <div class="row">
                          <div class="col-md-10 pt-4 px-0">
                            <div class="px-3">
                              <router-link
                                title="Show this Joy"
                                v-bind:to="{ path: '/' + inspired.username + '/joys/' + inspired.id }"
                              >
                                <h1 class="card-text brandname pink">{{ inspired.body }}</h1>
                              </router-link>
                            </div>
                            <div class="card-footer mb-2">
                              <div class="card-text text-right">
                                <small class="name text-uppercase">
                                  <router-link title="View Joys" v-bind:to="{ path: '/' + inspired.username }">
                                    {{ inspired.username }}
                                  </router-link>
                                  wrote this {{ inspired.updated_at | diffForHumans }}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-2 pilledge p-0">
                            <router-link
                              title="Spread Joy"
                              v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/share/' + inspired.id }"
                            >
                              <img
                                src="/images/spreads_joy_icon.svg"
                                alt="spreads joy"
                                title="Spreads Joy"
                                height="40"
                              />
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
      user_id: localStorage.getItem("user_id"),
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
