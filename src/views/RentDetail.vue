<template>
  <section class="container">
    <div class="rent-header">
      <mt-header title="租金账单" class="header" style="background: none; color: #ffffff; border: none;">
          <div slot="left" @click="back">
              <i class="iconfont" style="color: #ffffff">&#xe679;</i>
          </div>
      </mt-header>
      <div class="rent-header-info" v-if="rentInfo">
        <div class="due-date"> {{rentInfo.payRentDate}} 应还（元）</div>
        <div class="repayment">{{rentInfo.payRentAmount}}</div>
        <div class="rent-handle">
           <router-link v-if="!isWx" :to="{path: '/withholding/'+$route.params.id, query: {htId: $route.query.htId}}" class="rent-handle-btn" tag="div" style="margin-right: 1.6rem;">开通代扣</router-link>
          <!--<router-link :to="{path: '/rentDetail/'+$route.params.id, query: {htId: $route.query.htId}}" class="rent-handle-btn disabled" tag="div" style="margin-right: 1.6rem;">开通代扣</router-link>-->
          <router-link v-if="payStatus" :to="{name: 'Payment', params: {id: $route.params.id}, query: {htId: $route.query.htId, payAmount: rentInfo.payRentAmount, rentDate: rentInfo.payRentDate.replace(/\//g,'-')}}" class="rent-handle-btn" tag="div">立即支付</router-link>
          <router-link v-if="!payStatus" :to="{name: 'Payment', params: {id: $route.params.id}, query: {htId: $route.query.htId, payAmount: rentInfo.payRentAmount, rentDate: rentInfo.payRentDate.replace(/\//g,'-')}}" class="rent-handle-btn" tag="div">提前支付</router-link>
        </div>
      </div>
    </div>
    <div class="content" style="overflow: hidden;">
      <div class="rent-nav">
        <!-- <router-link class="rent-nav-link" exact :to="{path: '/rentDetail/'+ $route.params.id}" tag="div">待支付</router-link> -->
        <router-link class="rent-nav-link" :to="{name: 'RentDetail', query: {htId: $route.query.htId}}" tag="div">已支付</router-link>
      </div>
      <router-view class="content"/>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      rentInfo: null,
      payStatus: true,
      toDay: new Date().toLocaleDateString(), //今天 2018/03/31
      isWx: true
    }
  },
  created () {
    this.requestDetailData()
    //判断是否是微信浏览器访问
    const is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})()
    if(is_weixin){
      this.isWx = true
    }else{
      this.isWx = false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    requestDetailData () {
      var myVue = this
      myVue.$indicator.open()
      this.request({
        methodId:'8077',
        data: {
          payRentId: this.$route.params.id
        },
        success: function (res) {
          myVue.rentInfo = res.res.data.rows[0]
          if (new Date(myVue.toDay) < new Date(myVue.rentInfo.payRentDate)) { // 提前支付
            myVue.payStatus = false
          } else{ // 立即支付
            myVue.payStatus = true
          }
        },
        complete: function () {
          myVue.$indicator.close()
        }
      })
    }
  }
}
</script>

<style>
.rent-header{
  height: 10rem;
  background: linear-gradient(rgb(253, 193, 58), rgb(247, 125, 11));
}
.rent-header-info{
  display: flex;
  flex-direction: column;
}
.due-date{
  display: flex;
  justify-content: center;
  font-size: .6rem;
  color: #ffffff;
  margin-top: .5rem;
}
.repayment{
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: #ffffff;
  margin-top: .5rem;
}
.rent-handle{
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.rent-handle-btn{
  display: flex;
  width: 5.4rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 1.5rem;
  font-size: .7rem;
  color: #ffffff;
}
.rent-handle-btn.disabled{
  border-color: rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.4);
}
.rent-nav{
  display: flex;
}
.rent-nav-link{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 1.9rem;
  background: #ffffff;
  font-size: .7rem;
  color: #666666;
}
.rent-nav-link.router-link-active{
  border-bottom: 1px solid rgb(255, 121, 14);
  color: rgb(255, 121, 14);
}
</style>

