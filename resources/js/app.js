

require('./bootstrap');
window.Vue = require('vue');
import Vue from 'vue'
import VueRouter from 'vue-router'
import Print from 'vue-print-nb'



Vue.use(Print);
Vue.use(VueRouter);


//router imported
import {routes} from './routes';

//import user class
import User from './Helpers/User';
window.User = User

//import Notification class
import Notification from './Helpers/Notification';
window.Notification = Notification

//sweetalert start

import Swal from 'sweetalert2'
window.Swal=Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast;

//sweet alert end

window.Reload = new Vue();

const router = new VueRouter({
  routes,
  mode: 'history'
})

const app = new Vue({
    el: '#app',
    router
});
