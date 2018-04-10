import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Settings from '@/views/MySettings'
import MyContract from '@/views/MyContract'
import SignStepOne from '@/views/SignStepOne'
import SignStepTwo from '@/views/SignStepTwo'
import SignStepThree from '@/views/SignStepThree'

/** 租约 **/
import MyLease from '@/views/MyLease'
import LeaseDetail from '@/views/LeaseDetail'
import CancelLease from '@/views/CancelLease'

/** 房租 **/
import Rent from '@/views/Rent'
import RentDetail from '@/views/RentDetail'
import Unpaid from '@/views/Unpaid'
import HavePaid from '@/views/HavePaid'
import Withholding from '@/views/Withholding'
import Payment from '@/views/Payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/lease',
      name: 'MyLease',
      component: MyLease
    },
    {
      path: '/leaseDetail',
      name: 'LeaseDetail',
      component: LeaseDetail
    },
    {
      path: '/rent',
      name: 'Rent',
      component: Rent
    },
    {
      path: '/rentDetail',
      component: RentDetail,
      children: [
        {
          path: '/rentDetail/:id',
          name: 'RentDetail',
          component: HavePaid
        },
        // {
        //   path: '/rentDetail/havePaid/:id',
        //   component: HavePaid
        // }
      ]
    },
    {
      path: '/withholding/:id',
      name: 'Withholding',
      component: Withholding
    },
    {
      path: '/payment/:id',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/myContract',
      name: 'MyContract',
      component: MyContract
    },
    {
      path: '/signStepOne',
      name: 'SignStepOne',
      component: SignStepOne
    },
    {
      path: '/signStepTwo',
      name: 'SignStepTwo',
      component: SignStepTwo
    },
    {
      path: '/signStepThree',
      name: 'SignStepThree',
      component: SignStepThree
    },
    {
      path: '/cancelLease',
      name: 'CancelLease',
      component: CancelLease
    }
  ]
})
