<template>
    <div>
        <template v-if="email_verified">
            <b-row class="m-3" align-h="center">
                <b-col lg=6 align-self="center">
                    <b-card title="Email Verification Link Sent">
                        <b-card-text>
                            Dear {{ username }}, an email with your account verification link has been deliverd to {{ email }}.
                        </b-card-text>
                        <b-card-text>
                            Follow that link or manually login with your account credentials after clicking that link.
                        </b-card-text>
                        <b-card-text>
                            No email deliverd? Click here to <b-button @click="resend" variant="success">Resend Email</b-button>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </template>


        <template v-else>
            <b-row class="m-3" align-h="center">
                <b-col lg=6 align-self="center">
                    <div>
                        <b-icon icon="person-plus-fill" scale="0.5" font-scale="3" class="rounded-circle bg-info m-2" variant="light"></b-icon>
                    </div>
                    <b-form @submit="onSubmit">
                        <b-form-group id="ig1" label="Email address:" label-for="i1" description="Enter a valid email address for verification">
                            <b-form-input id="i1" v-model="email" type="email" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="ig2" label="Username:" label-for="i2" description="Yourname to display others">
                            <b-form-input id="i2" v-model="username" type="text" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="ig3" label="Password:" label-for="i3" description="At least 8 characters, mix of number and character">
                            <b-form-input id="i3" v-model="password" type="password" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="ig4" label="Conform Password:" label-for="i4" description="Conform your password">
                            <b-form-input id="i4" v-model="password2" type="password" :state="passwordmatch" required></b-form-input>
                            <b-form-invalid-feedback :state="passwordmatch">
                                Your password don't match.
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="passwordmatch">
                                Your password match
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Signup</b-button>
                    </b-form>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <p>Already have an account then <b-link to="/login">Login</b-link> here.</p>
            </b-row>
        </template>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'Signup',
    data(){
        return {
            email: '',
            username: '',
            password: '',
            password2: '',
            email_sent: false,
            resened: false
        }
    },

    methods: {
        onSubmit(e){
            e.preventDefault()
            let user_data = {
                email: this.email,
                username: this.username,
                password: this.password,
                password2: this.password2
            }
            console.log(user_data)
            /*
            axios({url: 'http://127.0.0.1:9000/auth/register/', data: user_data, method: 'POST'})
            .then(resp => {
                if(resp.status === 201){
                    this.email_sent = true
                }
            })
            .catch(err => {
                console.log(err)
            })
            */
        },
        resend(){
            let email = this.email
            axios({url: 'http://127.0.0.1:9000/auth/resend_code/', data: {email}, method: 'POST'})
            .then(resp => {
                if(resp.status === 200){
                    this.resened = true
                }
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    },

    computed: {
        passwordmatch() {
            return this.password === this.password2 && this.password2 !== ''
        },
        email_verified() {
            return this.email_sent
        },
        email_resened(){
            return this.email_resened
        }
    }
}
</script>