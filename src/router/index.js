import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// const router  = new VueRouter({

// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/Signup.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/logout",
      name: "Logout",
      component: () => import("../views/Logout.vue"),
    },
    // {
    //   path: "/joysnew",
    //   name: "Joysnew",
    //   component: () => import("../views/JoysNew.vue"),
    // },
    // {
    //   path: "/editjoy/:id",
    //   name: "EditJoy",
    //   component: () => import("../views/EditJoy.vue"),
    // },
    {
      path: "/:username/addjoy",
      component: () => import("../views/AddJoy.vue"),
    },
    {
      path: "/:username",
      component: () => import("../views/JoysNew.vue"),
    },
    // {
    //   path: "/:username/joys",
    //   component: () => import("../views/JoysNew.vue"),
    // },
    {
      path: "/:username/joys/share/:id",
      name: "SpreadsJoy",
      component: () => import("../views/SpreadsJoy.vue"),
    },
    {
      path: "/:username/joys",
      name: "MyJoys",
      component: () => import("../views/MyJoys.vue"),
    },
    {
      path: "/:username/joys/:id",
      name: "ShowJoy",
      component: () => import("../views/ShowJoy.vue"),
    },
    {
      path: "/:username/explore",
      name: "ExploreJoy",
      component: () => import("../views/ExploreJoys.vue"),
    },
    {
      path: "/:username/joys/edit/:id",
      name: "EditJoy",
      component: () => import("../views/EditJoy.vue"),
    },
  ],
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});

export default router;
