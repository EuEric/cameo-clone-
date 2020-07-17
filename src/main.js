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
    apiKey: 'AIzaSyDReQxIXWIylZEVYAtxCfUJEKrLl5CvzBQ',
    authDomain: 'gigel-8408a.firebaseapp.com',
    databaseURL: 'https://gigel-8408a.firebaseio.com',
    projectId: 'gigel-8408a',
    storageBucket: 'gigel-8408a.appspot.com',
    messagingSenderId: '350171765651',
    appId: '1:350171765651:web:de672a2fb1da46b6462666',
    measurementId: 'G-FHPLY3P7J8',
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
