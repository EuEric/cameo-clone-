<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <Header />

        <!-- router view is put here because details component is no longer a 
        child elemend of User.vue, therefore it has to be put in App.vue,
        as there is no nesting anymore,
        only edit is still at nesting -->
        <router-view name="details"></router-view>
        <router-view></router-view>
          <!-- <router-view name="test"></router-view> -->
       
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


                //this has to be fixed, here if we eneter params we will get /user/params
                //however we want to pass the araibe so the guard can reead it
                //there is logic problem here
                this.updateid(user.uid);
                this.$router.push({ name: 'user', params: { id : user.uid,isLoggedIn: this.logged } }).catch(() => {});
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
        ...mapMutations(['changelogged' , 'updateid']), //maps this.changeLogged() to this.$store.commit('changeLogged') basically
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
