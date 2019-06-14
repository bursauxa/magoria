import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import draggable from './lib/draggable';
import droppable from './lib/droppable';

Vue.config.productionTip = false;
Vue.directive('draggable', draggable);
Vue.directive('droppable', droppable);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
