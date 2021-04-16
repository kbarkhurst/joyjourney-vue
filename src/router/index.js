import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
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
  {
    path: "/joysnew",
    name: "Joysnew",
    component: () => import("../views/JoysNew.vue"),
  },
  {
    path: "/editjoy",
    name: "EditJoy",
    component: () => import("../views/EditJoy.vue"),
  },
  {
    path: "/:username",
    name: "Username",
    component: () => import("../views/JoysNew.vue"),
    props: true,
    // children: [
    //   {
    //     path: "/",
    //     name: "Dashboard",
    //     component: () => import("../views/JoysNew.vue"),
    //   },
    //   {
    //     path: "/:id",
    //     name: "Joy Show",
    //     component: () => import("../views/EditJoy.vue"),
    //   },
    // ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});

export default router;

// export default {
//   name: "router",
//   data: function () {
//     return {
//       username: localStorage.getItem("username"),
//     };
//   },
// };
