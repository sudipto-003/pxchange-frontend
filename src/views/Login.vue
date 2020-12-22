<template>
    <div>
        <b-row class="my-5" align-h="center">
            <b-col lg="6" align-self="center">
                <div>
                    <b-icon icon="person-check-fill" scale="0.5" font-scale="3" class="rounded-circle bg-info m-2" variant="light"></b-icon>
                </div>
                <b-form @submit="onSubmit">
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="envelope"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="email" type="email" v-model="email" placeholder="Your email address"></b-form-input>
                    </b-input-group>
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="key"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="password" type="password" v-model="password" placeholder="Your password"></b-form-input>
                    </b-input-group>
                    <b-button type="submit" variant="success">Login</b-button>
                </b-form>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <p>Don't have any account then <b-link to="/signup">Signup</b-link> here.</p>
        </b-row>
    </div>
</template>


<script>
export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        onSubmit(e){
            e.preventDefault()
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', {email, password})
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        }
    }
}
</script>