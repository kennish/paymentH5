<template>
  <section class="container" ref="container">

    <mt-header title="支付宝代扣" class="header">
        <div slot="left" @click="back">
            <i class="iconfont" style="color: #999999">&#xe679;</i>
        </div>
    </mt-header>
    <div class="content">
      <div class="withholding-info">
        <qd-cell title="缴费单位">赢家生活</qd-cell>
        <qd-cell title="合同标号">20190909001</qd-cell>
        <qd-cell title="用户名">张三</qd-cell>
        <qd-cell title="租住地址">外滩soho1108号</qd-cell>
      </div>
      <div class="withholding-info">
        <qd-cell title="扣款金额">5000</qd-cell>
        <qd-cell title="扣款方式">支付宝支付</qd-cell>
        <qd-cell title="扣款时间">出账后一个工作日内</qd-cell>
        <qd-cell title="生效时间">立即生效(含历史欠费账单)</qd-cell>
      </div>
      <div class="withholding-handle">
        <qd-button class="withholding-btn disabled" title="立即开通" @click="popupVisible = true"></qd-button>
        <p><span>同意</span>《支付代扣协议》</p>
      </div>
    </div>
    <mt-popup v-model="popupVisible" class="whd-popup">
      <div class="whd-popup-header">自动扣款，不在担心忘记缴费</div>
      <div class="whd-popup-content">
        <div class="whd-popup-list">
          <div class="whd-popup-icon">
            <i class="iconfont">&#xe65f;</i>
          </div>
          <div class="whd-popup-info">
            <div class="whd-popup-title">扣款时间</div>
            <div class="whd-popup-show">出账后次日完成扣款</div>
          </div>
        </div>
        <div class="whd-popup-list">
          <div class="whd-popup-icon">
            <i class="iconfont" style="color:rgb(135,187,249)">&#xe6ed;</i>
          </div>
          <div class="whd-popup-info">
            <div class="whd-popup-title">扣款方式</div>
            <div class="whd-popup-show">支余额、余额宝、储蓄卡、信用卡、花呗等扣款，默认扣款方式可以在支付设置中调整</div>
          </div>
        </div>
        <div class="whd-popup-list">
          <div class="whd-popup-icon">
            <i class="iconfont" style="color:rgb(255,196,54)">&#xe657;</i>
          </div>
          <div class="whd-popup-info">
            <div class="whd-popup-title">扣款时间</div>
            <div class="whd-popup-show">出账后次日完成扣款</div>
          </div>
        </div>
      </div>
      <div class="whd-popup-handle" @click="ok">我知道了</div>
    </mt-popup>
  </section>
</template>

<script>
import QdCell from '@/components/bricksSon/Cell'
import QdButton from '@/components/bricksSon/Button'
export default {
  components: {
    QdCell,
    QdButton
  },
  data () {
    return {
      popupVisible: false,
      user: null
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    ok () {
      var callBackUrl = location.origin
                      + '/#/rentDetail/'
                      + this.$route.params.id
                      + '?htId='
                      + this.$route.query.htId;
      var myVue = this
      myVue.$indicator.open()
      this.request({
        // methodId:'1027',
        methodId: '8085',
        data: {
          contractId: this.$route.query.htId, //合同号
          openId: JSON.parse(localStorage.getItem('user')).openId,
          cellPhone: this.user.cellPhone, //租客手机号
          callBackUrl: callBackUrl
        },
        success: function (res) {
//          let mapi = 'https://mapi.alipay.com/gateway.do?_input_charset=utf-8&' + res.res.data.returnUrl
//          let alipayUrl = 'alipays://platformapi/startapp?appId=20000067&url=' + mapi
//          let dsAlipay = 'https://render.alipay.com/p/s/i?scheme=' + encodeURIComponent(alipayUrl)
          $('#app').html(res.res.data.returnUrl)
//          console.log(dsAlipay)
//          location.href = dsAlipay
          // myVue.havePaidData = res.res.data.rows
        },
        complete: function () {
          myVue.$indicator.close()
        }
      })
      this.popupVisible = false
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
  }
}
</script>

<style>
.withholding-info{
  background: #ffffff;
  margin-top: .5rem;
}
.withholding-handle{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
}
.withholding-handle .withholding-btn{
  width: 60%;
  border: 1px solid rgb(255, 134, 11);
  background: none;
  color: rgb(255, 134, 11);
}
.withholding-handle p{
  font-size: .5rem;
  color: rgb(255, 134, 11);
  margin-top: .5rem;
}
.withholding-handle p span{
  color: #999999;
}
.whd-popup{
  padding: .5rem 0;
  width: 90%;
  box-sizing: border-box;
  border-radius: 4px;
}
.whd-popup-header{
  font-size: .7rem;
  text-align: center;
  padding: .5rem 0;
}
.whd-popup-content{
  padding: .5rem 1rem;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.whd-popup-list{
  display: flex;
  margin-bottom: .5rem;
}
.whd-popup-icon{
  margin-right: .2rem;
}
.whd-popup-icon i{
  font-size: .9rem;
  color: rgb(124, 228, 131)
}
.whd-popup-info{
  display: flex;
  flex: 1;
  flex-direction: column;
}
.whd-popup-title{
  font-size: .6rem;
  color: #333333;
  margin-top: .2rem;
}
.whd-popup-show{
  font-size: .5rem;
  color: #999999;
  margin-top: .1rem;
  line-height: .8rem;
}
.whd-popup-handle{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem 0 0;
  font-size: .7rem;
  color: rgb(255, 134, 11);
}
</style>
