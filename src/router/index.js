import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
 
  {
    path: '/',
    name: 'characters',
    // route level code-splitting
    // this generates a separate chunk (Characters.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Characters" */ '../views/Characters.vue')
  },
  {
    path: '/planets',
    name: 'planets',
    // route level code-splitting
    // this generates a separate chunk (Planets.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Planets" */ '../views/Planets.vue')
  },
  {
    path: '/starships',
    name: 'starships',
    // route level code-splitting
    // this generates a separate chunk (Starships.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Starships" */ '../views/Starships.vue')
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    // route level code-splitting
    // this generates a separate chunk (Vehicles.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Vehicles" */ '../views/Vehicles.vue')
  },
  {
    path: "*",
    name: "PageNotFound",
    component: ()=>('../views/_404.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
