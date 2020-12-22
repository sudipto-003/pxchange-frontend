<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  components: {
    Nav
  },
  created: function(){
    this.$http.interceptors.response.use(
      response => response,
      error => {
        const originalRequest = error.config
        if(originalRequest.url === 'http://127.0.0.1:9000/auth/login/' || 
          originalRequest.url === 'http://127.0.0.1:9000/auth/token/refresh/'){
            originalRequest._retry = true
          }
        if(error.response.status === 401 && !originalRequest._retry){
          originalRequest._retry = true
          this.$store.dispatch('token_refresh')
          .then(() => {
            originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            axios(originalRequest)
            .then(() => this.$router.push('/'))
            .catch(err => Promise.reject(err))
          })
          .catch(error => {
            this.$router.push('/login')
            Promise.reject(error)
          })
        }
        return Promise.reject(error)
      }
    )
  },
  mounted: function(){
    if(this.userNotFetched){
      this.$store.dispatch('cur_user')
    }
    this.$store.dispatch('group_count')

  },
  computed: {
    ...mapGetters({
      userNotFetched: 'userNotFetched'
    })
  }
  
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
