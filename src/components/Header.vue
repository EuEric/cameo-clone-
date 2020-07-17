<template>
    <nav class="navbar navbar-dark bg-dark" id="test">
        <a class="navbar-brand font-weight-bold" id="logo">Navbar</a>
        <!-- <router-link to="/" class="navbar-brand font-weight-bold" id="logo">Home</router-link> -->
        <ul class="nav nav-pills" id="click">
            <router-link to="/" tag="li" active-class="active" class="nav-item" exact>
                <a class="nav-link active">Home</a>
            </router-link>
            <router-link v-if="logged" :to="this.id" tag="li" active-class="active" class="nav-item" exact>
                <a class="nav-link active">User</a>
            </router-link>
            <button v-if="logged" class="btn btn-primary" @click="logout">Log out</button>
        </ul>

        <form class="form-inline d-flex">
            <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
            <div class="input-group">
                <div class="input-group-btn">
                    <button class="btn bg-secondary shadow-none search-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <input type="Search" placeholder="Search..." class="form-control text-light bg-secondary shadow-none" />
            </div>
        </form>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Header',
    data() {
        return {
            isLoggedIn: '',
            id: '',
        };
    },
    computed: {
        ...mapGetters(['logged']),
    },
    methods: {
        ...mapActions(['logout'])
    },
};
</script>

<style lang="scss" scoped>
::placeholder {
    //  Chrome, Firefox, Opera, Safari 10.1+
    color: white !important;
    opacity: 1; //Firefox
}
input {
    border: none;
    border-radius: 0;
    min-height: 5vh;
    position: absolute;
    //background-color: red !important;
}
.search-button {
    background: yellow;
    color: black;
    // border: 0;
    border-radius: 0;
}
div.input-group {
    border-radius: 6px !important;
    border: 10px solid #6c757d;
}
.search-button:hover {
    background-color: #6c757d !important;
}
#logo {
    font-size: 2rem;
}
#click {
    width: 30vw !important;
}
#test {
    width: 100% !important;
}
</style>
