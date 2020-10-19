<template>
    <div class="row">
        <div class="col">
            <h3>TESTING STATE MANAGEMENT, </h3>
            poop
            <div class="alert alert-info">
                {{userInfo.username}}
            </div>
            <router-link to="/">
                Home
            </router-link>
            <br>
            <router-link to="/logout">
                Logout
            </router-link>
        </div>
    </div>
</template>

<script>
import auth from '@/services/auth'

export default {
    name: 'TestPage',
    data: function() {
        return{
            userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
            userInfo: auth.state()
        }
    }
}
</script>

<style>

</style>
