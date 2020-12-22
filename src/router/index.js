import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Post from '../views/Post.vue'
import PDetail from '../views/PDetail'
import PostEdit from '../views/PostEdit'
import UserChat from '../views/UserChat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/addpost',
    name: 'Addpost',
    component: Post
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: PDetail
  },
  {
    path: '/edit/:id',
    name: 'PostEdit',
    component: PostEdit
  },
  {
    path: '/chat/:to',
    name: 'UserChat',
    component: UserChat
  },

]

const router = new VueRouter({
  routes
})

export default router
