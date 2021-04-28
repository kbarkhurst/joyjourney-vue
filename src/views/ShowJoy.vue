<template>
  <main>
    <div class="container">
      <p><a href="#" @click="goBack">Go Back</a></p>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div v-if="joy.inspirationfors.length > 0">
        <p>More</p>
        <h2>Inspired by</h2>
        <div v-for="inspirationfor in joy.inspirationfors" v-bind:key="inspirationfor.id">
          <div class="my-4">
            <p class="mb-0">{{ inspirationfor.body }}</p>
            <small class="text-uppercase">
              {{ inspirationfor.username }} wrote this {{ inspirationfor.updated_at | diffForHumans }} |
              {{ inspirationfor.visibility }}
            </small>
          </div>
        </div>
      </div>
      <h1>Your joy</h1>
      {{ joy.body }}
      <p>Created On: {{ joy.created_at }} | Last Updated:{{ joy.updated_at }}</p>
      <div v-if="joy.inspiredbys.length > 0">
        <hr />
        <h2>Inspired The Following</h2>
        <div v-for="inspiredby in inspiredbys" v-bind:key="inspiredby.id">
          <div class="my-4">
            <p class="mb-0">{{ joy.body }}</p>
            <small class="text-uppercase">
              {{ joy.username }} wrote this {{ joy.updated_at | diffForHumans }} | {{ joy.visibility }}
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
      inspiredbys: {},
      inspirationfors: {},
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
