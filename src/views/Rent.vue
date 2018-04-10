<template>
  <section class="container">

    <mt-header title="我的账单" class="header">
        <div slot="left" @click="back">
            <i class="iconfont" style="color: #999999">&#xe679;</i>
        </div>
    </mt-header>
    <div class="content">
      <div class="error" v-if="errorMsg">{{errorMsg}}</div>
        <div class="lease-list">
            <Cell v-for="(item, index) in dataList" :key="index" @click.native="cellClick(item)" :title="'签约房源：'+item.addressDetail" :label="'租赁期：' + item.payRentDate" style="height: 3.5rem;">
                <div style="width: 2.2rem">
                  <qd-img v-if="item.payRentStatus == 1" :path="'assets/img/rent_icon_1.png'"></qd-img>
                  <qd-img v-if="item.payRentStatus == 0" :path="'assets/img/rent_icon_2.png'"></qd-img>
                </div>
            </Cell>
        </div>
    </div>
  </section>
</template>

<script>
import Cell from '@/components/bricksSon/Cell'
import QdImg from '@/components/bricksSon/Img'
export default {
  components: {
    Cell,
    QdImg
  },
  data (){
    return{
      topLoading: false,
      user: {},
      status: -1, //-1 所有状态，1待确认，2 生效中，3 已失效
      dataList: [],
      errorMsg: null
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (!this.user){
      this.$router.push({path:'/'})
    }
  },
  mounted () {
    this.requestListData()
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    cellClick (item) {
      this.$router.push({path:'/rentDetail/'+item.payRentId, query: {htId: item.id}})
    },
    requestListData () {
      var myVue = this
      myVue.$indicator.open()
      this.request({
        methodId:'8068',
        data: {
          openId: JSON.parse(localStorage.getItem('user')).openId
        },
        success: function (res) {
          if(res.code == 0) {
            myVue.errorMsg = null
            myVue.dataList = res.res.data.rows;
          } else{
            myVue.errorMsg = res.res.msg
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
.lease-list{}
.lease-list .cell{
  background: #ffffff;
  margin-top: .5rem;
}
.error{
  text-align: center;
  font-size: .7rem;
  color: #999999;
  padding-top: 1rem; 
}
</style>
