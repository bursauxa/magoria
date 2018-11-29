import Vue from 'vue';
import Router from 'vue-router';
import HomeVue from '@/views/Home.vue';
import GameVue from '@/views/Game.vue';
import DendogramVue from '@/views/Dendogram.vue';
import LobbyVue from '@/views/Lobby.vue';
import TokensVue from '@/views/Tokens.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeVue
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: LobbyVue
    },
    {
      path: '/game/:gameId',
      name: 'game',
      component: GameVue
    },
    {
      path: '/dendogram',
      name: 'dendogram',
      component: DendogramVue
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: TokensVue
    }
  ]
});
