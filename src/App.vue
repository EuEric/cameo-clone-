<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <Header />
        <router-view></router-view>
        <!-- <Cards :items="items" /> -->
    </div>
</template>

<script>
import Header from './components/Header.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/main.css';
import firebase from 'firebase';
// import { eventBus } from './main';
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'App',
    components: {
        Header,
    },
    data() {
        return {
            items: ['a', 'b', 'c', 'd'],
        };
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //eventBus.$emit('logged', { isLoggedIn: true, id: user.uid });
                this.changelogged(true);
                //console.log(user);
                this.$router.push({ path: '/user/' + user.uid, params: { isLoggedIn: this.logged } }).catch(() => {});
            } else {
                console.log('inside logged out');
                // eventBus.$emit('logged', { isLoggedIn: false });
                this.changelogged(false);
                this.$router.push({ name: 'home', params: { isLoggedIn: this.logged } }).catch(() => {});
            }
        });
    },
    computed: {
        ...mapGetters(['logged']), //maps this.changeLogged() to this.$store.commit('changeLogged') basically
    },
    methods: {
        ...mapMutations(['changelogged']), //maps this.changeLogged() to this.$store.commit('changeLogged') basically
    },
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: none;
}
h3 {
    color: white;
}
</style>
