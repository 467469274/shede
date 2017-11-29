import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import bannerList from '@/components/bannerList/bannerList'
import addBanner from '@/components/bannerList/addBanner'
import contentList from '@/components/content/contentList'
import contentDetail from '@/components/content/contentDetail'
import labelAd from '@/components/labelAd/labelAd'
import labelAdd from '@/components/labelAd/labelAdd'
import branchList from '@/components/branch/branchList'
import equipmentList from '@/components/equipment/equipmentList'
import branchDetail from '@/components/branch/branchDetail'
import equipmentDetail from '@/components/equipment/equipmentDetail'
import logisticsDetail from '@/components/logisticsDetail/logisticsDetail'
import orderDetail from '@/components/order/orderDetail'
import orderList from '@/components/order/orderList'
import commentList from '@/components/comment/commentList'
import commodityList from '@/components/commodity/commodityList'
import commentDetail from '@/components/comment/commentDetail'
import commodityDetail from '@/components/commodity/commodityDetail'
import course from '@/components/commodity/course'
import showkc from '@/components/commodity/showkc'
import showpq from '@/components/showpq/showpq'
import adminList from '@/components/admin/adminList'
import addAdmin from '@/components/admin/addAdmin'
import adminTeamList from '@/components/admin/adminTeamList'
import addTeam from '@/components/admin/addTeam'
import menberList from '@/components/menber/menberList'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/bannerList',
      name: 'bannerList',
      component: bannerList
    },{
      path: '/addBanner/:id',
      name: 'addBanner',
      component: addBanner
    },{
      path: '/contentList',
      name: 'contentList',
      component: contentList
    },{
      path: '/contentDetail/:id',
      name: 'contentDetail',
      component: contentDetail
    },{
      path: '/labelAd',
      name: 'labelAd',
      component: labelAd
    },{
      path: '/labelAdd/:id',
      name: 'labelAdd',
      component: labelAdd
    },{
      path: '/branchDetail/:id',
      name: 'branchDetail',
      component: branchDetail
    },{
      path: '/branchList/:id',
      name: 'branchList',
      component: branchList
    },{
      path: '/equipmentList/:id',
      name: 'equipmentList',
      component: equipmentList
    },{
      path: '/equipmentDetail/:id',
      name: 'equipmentDetail',
      component: equipmentDetail
    },{
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: orderDetail
    },{
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },{
      path: '/logisticsDetail/:id',
      name: 'logisticsDetail',
      component: logisticsDetail
    },{
      path: '/commentList/:type/:id',
      name: 'commentList',
      component: commentList
    },{
      path: '/commentDetail/:id/:type',
      name: 'commentDetail',
      component: commentDetail
    },{
      path: '/commodityList/:type/:id',
      name: 'commodityList',
      component: commodityList
    },{
      path: '/commodityDetail/:id',
      name: 'commodityDetail',
      component: commodityDetail
    },{
      path: '/showpq/:id',
      name: 'showpq',
      component: showpq
    },{
      path: '/course/:id',
      name: 'course',
      component: course
    },{
      path: '/showkc/:id',
      name: 'showkc',
      component: showkc
    },{
      path: '/adminList',
      name: 'adminList',
      component: adminList
    },{
      path: '/addAdmin/:id',
      name: 'addAdmin',
      component: addAdmin
    },{
      path: '/adminTeamList',
      name: 'adminTeamList',
      component: adminTeamList
    },{
      path: '/addTeam/:id',
      name: 'addTeam',
      component: addTeam
    },{
      path: '/menberList/:id',
      name: 'menberList',
      component: menberList
    },
    {
      path: '*',
      component:index
    }
  ]
})
