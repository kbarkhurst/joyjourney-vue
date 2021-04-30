<template>
  <main>
    <div class="logout"></div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    this.$router.push("/");
  },
};
</script>
