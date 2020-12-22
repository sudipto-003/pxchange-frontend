<template>
    <div>
        <b-row class="my-5" align-h="center">
            <b-col lg="6" align-self="center">
                <b-card border-variant="primary"
                    header="Attach images to the newly created post"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                >
                    <b-form-file v-model="files" accept="image/*" multiple @change="onFileChange"></b-form-file>
                    <b-card-text class="p-3 ml-auto">Attach the following images
                        <b-button variant="success" @click="upload_images">Attach Images</b-button>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
        <b-container fluid class="p-4 bg-dark">
            <b-row>
                <div v-for="(image, key) in files" :key="key">
                    <b-col>
                        <b-img thumbnail width="400" height="200" fluid class="preview" :ref="'image'"/>
                        
                    </b-col>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'ImageAddForm',
    data(){
        return {
            files: []
        }
    },
    methods: {
        upload_images(){
            /*
            let formdata = new FormData()
            for(let i = 0; i < this.files.length; i++){
                formdata.append('image'+i, this.files[i])
            }
            formdata.append('num', this.files.length)
            
            for(var pair of formdata.entries()){
                console.log(pair[0] + ',' + pair[1])
            }*/

            this.$emit('imageAdd', this.files)
        },

        onFileChange(e){
            let selectedfiles = e.target.files
            for(let i=0; i<selectedfiles.length; i++){
                this.files.push(selectedfiles[i])
            }

            for(let i=0; i<this.files.length; i++){
                let reader = new FileReader()
                reader.onload = () => {
                    this.$refs.image[i].src = reader.result
                    //console.log(this.$refs.image[i].src) 
                }

                reader.readAsDataURL(this.files[i])
            }
        }
    }
}
</script>