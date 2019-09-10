import Vue from 'vue';
import Router from 'vue-router';
import HomeVue from '@/views/Home.vue';
import GameVue from '@/views/Game.vue';
import DendrogramVue from '@/views/Dendrogram.vue';
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
      path: '/dendrogram',
      name: 'dendrogram',
      component: DendrogramVue
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: TokensVue
    }
  ]
});
