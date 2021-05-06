<template>
  <main>
    <div class="banner w-100">
      <div class="row justify-content-center pb-3">
        <div class="col-md-9 text-left">
          <h2 class="float-left">About {{ userName }}</h2>
          <img
            v-if="userName === 'Patricia'"
            src="/images/patricia-barnes.jpg"
            class="float-left rounded-circle moon"
            width="200"
          />
          <div class="float-left" v-if="userInfo && userInfo.journal_description">
            {{ userInfo.journal_description }}
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
      user_id: localStorage.getItem("user_id"),
      errors: [],
      userInfo: null,
    };
  },
  computed: {
    userName() {
      return this.$route.params.username;
    },
  },
  created: function () {
    axios
      .get(`/api/users?username=${this.userName}`)
      .then(({ data }) => {
        this.userInfo = data;
        // this.indexJoys();
        this.keywordSearchMyJoys();
        this.viewByYear();
      })
      .catch((error) => (this.errors = error));
    dayjs.extend(relativeTime);
  },
  methods: {
    getCurrentUsername: function () {
      return localStorage.getItem("username");
    },
  },
};
</script>
