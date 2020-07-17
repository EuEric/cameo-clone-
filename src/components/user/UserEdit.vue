<template>
<div>
    <h1 id="edit">Edit profile</h1>
  <form id="form" >

  <div class="form-row col-md-6 col-lg-4">
  <label for="exampleFormControlTextarea1"  id="thing" >Edit description</label>
    <textarea  v-model="desc"  class="form-control" id="exampleFormControlTextarea1"  placeholder="Edit description" rows="3" required></textarea>
  </div>
 <div class="form-group col-md-6 col-lg-4">
    <label for="exampleFormControlFile1" id="imagedesc">Avatar image</label>
    <input  type="file" class="form-control bg-dark" id="exampleFormControlFile1" >
  </div>
  <!-- <button  @click.prevent="editUser" type="submit" class="btn btn-primary" id="editButton">Edit</button> -->
   <router-link @click.native="editUser" tag="button" type="submit" class="btn btn-primary" 
   :to="link" id="editButton">Edit </router-link>

</form></div>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
    return {
        desc : '',
        url : '',
         link : {
                name: 'detail',
                params: { id: this.$route.params.id}
            }
      }
    },
    methods : {
        editUser() {
            console.log(" I AM BEING CALLED")
            console.log(this.$route.params.id)
          firebase.firestore().collection("users").doc(this.$route.params.id).update({
              description: this.desc,
          }).then(() => {
              console.log(this.$route.params.id)
          })
        }
    }
}
</script>

<style >
#thing {
    color: white !important;
}
#exampleFormControlFile1 {
    border: none !important;
    color: white;
    padding: 6px 12px !important;
   /* // height: 20vh !important; */
}
#imagedesc {
    color: white !important;
    float: left;
    margin-top: 2vh;
    padding-left: 1vw;
}
#form {
    margin-left: 1rem !important;
}
#edit {
    color: white;
}
#editButton {
    /* float: left; */
    display: block;
    position: relative;
    margin: 2rem
}
</style>