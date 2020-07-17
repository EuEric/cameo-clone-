<template>
  <div>
  <h1 style="color: white " id="userdetailtitle">Displaying user detail</h1>
  <div id="userdetail"> <h3 class="text-light">User bio</h3> <hr> <span class="text-light"> {{ data.description}}</span></div>

    <router-link tag="button" class="btn btn-primary"
   :to="link">Edit User</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            link : {
                name: 'edit',
                params: { id: this.$route.params.id}
            }
            ,
            data : ''
        }
    },
    created() {
            firebase.firestore().collection("users").doc(this.$route.params.id).get().then((doc) => {
               this.data = doc.data();
            })
    },
    methods : {
        
    }
}

</script>

<style>
#userdetailtitle {
    margin-bottom: 3%;
}
#userdetail {
    margin-bottom: 3%;
}
</style>