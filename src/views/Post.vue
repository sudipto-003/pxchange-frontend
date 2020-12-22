<template>
    <div>
        <div v-if="imageform">
            <ImageAddForm v-on:imageAdd="upload_images"/>
        </div>
        <div v-else>
            <PostCreateForm v-on:form_submit="create_post"/>
        </div>
    </div>
</template>

<script>
import PostCreateForm from '../components/PostCreateForm'
import ImageAddForm from '../components/ImageAddForm'
import axios from 'axios'

export default {
    name: 'Post',
    components: {
        PostCreateForm,
        ImageAddForm
    },
    data(){
        return {
            post_created: false,
            post_id: -1
        }
    },
    methods: {
        create_post(data){
            let post = {
                title: data.title,
                description: data.description,
                category: data.category,
                asked_price: data.asked_price,
                quantity: data.quantity,
                location: data.location
            }
            
            axios({url: 'http://127.0.0.1:9000/sell/createadd/', data: post, method: 'POST'})
            .then(resp => {
                this.post_id = resp.data.id
                this.post_created = true
            })
            .catch(err => {
                console.log(err)
            })
            
        },
        upload_images(files){
            let formdata = new FormData()
            for(let i = 0; i < files.length; i++){
                formdata.append('image'+i, files[i])
                console.log('Hello')
            }
            formdata.append('num', files.length)
            formdata.append('post_id', this.post_id)
            /*
            for(var pair of formdata.entries()){
                console.log(pair[0] + ',' + pair[1])
            }
            */
            axios({
                url: 'http://127.0.0.1:9000/sell/attachimg/',
                data: formdata, 
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'}
                })
                .then(resp => {
                    if(resp.status == 200){
                        this.$router.push('/')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    computed: {
        imageform(){
            return this.post_created
        }
    }
}
</script>