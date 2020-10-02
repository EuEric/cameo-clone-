<template>
  <div class="row justify-content-end" id="container">
    <div class="col" id="imgDiv">
      <img src="../assets/banner.png" width="100%" alt="banner" srcset="" />
      <div id="bottomText" class="h2 text-center font-weight-bold">
        Get your personalized messages from your favorite celebrities
      </div>
    </div>

    <div class="col-sm-9 col-md-6 col-lg-4">
      <div class="card-body bg-dark">
        <div class="jumbotron bg-dark" id="title">
          <h1 class="display-4 text-light font-weight-bold" id="jumbotronText">
            Sign up your account!
          </h1>
          <span v-if="isErr" class="text-danger h2" style="width: 80%"
            >No such account!</span
          >
        </div>
        <form class="form-signin">
          <div class="form-label-group">
            <label for="inputEmail" class="font-weight-bold text-light"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address verify"
              required
              autofocus
            />
          </div>
          <div v-if="isEmail" class="form-label-group">
            <label for="inputPassword" class="font-weight-bold text-light"
              >Password</label
            >
            <input
              v-model="formData.password"
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div v-else-if="signUp">
            <div class="form-label-group">
              <label for="createPassword" class="font-weight-bold text-light"
                >Create password</label
              >
              <input
                v-model="formData.password"
                type="password"
                id="createPassword"
                class="form-control"
                placeholder="Create password"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="inputName" class="font-weight-bold text-light"
                >Full Name</label
              >
              <input
                v-model="formData.name"
                type="email"
                id="inputName"
                class="form-control"
                placeholder="Enter full name"
                required
                autofocus
              />
            </div>
            <div class="form-label-group">
              <label for="inputUser" class="font-weight-bold text-light"
                >Username</label
              >
              <input
                v-model="formData.user"
                type="email"
                id="inputUser"
                class="form-control"
                placeholder="Enter username"
                required
                autofocus
              />
            </div>
            <button
              @click.prevent="addUserEmail"
              class="btn btn-lg btn-block text-light font-weight-bold"
              id="submitButton"
              type="submit"
            >
              Sign up
            </button>
          </div>

          <button
            v-if="isEmail"
            @click.prevent="logUserEmail"
            class="btn btn-lg btn-block text-light font-weight-bold"
            id="submitButton"
            type="submit"
          >
            Log In
          </button>
          <button
            v-if="!clicked"
            @click.prevent="emailVerify"
            class="btn btn-lg btn-block text-light font-weight-bold"
            id="submitButton"
            type="submit"
          >
            Continue
          </button>
          <hr class="my-4" />
          <div id="custom">
            <span class="text-light">Sign up with social media instead</span>
          </div>
          <button
            @click.prevent="addUserGoogle"
            class="btn btn-lg btn-google btn-block bg-danger"
            type="submit"
          >
            <span class="font-weight-bold text-light">Sign up with Google</span>
            <i class="fab fa-google mr-2"></i>
          </button>
          <button
            @click.prevent="addUserFacebook"
            class="btn btn-lg btn-facebook btn-block bg-primary"
            type="submit"
          >
            <span class="font-weight-bold text-light"
              >Sign up with Facebook</span
            >
            <i class="fab fa-facebook-f mr-2"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({
  display: "popup",
});

export default {
  name: "Auth",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        name: "",
        user: "",
      },
      isErr: false,
      isEmail: false,
      clicked: false,
    };
  },
  watch: {
    isErr: function (newVal) {
      this.isErr = newVal;
    },
    isEmail: function (newVal) {
      this.isEmail = newVal;
    },
    clicked: function (newVal) {
      this.clicked = newVal;
    },
  },
  computed: {
    signUp: function () {
      return this.clicked && !this.isEmail;
    },
  },
  methods: {
    verifySignUp() {
      console.log(this.clicked + " banana " + this.isEmail);
      return false;
    },
    addUserEmail() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then((cred) => {
          this.formData.email = "";
          this.formData.password = "";
          return firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid)
            .set({
              username: this.formData.user,
              name: this.formData.name,
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    emailVerify() {
      firebase
        .auth()
        .fetchSignInMethodsForEmail(this.formData.email)
        .then((arr) => {
          this.clicked = true;
          if (!arr.length) {
            this.isEmail = false;
            console.log("email not found");
          } else this.isEmail = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logUserEmail() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .catch((error) => {
          var errorMessage = error.message;
          var errorCode = error.code;
          console.log(errorCode, errorMessage);
        });
    },
    addUserGoogle() {
      firebase
        .auth()
        .signInWithPopup(providerGoogle)
        .then(function (result) {
          var token = result.credential.accessToken;
          console.log(token + " is");
          var user = result.user;
          console.log(user + " has signed in");
          return firebase
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .set({});
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },
    addUserFacebook() {
      firebase
        .auth()
        .signInWithPopup(providerFacebook)
        .then(function (result) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log(`token for user ${user} is: ${token}`);
          return firebase
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .set({});
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },
  },
};
</script>

<style>
#custom {
  margin-bottom: 1rem;
}
#submitButton {
  background-color: coral;
  margin-top: 2rem;
}
#title {
  padding: 0.5rem;
  margin-bottom: 0;
}
#jumbotronText {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
#container {
  margin-right: 1%;
}
body {
  background-color: #343a40 !important ;
}
div.my-5 {
  border: 0;
}
#imgDiv {
  position: relative !important;
  text-align: center;
  color: white;
}
#bottomText {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
