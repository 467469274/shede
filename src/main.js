// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
//import VueQuillEditor from 'vue-quill-editor';
import store from './store'
import 'element-ui/lib/theme-default/index.css';
import "../static/css/commdetail/commdetail.css";
import {getDate} from '@/common/js/date'
import {postFetch} from './common/js/fetch';
import {getCookie} from './common/js/getCookie';
import $ from 'jquery';
Vue.prototype.postFetch = postFetch;
Vue.prototype.getDate = getDate;
Vue.prototype.axios = axios;
Vue.prototype.getCookie = getCookie;
Vue.config.productionTip = false;
Vue.use(ElementUI);
//Vue.use(VueQuillEditor);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
