<template>
  <main>
    <div class="container text-center">
      <div class="row">
        <div class="col-md-8 mx-auto mt-5">
          <h1 class="serif orange">User Profile</h1>
          <h2>Journal Description</h2>
          {{ userdata.journal_description }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      userdata: [],
      user_id: localStorage.getItem("user_id"),
    };
  },
  beforeCreate() {
    if (!this.getCurrentUsername) {
      this.$router.push({ name: "Signup" });
    }
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get(`/api/users/${this.user_id}`).then((response) => {
        this.userdata = response.data;
        console.log("user info:", `/api/users/${this.user_id}`);
      });
    },
    goBack: function () {
      return this.$router.go(-1);
    },
  },
};
</script>
