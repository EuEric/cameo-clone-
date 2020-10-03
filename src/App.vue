<template>
  <div id="app">
    <Header />
    <router-view name="details"></router-view>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/main.css";
import firebase from "firebase";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      items: ["a", "b", "c", "d"],
      api: process.env.VUE_APP_API,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.changelogged(true);
        this.updateid(user.uid);
        this.$router
          .push({
            name: "user",
            params: { id: user.uid, isLoggedIn: this.logged },
          })
          .catch(() => {});
      } else {
        console.log("inside logged out");
        this.changelogged(false);
        this.$router
          .push({ name: "home", params: { isLoggedIn: this.logged } })
          .catch(() => {});
      }
    });
  },
  computed: {
    ...mapGetters(["logged"]),
  },
  methods: {
    ...mapMutations(["changelogged", "updateid"]),
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
