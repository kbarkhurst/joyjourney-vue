import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// const router  = new VueRouter({

// });
function guard(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem("jwt")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/signup"); // go to '/login';
  }
}

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
      path: "/:username/profile",
      name: "Profile",
      component: () => import("../views/Profile.vue"),
      beforeEnter: guard,
    },
    {
      path: "/:username/addjoy",
      component: () => import("../views/AddJoy.vue"),
      beforeEnter: guard,
    },
    {
      path: "/:username",
      name: "User",
      component: () => import("../views/UserJoys.vue"),
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
      path: "/:username/joys/share/:id",
      name: "SpreadsJoy",
      component: () => import("../views/SpreadsJoy.vue"),
      beforeEnter: guard,
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

  // scrollBehavior(to) {
  //   document.getElementById("app").scrollIntoView();
  //   if (to.hash) {
  //     return {
  //       selector: to.hash,
  //     };
  //   }
  //   [{ path: "/", component: Home, meta: { scrollToTop: true } }];
  // },
});

export default router;
