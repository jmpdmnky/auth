/* eslint-disable */
/* originally based on https://sanaulla.info/2019/04/20/integrating-amazon-cognito-with-single-page-application-vue-js/ */
// https://github.com/svrcekmichal/redux-axios-middleware/issues/78  <--- save this for when i need onSuccess/Failure
/* eslint-disable */
// TODO: send verification code instead of link, redirect to verify page?
// TODO: change password
// TODO: forgot password
// TODO: cookies https://medium.com/@sadnub/simple-and-secure-api-authentication-for-spas-e46bcea592ad

import router from '../router/index';
import axios from 'axios';



// TODO: get from env vars
const LOGIN_URL = process.env.LOGIN_URL
const LOGOUT_URL = process.env.LOGOUT_URL
const SIGNUP_URL = process.env.SIGNUP_URL
const RESEND_VERIFICATION_URL = process.env.RESEND_VERIFICATION_URL //username in path

var auth_urls = {
    login: LOGIN_URL,
    logout: LOGOUT_URL,
    signup: SIGNUP_URL,
    resendVerification: RESEND_VERIFICATION_URL
}

var auth_state = {} //TODO: Old state management had a "loggedIn" bool, but we didn't use it for anything. Need to decide if needed


class AuthService {
    // TODO:  can we manage auth state here?
    constructor(urls) {
        this.auth_urls = urls
    }

    // get tokens given appropriate creds
    authenticate(credentials) {
        if(credentials.username && credentials.password) {
            return axios.post(this.auth_urls.login, credentials, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log('got tokens!')
                console.log(response)
                return response.data;
            })/*.catch(e => {
                console.log('authenticate catch!')
                console.log(e.response)
                console.log(e)
                //console.log(this)
                //this.errors.push(e)
                //throw e
            })*/
        }
        else if(credentials.RefreshToken){
            // if RefreshToken given, refresh
            return {}
        }
    }

    logout(token) {
        console.log("TODO:  Implement logout api method")            
    }

    signup(data) {
        return axios.post(this.auth_urls.signup, data, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log('registered user!')
            return JSON.parse(response.data.body);
        }).catch(e => {
            console.log(e)
            console.log(e.response)
        })
    }

    // verify that token is still valid TODO
    token_active(token) {
        if (token) {
            console.log("TODO: actually check token")
            return true
        }
        return false
    }

    resendVerification(username) {
        return axios.post(this.auth_urls.resendVerification + username, {}, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
    }
}

function log_in(credentials, redirect) {
    authService.authenticate(credentials)
    .then(response => {
        auth_state = response
        router.push(redirect)
    })
    .catch(e => {
        console.log(e.response)
        router.push({ name: 'Login', params: {loginError: e.response.data}}).catch(err => {
            // Ignore the vuex err regarding  navigating to the page they are already on.
            if (
              err.name !== 'NavigationDuplicated' &&
              !err.message.includes('Avoided redundant navigation to current location')
            ) {
              // But print any other errors to the console
              logError(err);
            }
          })
    })
}

function logged_in() {
    if(auth_state) {
        return authService.token_active(auth_state.AccessToken)
    }
    return false
}

function logout() {
    authService.logout()
    auth_state = {}
    // TODO: give a success message on logout?
    router.push('/')
}

function signup(user_data) {
    authService.signup(user_data)
    //TODO: do something like tell them we sent an email?
}

function refreshToken(){
    authService.authenticate({ RefreshToken: auth_state.RefreshToken})
}

function resendVerificationEmail(username) {
    authService.resendVerification(username)
}

function state() {
    return auth_state
}

const authService = new AuthService(auth_urls)

export default {
     service: authService,
     state,
     log_in,
     logged_in,
     logout,
     refreshToken,
     signup,
     resendVerificationEmail
}