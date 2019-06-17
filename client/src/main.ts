import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import draggable from './lib/draggable';
import onDrop from './lib/on-drop';

Vue.config.productionTip = false;
Vue.directive('draggable', draggable);
Vue.directive('on-drop', onDrop);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
