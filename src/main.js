import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';
Vue.use(firebase); //sets up firebase object
Vue.use(VueRouter); //sets up router object

Vue.config.productionTip = false;

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: process.env.VUE_APP_apiKey,
    authDomain: process.env.VUE_APP_authDomain,
    databaseURL: process.env.VUE_APP_databaseURL,
    projectId: process.env.VUE_APP_projectId,
    storageBucket: process.env.VUE_APP_storageBucket,
    messagingSenderId: process.env.VUE_APP_messagingSenderId,
    appId: process.env.VUE_APP_appId,
    measurementId: process.env.VUE_APP_measurementId,
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
console.log('I AM CALLED FIRST');

export const eventBus = new Vue({
    name: 'event',
    data: {
        isLoggedIn: false,
    },
});

import { store } from './store/store';
// this is how we deconstruct and import the store object
new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app');
