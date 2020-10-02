<template v-if="items.length">
  <div>
    <router-view></router-view>
    <ul
      class="list-group d-flex flex-row bg-transparent justify-content-between"
    >
      <li
        class="list-group-item bg-transparent"
        v-for="item in items"
        :key="item.id"
      >
        <div class="card bg-dark">
          <div class="money">
            <img
              class="card-img-top cardImage"
              :src="item.url"
              alt="Card image cap"
            />
            <span id="spann">{{ getRandom }} Lei</span>
          </div>

          <div class="card-body bg-dark">
            <h5 class="card-title">{{ item.id }}</h5>
            <p class="card-text">{{ item.title }}</p>

            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Cards",
  data() {
    return {
      items: [],
    };
  },
  computed: {
    getRandom() {
      return Math.floor(Math.random() * 100);
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var array = [];

      var db = firebase.firestore();
      db.collection("images")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            array.push(doc.data());
          });
          console.log("i am called");
        })
        .catch((err) => {
          console.log("SUNT PROST");
          console.log(err);
        });
      this.items = array;
    },
  },
};
</script>

<style>
li {
  color: white;
  border: none !important;
  position: relative;
}
.money {
  width: 100%;
  position: relative;
}
.card {
  border: none !important;
  width: 100%;
}
.cardImg {
  width: 100%;
}
#spann {
  position: absolute;
  top: 95%;
  left: 85%;
  transform: translate(-85%, -95%);
}
</style>
