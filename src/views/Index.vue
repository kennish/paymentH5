<template>
  <section class="container">

    <mt-header title="首页" class="header">
      <router-link to="/" slot="left">
        <i class="iconfont" style="color: #ff790e">&#xe6b8;</i>
      </router-link>
      <router-link to="/settings" slot="right">
        <i class="iconfont" style="color: #999999">&#xe78b;</i>
      </router-link>
    </mt-header>

    <div class="content">

      <div class="entrance">
          <div class="entrance1">
              <div class="entrance-item">
                  <router-link class="entrance-link" to="/lease">
                      <i class="iconfont">&#xe699;</i>
                      <span>租约</span>
                  </router-link>
              </div>
              <div class="entrance-item">
                  <router-link class="entrance-link" to="/rent">
                      <i class="iconfont">&#xe6ed;</i>
                      <span>房租</span>
                  </router-link>
              </div>
          </div>

      </div>

      <div class="lease-wrap" v-show="rowsUnSign.length">
        <div class="lease-item" v-for="item in rowsUnSign">
              <div class="lease-header">
                  <div class="lease-icon">
                      <i class="iconfont">&#xe791;</i>
                  </div>
                  <div class="lease-title">
                      <h3>租约</h3>
                      <span>{{now}}</span>
                  </div>
              </div>
              <div class="lease-info">
                  <h2>你有一份租约待确认</h2>
                  <span>房源地址：{{item.addressDetail}}</span>
              </div>
              <router-link :to="{ path: '/leaseDetail', query: {id: item.id }}" tag="div" class="lease-link">去确认</router-link>
          </div>
      </div>

      <div class="lease-wrap" v-show="rowsUnPay.length">
        <div class="lease-item" v-for="item in rowsUnPay">
          <div class="lease-header">
            <div class="lease-icon">
              <i class="iconfont" style="color: rgba(255, 186, 0, .5)">&#xe6ed;</i>
            </div>
            <div class="lease-title">
              <h3>房租</h3>
              <span>{{now}}</span>
            </div>
          </div>
          <div class="lease-info">
            <h2>你有一份账单需要支付</h2>
            <span>{{item.payRentDate.replace(/\//g,'-')}} 前支付</span>
          </div>
          <router-link :to="{ path: '/rentDetail/' + item.payRentId, query: {htId: item.id}}" tag="div" class="lease-link">查看详情</router-link>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
  export default{
    data () {
      return {
        user:{},
        rowsUnSign: [],
        rowsUnPay: []
      }
    },
    computed: {
      now: function () {
        return this.dateToString(new Date())
      }
    },
    methods: {
      dateToString (d) {
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        month = month < 10 ? ('0' + month) : month
        let date = d.getDate()
        date = date < 10 ? ('0' + date) : date
        let hours = d.getHours()
        hours = hours < 10 ? ('0' + hours) : hours
        let minutes = d.getMinutes()
        minutes = minutes < 10 ? ('0' + minutes) : minutes
        let result = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
        return result
      },
      requestData: function () {
        var myVue = this
        myVue.request({
          methodId: '8082',
          data: {
            openId: this.user.openId
          },
          success: function (res) {
            if (res.code === '0') {
              myVue.rowsUnSign = res.res.data.rowsUnSign
              myVue.rowsUnPay = res.res.data.rowsUnPay
            }
          }
        })
      }
    },
    created () {
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user  == null){
        this.$router.push({path:'/login'})
        return
      }
      this.requestData()
    }
  }
</script>

<style>
.entrance{
  padding: 0 1rem;
  background: #ffffff;
  display: block;
  margin-top: .5rem;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
    z-index: 9999;
}
.entrance1 {
    display: flex;
}
.entrance .entrance-item{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 6.8rem;
}
.entrance .entrance-item .entrance-link{
  text-align: center;
}
.entrance .entrance-item .entrance-link i{
  font-size: 2.2rem;
  color: rgba(27, 156, 255, 1)
}
.entrance .entrance-item:last-child .entrance-link i{
  color: rgba(255, 186, 0, 1)
}
.entrance .entrance-item .entrance-link span{
  display: block;
  font-size: .7rem;
  color: #333333;
  margin-top: .5rem;
}

.lease-wrap{
  margin-top: .5rem;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.lease-item{
  background: #ffffff;
  padding-top: 1rem;
}
.lease-header{
  display: flex;
}
.lease-icon{
  display: flex;
  width: 2rem;
  justify-content: flex-end;
}
.lease-icon i{
  font-size: 1.5rem;
  color: rgba(203, 231, 255, 1);
}
.lease-title{
  padding-left: .3rem;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.lease-title h3{
  font-size: .7rem;
  color: #666666;
  font-weight: normal;
}
.lease-title span{
  font-size: .6rem;
  color: #999999;
  margin-top: .3rem;
}
.lease-info{
  padding-left: 2.3rem;
  box-sizing: border-box;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.lease-info h2{
  font-size: .8rem;
  color: #333333;
  font-weight: normal;
}
.lease-info span{
  display: block;
  font-size: .6rem;
  color: #999999;
  margin-top: .5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: .5rem;
}
.lease-link{
  display: flex;
  height: 2rem;
  background: rgba(249, 249, 249, 1);
  justify-content: center;
  align-items: center;
  font-size: .7rem;
  color: #999999;
}
.lease-item + .lease-item {
    margin-top: .5rem;
}
</style>

