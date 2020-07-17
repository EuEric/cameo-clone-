<template>
    <!-- <div class="container"> -->
    <div class="row justify-content-end" id="container">
        <div class="col" id="imgDiv">
            <!-- <img src="./assets/banner.png" alt="" srcset=""> -->
            <img src="../assets/banner.png" width="100%" alt="banner" srcset="" />
            <div id="bottomText" class="h2 text-center font-weight-bold ">Get your personalized messages from your favorite celebrities</div>
       
        </div>
       
        <div class="col-sm-9 col-md-6 col-lg-4">
            <!-- <div class="card card-signin my-5"> -->
            <div class="card-body bg-dark">
                <div class="jumbotron bg-dark" id="title">
                    <h1 class="display-4 text-light font-weight-bold" id="jumbotronText">Sign up your account!</h1>
                      <span v-if="isErr" class="text-danger h2 " style="width:80%">No such account!</span>
                </div>
                <form class="form-signin">
                    <!-- <div class="form-label-group">
                        <label for="inputEmail" class="font-weight-bold">Email</label>
                        <input
                            v-model="formData.email"
                            type="email"
                            id="inputEmail"
                            class="form-control"
                            placeholder="Email address"
                            required
                            autofocus
                        />
                    </div> -->

                     
                    <div class="form-label-group">
                        <!-- <label for="inputPassword" class="font-weight-bold">Password</label>
                        <input v-model="formData.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                 -->
                      <label for="inputEmail" class="font-weight-bold">EmailVerify</label>
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
                    <div  v-if="isEmail" class="form-label-group">
                         <label for="inputPassword" class="font-weight-bold">Password</label>
                        <input v-model="formData.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                    </div>
                     <!-- <button @click.prevent="addUserEmail" class="btn btn-lg btn-block text-light font-weight-bold" id="submitButton" type="submit">
                        Sign up
                    </button>  -->
                      <button  v-if="isEmail" @click.prevent="logUserEmail" class="btn btn-lg btn-block text-light font-weight-bold" id="submitButton" type="submit">
                       Log In
                    </button> -->
                        <button v-if="!isEmail" @click.prevent="emailVerify" class="btn btn-lg btn-block text-light font-weight-bold" id="submitButton" type="submit">
                     Continue
                    </button>
                    <hr class="my-4" />
                    <div id="custom">
                        <span class="text-light">Sign up with social media instead</span>
                    </div>
                    <button @click.prevent="addUserGoogle" class="btn btn-lg btn-google btn-block bg-danger" type="submit">
                        <span class="font-weight-bold text-light">Sign up with Google</span>
                        <i class="fab fa-google mr-2"></i>
                    </button>
                    <button @click.prevent="addUserFacebook" class="btn btn-lg btn-facebook btn-block bg-primary" type="submit">
                        <span class="font-weight-bold text-light">Sign up with Facebook</span>
                        <i class="fab fa-facebook-f mr-2"></i>
                    </button>
                </form>
            </div>
            <!-- </div> -->
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import firebase from 'firebase';
// import { mapGetters, mapActions } from 'vuex';
var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({
    display: 'popup',
});

export default {
    name: 'Auth',
    data() {
        return {
            formData: {
                email: '',
                password: '',
            },
            isErr : false,
            isEmail : false,
        };
    },
    watch : {
        isErr : function(newVal, oldVal) {
            console.log("old value is" + oldVal + " new value is " + newVal);
            this.isErr = newVal;
        },
        isEmail : function(newVal, oldVal) {
             console.log("old value is" + oldVal + " new value is " + newVal);
             this.isEmail = newVal;
        }
    },
    // computed : {
    //         isErr: function() {
    //             return !this.isErr;
    //         }
    // },
    methods: {
      addUserEmail() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.formData.email, this.formData.password)
                .then((cred) => {
                    //cred object contains the necessary credentials for the user
                    console.log(cred);
                    this.formData.email = '';
                    this.formData.password = '';
                    return firebase
                        .firestore()
                        .collection('users')
                        .doc(cred.user.uid)
                        .set({});
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        emailVerify() {
            console.log("aaaaaaaa")
             firebase.auth().fetchSignInMethodsForEmail(this.formData.email).then((arr) => {
                 if(!arr.length) {
                    this.isEmail= false;
                    console.log("email not found")
                 } else
                    this.isEmail = true;
             }).catch((err) => {
                 console.log(err);
             })
        },
        logUserEmail() {
            firebase.auth().signInWithEmailAndPassword(this.formData.email, this.formData.password)
            .catch( (error) =>{ 
            //must use arrow function because we need the root vue instance
            //it does not work with normal function declaration
                // Handle Errors here.
                var errorMessage = error.message;
                var errorCode = error.code;
                console.log(errorCode,errorMessage);
            });
        },
        addUserGoogle() {
            firebase
                .auth()
                .signInWithPopup(providerGoogle)
                .then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    console.log(token + ' is');
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    console.log(user + ' has signed in');
                    // console.log(result.user.uid)
                    return firebase
                        .firestore()
                        .collection('users')
                        .doc(result.user.uid)
                        .set({});
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    console.log(errorCode, errorMessage, email, credential);
                });
        },
        addUserFacebook() {
            firebase
                .auth()
                .signInWithPopup(providerFacebook)
                .then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log(`token for user ${user} is: ${token}`);
                    // ...
                    return firebase
                        .firestore()
                        .collection('users')
                        .doc(result.user.uid)
                        .set({});
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    console.log(errorCode, errorMessage, email, credential);
                });
        },
    },
};
</script>

<style>
/* .vue-template {
    margin-top: 10%;

    margin-right: 2%;
} */
#custom {
    margin-bottom: 1rem;

    /* background-color: teal; */
}
#submitButton {
    background-color: coral;
    margin-top: 2rem;
}
#title {
    padding: 0.5rem;
    /* background-color: crimson !important; */
    margin-bottom: 0;
}
#jumbotronText {
    /* color: cyan !important; */
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
