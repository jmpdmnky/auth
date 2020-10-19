/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'

import auth from '../services/auth';
//import UserInfoStore from '../store/state';

import ErrorComponent from '@/pages/Error';
import LogoutSuccess from '@/pages/LogoutSuccess';
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Home from '../pages/Home'
import TestPage from '../pages/TestPage'

Vue.use(Router)

function requireAuth(to, from, next) {
  if (!auth.logged_in()) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
        params: { redirect: to.fullPath }
      });
  } else {
    // replace with logic to refresh tokens?
    next()
  }
}

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'Login',
      props: true,
      component: Login
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: Signup
    },
    {
      path: '/logout',
      component: LogoutSuccess, 
      beforeEnter(to, from, next){
        auth.logout();
        next();
      }
    },
    {
      path: '/error', 
      component: ErrorComponent
    },
    {
      path: '/test',
      name: 'Test Page',
      component: TestPage,
      beforeEnter: requireAuth
    }
  ]
})

export default router
