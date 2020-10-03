import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        id: "",
    },
    getters: {
        logged: (state) => {
            return state.isLoggedIn;
        },
        id: (state) => {
            return state.id;
        },
    },
    mutations: {
        changelogged: (state, payload) => {
            state.isLoggedIn = payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.id = "";
        },
        updateid(state, newid) {
            state.id = newid;
            console.log("succesfully updated the id");
        },
    },
    actions: {
        logout(context) {
            firebase
                .auth()
                .signOut()
                .then(function () {
                    context.commit("logout");
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
});
