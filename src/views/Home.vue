<template>
  <div class="container">
    <div class="home">
      <h1>Public Joys</h1>
      <div v-for="joy in joys" v-bind:key="joy.id">
        <div v-if="joy.visibility">
          <div class="my-4">
            <p class="mb-0">{{ joy.body }}</p>
            <small class="text-uppercase">
              {{ joy.username }} | Updated {{ joy.updated_at | diffForHumans }} | {{ joy.visibility }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data: function () {
    return {
      joys: [],
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
  components: {},
  methods: {
    indexJoys: function () {
      axios.get("/api/joys").then((response) => {
        this.joys = response.data;
        console.log("all joys:", this.joys);
      });
    },
  },
};
</script>
