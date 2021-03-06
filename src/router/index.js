import Vue from 'vue';
import Router from 'vue-router';


const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  // console.log(routerPush.call(this, location))
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
const license = r => require.ensure([], () => r(require('../components/page/account/license')), 'license')
const accountList = r => require.ensure([], () => r(require('../components/page/account/accountList')), 'accountList')

const businessMessage = r => require.ensure([], () => r(require('../components/page/sms/businessMessage')), 'businessMessage')
const marketingMessage = r => require.ensure([], () => r(require('../components/page/sms/marketingMessage')), 'marketingMessage')
const template = r => require.ensure([], () => r(require('../components/page/sms/components/tempManage')), 'template')
const dataDetail = r => require.ensure([], () => r(require('../components/page/report/dataDetail')), 'dataDetail')
const dataInfo = r => require.ensure([], () => r(require('../components/page/report/dataInfo')), 'dataInfo')
const templateDetail = r => require.ensure([], () => r(require('../components/page/report/templateDetail')), 'templateDetail')

const addressList = r => require.ensure([], () => r(require('../components/page/addressList/addressList')), 'addressList')

const message = r => require.ensure([], () => r(require('../components/page/systemMessage/systemMessage')), 'systemMessage')

const sendDetail = r => require.ensure([], () => r(require('../components/page/report/sendDetail')), 'sendDetail')

const settlement = r => require.ensure([], () => r(require('../components/page/settlement/settlement')), 'settlement')

// const payRank = r => require.ensure([],()=>r(require('../components/page/settlement/settlement')),'settlement')
const mms = r => require.ensure([], () => r(require('../components/page/sms/mms')), 'mms')
const signature = r => require.ensure([], () => r(require('../components/page/sms/components/signature')), 'signature')
const monthReport = r => require.ensure([], () => r(require('../components/page/report/monthReport')), 'monthReport')
const yearReport = r => require.ensure([], () => r(require('../components/page/report/yearReport')), 'yearReport')
const createMms = r => require.ensure([], () => r(require('../components/page/sms/components/createMmsTemp')), 'createMmsTemp')
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
      }, {
        path: '/marketingMessage',
        component: marketingMessage
      }, {
        path: '/businessMessage',
        component: businessMessage
      }, {
        path: '/templateDetail',
        component: templateDetail
      }, {
        path: '/dataDetail',
        component: dataDetail
      }, {
        path: '/dataInfo',
        component: dataInfo
      }, {
        path: '/addressList',
        component: addressList
      }, {
        path: '/message',
        component: message
      }, {
        path: '/license',
        component: license
      }, {
        path: '/sendDetail',
        component: sendDetail
      }, {
        path: "/accountList",
        component: accountList
      }, {
        path: '/settlement',
        component: settlement
      }, {
        path: '/signature',
        component: signature
      }, {
        path: '/mms',
        component: mms
      }, {
        path: '/sms/template',
        component: template
      }, {
        path: '/monthReport',
        component: monthReport
      }, {
        path: '/yearReport',
        component: yearReport
      }, {
        path: '/createMms',
        component: createMms
      }]
  }, {
    path: '/login',
    component: login
  }, {
    path: '/signIn',
    component: signIn
  }]
})
