import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/router';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(router);
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
}).$mount('#app');
