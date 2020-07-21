<template>
  <footer class="container-fluid">
    <div class="row footer" id="jeff">
      <div class="col-6"></div>
      <div class="col-6">
        <div id="right" class="bg-dark">
          <div>
            <a class="icons" href>
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a class="icons" href>
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </a>
            <a class="icons" href>
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a class="icons" href>
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </a>
            <a class="icons" href>
              <i class="fa fa-apple" aria-hidden="true"></i>
            </a>
          </div>
          <p class="text">Ready to become a creator?</p>
          <div id="buttondiv">
            <!-- <button type="button" class="btn btn-block btn-outline-light btn-lg">Danger</button> -->
            <router-link
              :to="link"
              tag="button"
              class="btn btn-block btn-outline-light btn-lg"
            >Enroll</router-link>
            <small>© 2020 - {{year}}</small>
            <!-- matches year dynamically -->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      link: {
        name: 'enroll',
        year: ''
      }
    };
  },
  created() {
    this.year = new Date().getFullYear();
  }
};
</script>

<style>
footer {
  height: 15vh;
}
#jeff {
  max-width: 80% !important;
  /* background-color: white !important; */
  margin: 0 auto;
}
#right {
  max-width: 75%;
  margin: 0 auto;
  /* background-color: red; */
}
.icons {
  padding: 1rem;
  display: inline-block;
  font-size: 1.8rem;
  color: white;
}
.icons:hover i {
  color: cyan;
}
.text {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: -0.01rem;
  color: rgb(255, 255, 255);
  margin: 0px 0px 2.5rem;
}
#buttondiv {
  max-width: 50%;
  margin: 0 auto;
}
.btn:focus {
  outline: none !important;
  box-shadow: none !important;
}
small {
  color: white;
  font-size: 1.7rem;
  font-weight: 400;
  letter-spacing: -0.01rem;
  line-height: 2.2rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0px 2rem;
}
</style>