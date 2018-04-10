<template>
  <section class="container">
    <mt-header title="我的租约" class="header">
        <div slot="left" @click="back">
            <i class="iconfont" style="color: #999999">&#xe679;</i>
        </div>
    </mt-header>
    <div class="content">
        <div class="lease-list">
            <Cell v-for="item in dataList" :key="item.id" @click.native="cellClick(item)" :title="'签约房源：'+item.addressDetail" :label="'租赁期：' + item.leaseTime" style="height: 3.5rem;">
                <div style="width: 2.2rem"><qd-img :path="'assets/img/lease_icon_' + (item.status<3?item.status:3) + '.png'"></qd-img></div>
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
      status: -1, //-1 所有状态，1待确认，2 生效中，3 已失效 4 解约  5 退租 6 完结
      dataList: []
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
      this.$router.go(-1)
    },
    cellClick (item) {
      this.$router.push({path:'/leaseDetail',query:{id:item.id}})
    },
    requestListData () {
      var myVue = this
      myVue.$indicator.open()
      this.request({
        methodId:'8065',
        data: {
          openId: this.user.openId,
          status: this.status
        },
        success: function (res) {
          if (res.code == '0') {
            myVue.dataList = res.res.data.rows;
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
</style>
