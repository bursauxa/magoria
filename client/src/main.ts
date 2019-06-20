import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import draggable from './lib/draggable';
import onDrop from './lib/on-drop';
import onDrag from './lib/on-drag';
import onDragAborted from './lib/on-drag-aborted';

Vue.config.productionTip = false;
Vue.directive('draggable', draggable);
Vue.directive('on-drop', onDrop);
Vue.directive('on-drag', onDrag);
Vue.directive('on-drag-aborted', onDragAborted);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
