import Vue from 'vue'
import VueRouter from 'vue-router'
/*import LoginView from '../views/LoginView.vue'
import dashboard from '../views/DashBoardView.vue'
import planos from '../views/PlanosView.vue'
import PaymentMethodsView from '../views/PaymentMethodsView.vue'*/
import notfound from '../views/NotFoundView.vue'
/*import ProfileView from '../views/Profileview.vue';
import EmailConfirmView from '../views/ConfirmEmailChange.vue';
import EmailConfirmCreate from '../views/ConfirmEmailCreate.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ForgotPasswordUpdate from '../views/ForgotPasswordUpdate.vue';
import CreateUserView from '../views/CreateUserView.vue';
import updateIugu from '../views/UpdateIuguView.vue';
import axios from 'axios'*/

Vue.use(VueRouter)
/*
function Login(to, from, next) {
  if (localStorage.getItem("token") != undefined) {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    axios.get("https://sinprev.com.br/user/verify", req).then(res => {
      console.log(res);
      next();
    }).catch(err => {
      console.log(err.response);
      window.location.href = "https://areaassociado.herokuapp.com/";
    });
  } else {
    window.location.href = "https://areaassociado.herokuapp.com/";
  }
}

function out(to, from, next) {
  if (localStorage.getItem("token") != undefined) {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    axios.get("https://sinprev.com.br/user/logout", req).then(res => {
      console.log(res);
      localStorage.removeItem('token');
      localStorage.removeItem('plan');
      localStorage.removeItem('user');
      localStorage.removeItem('iuguerr');
      localStorage.removeItem('safepayError');
      window.location.href = "https://areaassociado.herokuapp.com/";
      next();
    }).catch(err => {
      console.log(err.response);
      localStorage.removeItem('token');
      window.location.href = "https://areaassociado.herokuapp.com/";
      next();
    });
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('plan');
    localStorage.removeItem('user');
    localStorage.removeItem('iuguerr');
    localStorage.removeItem('safepayError');
    localStorage.getItem('token') ? window.location.href = "https://areaassociado.herokuapp.com/" : next();

  }


}*/

const routes = [
  /*{
    path: '/UpdateIugu',
    name: 'updateIugu',
    component: updateIugu,
    beforeEnter: Login
  },
  {
    path: '/create',
    name: 'createUser',
    component: CreateUserView,
    beforeEnter: out
  },
  {
    path: '/user/reset/:token',
    name: 'ForgotPassword',
    component: ForgotPasswordUpdate,
    beforeEnter: out
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotPassword,
    beforeEnter: out
  },
  {
    path: '/user/checkEmail/:token',
    name: 'EmailConfirmCreate',
    component: EmailConfirmCreate,
    beforeEnter: out
  },
  {
    path: '/user/reset/email/:token',
    name: 'emailConfirm',
    component: EmailConfirmView,
    beforeEnter: out
  },
  {
    path: '/',
    name: 'home',
    component: LoginView,
    beforeEnter: out
  },*/
  {
    path: '/404',
    name: 'noteFound.index',
    component: notfound,
    //beforeEnter: out
  },
  {
    path: '/',
    name: 'home',
    component: notfound,
    //beforeEnter: out
  },
  {
    path: '*',
    redirect: '/404',
   // beforeEnter: out,
  },
  /*{
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    beforeEnter: Login
  },
  {
    path: '/planos',
    name: 'planos',
    component: planos,
    beforeEnter: Login
  },
  {
    path: '/payment-method',
    name: 'creditCard',
    component: PaymentMethodsView,
    beforeEnter: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: Login
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
