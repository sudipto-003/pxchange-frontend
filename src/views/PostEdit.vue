<template>
    <div>
        <b-row class="my-5" align-h="center">
            <b-col lg="6" align-self="center">
                <b-card border-variant="primary"
                    header="Edit Sell Advisement Post"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                >
                    <b-card-text>This post will be no longer verified as edited after published. An admin will verify it soon.</b-card-text>

                    <b-form @submit="onSubmit">
                        <b-form-group id="ig1" label="Title:" label-for="i1">
                            <b-form-input id="i1" v-model="post.title" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-select v-model="post.category" :options="categoryOptions"></b-form-select>
                        <div>Category: <strong>{{ post.category }}</strong></div>
                        <b-form-group id="ig3" label="Description:" label-for="i3">
                            <b-form-textarea id="i3" v-model="post.description" required></b-form-textarea>
                        </b-form-group>
                        <b-form-group id="ig4" label="Price:" label-for="i4">
                            <b-form-input id="i4" v-model="post.asked_price" type="number" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="ig5" label="Quantity:" label-for="i5">
                            <b-form-input id="i5" v-model="post.quantity" type="number" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="ig6" label="Location:" label-for="i6">
                            <b-form-input id="i6" v-model="post.location" type="text" required></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="success">Save</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from'axios'
export default {
    name: 'PostEdit',
    data(){
        return {
            post: {
                id: null,
                title: '',
                description: '',
                asked_price: 0.0,
                quantity: 0,
                category: '',
                location: ''
            },
            categoryOptions: [
               'Home Appliances', 'Electronics', 'Computers & Smartphones', 'Vehicles', 'Accessories', 'Musical Instruments', 'Furnitures'
            ]
        }
    },
    created(){
        this.fetch_data()
    },
    methods: {
        fetch_data(){
            let id = this.$route.params.id
            axios({url: `http://127.0.0.1:9000/sell/detail/${id}/`, method: 'GET'})
            .then(resp => {
                this.post.id = resp.data.id
                this.post.title = resp.data.title
                this.post.description = resp.data.description
                this.post.category = resp.data.category
                this.post.asked_price = resp.data.asked_price
                this.post.quantity = resp.data.quantity
                this.post.location = resp.data.location
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSubmit(e){
            e.preventDefault()
            axios({url: 'http://127.0.0.1:9000/sell/createadd/', data: this.post, method: 'PUT'})
            .then(() => {
                this.$router.push({name: 'Detail', params: {id: this.post.id}})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>