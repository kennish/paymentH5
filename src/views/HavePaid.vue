<template>
  <section>
    <div class="rent-item" v-for="(item, index) in havePaidData" :key="index">
      <cell :title="item.payRentDate" class="rent-item-title">
        <span class="rent-item-paid2"><i class="iconfont">&#xe657;</i>已支付</span>
      </cell>
      <cell :title="`总租金: ${item.payRentAmount}`" class="rent-item-info">
        <div class="site">{{item.addressDetail}}</div>
      </cell>
      <cell :title="`方式: ${ item.planStatus == 1 ? '线上支付' : '线下支付'}`" class="rent-item-info">{{item.repaymentDate}}前支付</cell>
    </div>
  </section>
</template>

<script>
import Cell from '@/components/bricksSon/Cell'
export default {
  components: {
    Cell
  },
  data () {
    return {
      havePaidData: []
    }
  },
  methods: {
    requestListData () {
      var myVue = this
      myVue.$indicator.open()
      this.request({
        methodId:'8079',
        data: {
          openId: JSON.parse(localStorage.getItem('user')).openId
        },
        success: function (res) {
          myVue.havePaidData = res.res.data.rows
        },
        complete: function () {
          myVue.$indicator.close()
        }
      })
    }
  },
  created () {
    this.requestListData()
  }
}
</script>

<style>
.rent-item{
  background: #ffffff;
  margin-bottom: .5rem;
}
.rent-item:first-child{
  margin-top: .5rem;
}
.rent-item-title{
  
}
.rent-item-paid2{
  color: #999999;
}
.rent-item-paid2 .iconfont{
  margin-right: .1rem;
}
.rent-item .rent-item-info{
  color: #999999;
  height: 2.0rem;
}
.site{
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
