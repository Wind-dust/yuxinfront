import Vue from 'vue';
import Router from 'vue-router';

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const Home = r => require.ensure([], () => r(require('../components/common/Home')), 'Home')
const index = r => require.ensure([], () => r(require('../components/page/index')), 'index')

const article = r => require.ensure([], () => r(require('../components/page/article')), 'article')

const member = r => require.ensure([], () => r(require('../components/page/jurisdiction/member')), 'member')
const group = r => require.ensure([], () => r(require('../components/page/jurisdiction/group')), 'group')
const permissions = r => require.ensure([], () => r(require('../components/page/jurisdiction/permissions')), 'permissions')
const peoplemanagement = r => require.ensure([], () => r(require('../components/page/jurisdiction/peoplemanagement')), 'peoplemanagement')
const jurisdictionList = r => require.ensure([], () => r(require('../components/page/jurisdiction/jurisdictionList')), 'jurisdictionList')

const login = r => require.ensure([], () => r(require('../components/login/login')), 'login')
const signIn = r => require.ensure([], () => r(require('../components/login/signIn')), 'signIn')

const modifyPwd = r => require.ensure([], () => r(require('../components/page/jurisdiction/modifyPwd')), 'modifyPwd')

const qualification = r => require.ensure([], () => r(require('../components/page/account/qualification')), 'qualification')
const account = r => require.ensure([], () => r(require('../components/page/account/account')), 'account')
const subAccount = r => require.ensure([], () => r(require('../components/page/account/service')), 'subAccount')
const myService = r => require.ensure([], () => r(require('../components/page/account/myService')), 'myService')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: '/',
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '',
      component: index
    }, {
      path: '/index',
      component: index
    }, {
      path: '/member',
      component: member
    }, {
      path: '/group',
      component: group,
    }, {
      path: '/group/permissions',
      component: permissions
    }, {
      path: '/group/peoplemanagement',
      component: peoplemanagement
    }, {
      path: '/jurisdictionList',
      component: jurisdictionList
    },
      {
        path: '/modifyPwd',
        component: modifyPwd
      }, {
        path: '/qualification',
        component: qualification
      }, {
        path: '/account',
        component: account
      }, {
        path: '/subAccount',
        component: subAccount
      }, {
        path: '/myService',
        component: myService
      }]
  }, {
    path: '/login',
    component: login
  }, {
    path: '/signIn',
    component: signIn
  }]
})
