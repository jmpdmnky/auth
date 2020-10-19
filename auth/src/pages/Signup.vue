<template>
    <div class="row">
        <div class="col">
            <h3>Sign Up </h3>
            <div class="login">
                <input type="text" name="username" v-model="signup_data.username" placeholder="Username" />
                <br>
                <input type="text" name="email" v-model="signup_data.email" placeholder="Email Address" />
                <br>
                <input type="password" name="password" v-model="signup_data.password" placeholder="Password" />
                <br>
                <input type="password" name="confirm_password" v-model="confirm_password" placeholder="Confirm Password" />
                <br>
                <button type="button" v-on:click="signUp()">Sign up</button>
            </div>
            <router-link to="/logout">
                Logout
            </router-link>
            <br>
            <router-link to="/Test">
                Test
            </router-link>

            <br>
            {{ userInfo }}
        </div>
    </div>
</template>

<script>
import auth from '@/services/auth'

//should we dynamically generate fields based on given requirements?
//TODO actually use "confirm_password", set up required fields

export default {
    name: 'Signup',
    data: function() {
        return {
            signup_data: {
                username: '',
                password: '',
                email: ''
            },
            confirm_password: '',
            userInfo: auth.state()
        }
    },
    methods: {
        signUp() {
            auth.signup(this.signup_data)
        }
    }
}
</script>

<style>

</style>
