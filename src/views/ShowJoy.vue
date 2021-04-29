<template>
  <main>
    <div class="container">
      <p><a href="#" @click="goBack">Go Back</a></p>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div v-if="joy.inspirationfors.length > 0" class="my-5">
        <!-- <p>More</p> -->
        <h3>Inspired by {{ joy.id }}</h3>
        <div v-for="inspirationfor in joy.inspirationfors" v-bind:key="inspirationfor.id">
          <div class="my-4">
            <p class="mb-0">{{ inspirationfor.body }}</p>
            <small class="text-uppercase">
              {{ inspirationfor.user_id }} wrote this {{ inspirationfor.updated_at | diffForHumans }}
              <!-- {{ inspirationfor.visibility }} -->
            </small>
          </div>
        </div>
      </div>
      <div class="my-5">
        <h4>Your joy {{ joy.id }}</h4>
        <h1>{{ joy.body }}</h1>
        <small class="text-uppercase">Created On: {{ joy.created_at }} | Last Updated:{{ joy.updated_at }}</small>
      </div>
      <div v-if="joy.inspiredbys.length > 0">
        <hr />
        <h2>Inspired The Following {{ joy.id }}</h2>
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
