import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import AddDragop from './lib/Dragop';

Vue.config.productionTip = false;
AddDragop();

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
