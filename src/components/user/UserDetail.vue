<template>
  <div>
  <h1 style="color: white">Displaying user detail</h1>
    <router-link tag="button" class="btn btn-primary"
   :to="link">Edit User</router-link>
  </div>
</template>

<script>
export default {
    data() {
        return {
            link : {
                name: 'edit',
                params: { id: this.$route.params.id}
            }
        }
    }
}

</script>

<style>

</style>