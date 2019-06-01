import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue"),
      beforeEnter: (to, from, next) => {
        if (store.getters.getCurrentUser.user) {
          next();
        } else {
          next("/");
        }
      }
    }
  ]
});
