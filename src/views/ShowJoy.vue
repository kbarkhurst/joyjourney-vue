<template>
  <main>
    <div class="container">
      <p><a href="#" @click="goBack">Go Back</a></p>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div v-if="joy.parents.length > 0" class="my-5">
        <!-- <p>More</p> -->
        <h3>Inspired by</h3>
        <div v-for="parent in joy.parents" v-bind:key="parent.id">{{ parent.id }}
          <div class="my-4">
            <p class="mb-0">{{ parent.body }}</p>
            <small class="text-uppercase">
              {{ parent.username }} wrote this {{ parent.updated_at | diffForHumans }}
              <!-- {{ parent.visibility }} -->
            </small>
          </div>
        </div>
      </div>
      <div class="my-5">
        <h4>Your joy</h4>
        <h1>{{ joy.body }}</h1>
        <small class="text-uppercase">Created On: {{ joy.created_at }} | Last Updated:{{ joy.updated_at }}</small>
      </div>
      <div v-if="joy.inspireds.length > 0">
        <hr />
        <h2>Inspired The Following</h2>
        <div v-for="inspired in joy.inspireds" v-bind:key="inspired.id">
          <div class="my-4">
            {{ inspired.id }}
            <p class="mb-0">{{ inspired.body }}</p>
            <small class="text-uppercase">
              {{ inspired.username }} wrote this {{ inspired.updated_at | diffForHumans }} | {{ inspired.visibility }}
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
    goBack: function () {
      return this.$router.go(-1);
    },
  },
};
</script>
