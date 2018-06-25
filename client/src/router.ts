import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Games from './views/Games.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    }
  ]
});
