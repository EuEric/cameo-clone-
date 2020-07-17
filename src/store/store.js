import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
    },
    getters: {
        logged: (state) => {
            return state.isLoggedIn;
        },
    },
    mutations: {
        changelogged: (state, payload) => {
            state.isLoggedIn = payload;
            console.log('changed the logged status');
        },
        logout: (state) => {
            firebase
                .auth()
                .signOut()
                .then(function() {
                    state.isLoggedIn = false;
                    console.log('LOGOUT INITIATED, WHY???');
                })
                .catch(function(error) {
                    // An error happened.
                    console.log(error);
                    state.isLoggedIn = true;
                });
        },
    },
});
