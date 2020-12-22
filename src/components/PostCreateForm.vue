<template>
    <div>
        <b-row class="my-5" align-h="center">
            <b-col lg="6" align-self="center">
                <b-card border-variant="primary"
                    header="New Sell Advertisement"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                >
                    <b-card-text>Create a post for your selling product</b-card-text>

                    <b-form @submit="onSubmit">
                        <b-form-group id="ig1" label="Title:" label-for="i1" description="Give a title for your post">
                            <b-form-input id="i1" v-model="post.title" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-select v-model="post.category" :options="categoryOptions"></b-form-select>
                        <div>Category: <strong>{{ post.category }}</strong></div>
                        <b-form-group id="ig3" label="Description:" label-for="i3" description="Details about the product">
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
                        <b-button type="submit" variant="success">Continue</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'PostCreateForm',
    data(){
        return {
            post: {
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
    methods: {
        onSubmit(e){
            e.preventDefault()
            this.$emit('form_submit', this.post)
        }
    }
}
</script>