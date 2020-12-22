<template>
    <b-navbar tooggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Exg</b-navbar-brand>
        <b-navbar-toggle target="navbar-collapse"></b-navbar-toggle>

        <b-navbar-nav v-if="isLoggedIn" class="ml-auto">
            <router-link to="/addpost">
                <b-button variant="success">Add Post</b-button>
            </router-link>
            <b-button variant="primary">{{ getUsername }}</b-button>
            <b-button @click="logout" variant="success">Logout</b-button>
        
        </b-navbar-nav>

        <b-navbar-nav v-else class="ml-auto">
            <router-link to="/login">
                <b-button variant="success">Login</b-button>
            </router-link>
            <router-link to="/signup">
                <b-button variant="primary">Signup</b-button>
            </router-link>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Nav',
    computed: {
        ...mapGetters({
            isLoggedIn: 'isLoggedIn'
        }),
        getUsername(){
            return this.$store.state.username
        }
    },
    methods: {
        logout: function(){
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/')
            })
        }
    }
}
</script>