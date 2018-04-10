<template>
  <section v-infinite-scroll="loadMore">
    <div class="rent-item" v-for="(items, index) in list" :key="index">
      <cell title="2017年6月" class="rent-item-title"><span class="rent-item-paid"><i class="iconfont">&#xe6ed;</i>待支付{{items}}</span></cell>
      <cell title="总租金:12800" class="rent-item-info">(5月21日-6月21日)</cell>
      <cell title="方式:线上支付" class="rent-item-info">2017年6月30日前支付</cell>
    </div>
    <div class="loading-bar">
      <div class="loading-show">
        <mt-spinner :type="3" :size="20" style="margin-right: .2rem;"></mt-spinner> 努力加载中
      </div>
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
      list: [1, 2, 3, 4, 5],
      loading: true
    }
  },
  created () {
    this.requestListData2()
  },
  methods: {
    loadMore () {
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 5; i++) {
          this.list.push(last + i);
        }
      }, 2500);
    },
    requestListData2 () {
      console.log(123)
      var myVue = this
      myVue.$indicator.open()
      this.request({
        methodId:'1031',
        data: {
          LandlordId: JSON.parse(localStorage.getItem('user')).openId,
          RepaymentStatus: 1
        },
        success: function (res) {
          console.log(res)
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
.rent-item{
  background: #ffffff;
  margin-bottom: .5rem;
}
.rent-item:first-child{
  margin-top: .5rem;
}
.rent-item-title{
  
}
.rent-item-paid{
  color: rgb(255, 121, 14);
}
.rent-item-paid .iconfont{
  margin-right: .1rem;
}
.rent-item .rent-item-info{
  color: #999999;
  height: 2.0rem;
}

.loading-bar{
  height: 2rem;
}
.loading-show{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: .5rem;
  color: #999999;
}
</style>
