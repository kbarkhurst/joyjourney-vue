<template>
  <div>
    <h1>{{ getCurrentUsername() }}'s Joys</h1>
    <p>Publicly shared joys for this user</p>

    <div>
      <p>About this joy journey</p>
      {{ journal_description }}
    </div>

    <div v-for="joy in joys" v-bind:key="joy.id">
      <div v-if="joy.user_id == user_id">
        <div class="my-4">
          <router-link title="Show this Joy" v-bind:to="{ path: '/' + getCurrentUsername() + '/joys/' + joy.id }">
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
              <i class="bi bi-pen-fill"></i> Edit
            </router-link>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default {
  data: function () {
    return {
      joys: [],
      body: "",
      joy: "",
      journal_description: "",
      errors: [],
      user_id: "",
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
    indexJoys: function () {
      axios.get("/api/joys").then((response) => {
        this.joys = response.data;
        console.log("all joys:", this.joys);
      });
    },
    getCurrentUsername: function () {
      return localStorage.getItem("username");
    },
  },
};
</script>
