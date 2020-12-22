<template>
    <b-container>
        <b-alert variant="danger" show v-if="isClosed">
            This sell advertisment has been closed by the seller.
        </b-alert>
        <h2> Product Images </h2>
        <div class="p-2">
            <b-row>
                <div v-for="image in images" :key="image.id">
                    <b-col>
                        <b-img thumbnail fluid :src="image.product_img" width="300" height="200"></b-img>
                    </b-col>
                </div>
            </b-row>
        </div>
        <div class="p-2">
            <b-row>
                <b-col align-self="start">
                    <h4><strong>{{ title }}</strong></h4>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h5>Posted By: <strong>{{ owner }}</strong></h5>
                </b-col>
                <b-col align-self="end">
                    <h5>{{ at }}</h5>
                </b-col>
            </b-row> 
            <b-row>
                <b-col lg="12">
                    <p>{{ detail }}</p>
                </b-col>
                <b-col lg="12">
                    <h6>Category: <strong>{{ category }} </strong></h6>
                </b-col>
                <b-col lg="12">
                    <h5>Price: <b-badge>{{ price }} BDT.</b-badge></h5>
                </b-col>
                <b-col lg="12">
                    <h5>Quantity: <b-badge>{{ quantity }} </b-badge></h5>
                </b-col>
                <b-col lg="12">
                    <h6>Location: <strong>{{ location }}</strong></h6>
                </b-col>
            </b-row>
            <div v-if="viewerIsOwner">
                <b-button-group>
                    <b-button v-if="isActive" @click="makeInactive" variant="primary">Close Advertisment</b-button>
                    <b-button v-if='isActive' variant="success" @click="editPost">Edit</b-button>
                    <b-button variant="danger" @click="deletePost">Delete</b-button>
                </b-button-group>
            </div>
            <div v-if="canAddFav">
                <b-button-group>
                    <b-button v-if="isActive" variant="primary">Add Favourate List</b-button>
                    <b-button v-if="isActive" @click="startChat" variant="success">Message Seller</b-button>
                </b-button-group>
            </div>
        </div>
    </b-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'PDetail',
    data(){
        return {
            id: null,
            title: '',
            detail: '',
            category: null,
            location: '',
            price: '',
            quantity: '',
            owner: '',
            at: null,
            isActive: false,
            images: []
        }
    },

    created(){
        this.fetch_data()
    },

    watch: {
        '$route': 'fetch_data'
    },

    methods: {
        fetch_data(){
            let id = this.$route.params.id
            axios({url: `http://127.0.0.1:9000/sell/detail/${id}/`, method: 'GET'})
            .then(resp => {
                this.id = resp.data.id
                this.title = resp.data.title
                this.detail = resp.data.description
                this.at = resp.data.posted_at
                this.category = resp.data.category
                this.price = resp.data.asked_price
                this.quantity = resp.data.quantity
                this.owner = resp.data.owner
                this.location = resp.data.location
                this.images = resp.data.images
                this.isActive = resp.data.is_active
            })
        },
        makeInactive(){
            axios({url: 'http://127.0.0.1:9000/sell/closeadd/', data: {id: this.id}, method: 'POST'})
            .then(() => {
                this.isActive = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        deletePost(){
            let post_id = this.$route.params.id
            axios({url: 'http://127.0.0.1:9000/sell/createadd/', data: {id: post_id}, method: 'DELETE'})
            .then(() => {
                this.$router.push('/')
            })
            .catch(err => {
                console.log(err)
            })
        }, 
        editPost(){
            this.$router.push({name: 'PostEdit', params: {id: this.id}})
        },
        startChat(){
            this.$router.push({name: 'UserChat', params: {to: this.owner}})
        }
    },

    computed: {
        ...mapGetters({
           loggedIn: 'isLoggedIn'  
        }),
        viewerIsOwner(){
            return this.owner === this.$store.state.username
        },
        canAddFav(){
            return this.loggedIn && !this.viewerIsOwner
        },
        isClosed(){
            return !this.isActive
        }
    }

}
</script>