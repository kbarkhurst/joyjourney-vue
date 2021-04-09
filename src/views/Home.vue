<template>
  <div class="container">
    <div class="home">
      <h1>Public Joys</h1>
      <div v-for="joy in joys" v-bind:key="joy.id">
        <div class="my-4">
          <p class="mb-0">{{ joy.body }}</p>
          <small class="text-uppercase">{{ joy.username }} | Dateline {{ joy.updated_at }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
