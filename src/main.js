import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
Vue.use(firebase);
Vue.use(VueRouter);

Vue.config.productionTip = false;

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

export const app = firebase.initializeApp(firebaseConfig);

export const eventBus = new Vue({
    name: "event",
    data: {
        isLoggedIn: false,
    },
});

import { store } from "./store/store";

new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount("#app");
