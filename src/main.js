// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Spinner from 'vue-simple-spinner'
import Notification from 'vue-notification'

Vue.component('loader', Spinner);
Vue.use(Notification);
Vue.config.productionTip = false;
// Vue.config.errorHandler = function (err, vm, info) {
//   alert(err);
// };
// Vue.config.warnHandler = function (msg, vm, trace) {
//     alert(msg);
// };
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>'
});
