<template>
    <div class="row">
        <div class="col">
            <h3>Log in </h3>
            <div class="login">
                <div v-if="loginError.includes('NotAuthorizedError')">Invalid username or password</div>
                <div v-if="loginError.includes('NotConfirmedError')">Account has not been verified yet. Click <a v-on:click="resendVerificationEmail()" href="javascript:void(0)">here</a> to resend verification email.</div>
                <br>
                <input type="text" name="username" v-model="login_data.username" placeholder="Username" v-on:keyup.enter="login()" />
                <br>
                <input type="password" name="password" v-model="login_data.password" placeholder="Password" v-on:keyup.enter="login()" />
                <br>
                <button type="button" v-on:click="login()" >Login</button>
            </div>
            <router-link to="/logout">
                Logout
            </router-link>
            <br>
            <router-link to="/Test">
                Test
            </router-link>
            <br>
            <router-link to="/signup">
                Sign up
            </router-link>
            <br>
            {{ redirect }}
        </div>
    </div>
</template>

<script>
import auth from '@/services/auth'
import router from '../router/index';

export default {
    name: 'Login',
    data: function() {
        return {
            login_data: {
                username: '',
                password: ''
            },
            userInfo: auth.state()
        }
    },
    props: {
        redirect: {
            type: String,
            required: false,
            default: '/'
        },
        loginError: {
            type: String,
            required: false,
            default: ''
        }
    },
    computed: {
        errorMessage() {
            if (this.loginError.includes('NotAuthorizedError')) {
                return "Invalid username or password"
            }
            else if (this.loginError.includes('NotConfirmedError')) {
                return 'Account has not been verified yet. TODO click <a ref="resendemail" href="#">here</a> to resend verification email.'
            }
            else {
                return ""
            }
        }
    },
    methods: {
        login() {
            console.log(this.redirect)
            auth.log_in(this.login_data, this.redirect)
        },
        resendVerificationEmail() {
            console.log('resendVerificationEmail')
            auth.resendVerificationEmail(this.login_data.username)
        }
    }
}
</script>

<style>

</style>
