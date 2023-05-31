import Vue from 'vue';
import VueRouter from 'vue-router';
import Data from './../pages/DataVisual.vue';
import Map from './../pages/OneMap.vue';
import FirstPage from '@/pages/FirstPage.vue';
//import MapView from './../components/MapView';
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/first',
      name: 'First',
      component: FirstPage,
    },
    {
      path: '/',
      name: 'Data',
      component: Data,
    },
    {
      path: '/onemap',
      name: 'Map',
      component: Map,
    },
  ],
  mode: 'history',
});
