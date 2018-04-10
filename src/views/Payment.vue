<template>
  <section class="container">
    <mt-header title="支付方式" class="header">
      <div slot="left" @click="back">
        <i class="iconfont">&#xe679;</i>
      </div>
    </mt-header>
    <div class="content">
      <div class="payment-list">
        <qd-cell title="订单金额">
          <span class="PL-r">￥{{payRentAmount}}</span>
        </qd-cell>
      </div>
      <!--<div class="payment-list">-->
        <!--<qd-cell title="支付方式" class="PL-h"></qd-cell>-->
        <!--<label>-->
          <!--<qd-cell title="支付宝支付">-->
            <!--<span class="PL-r">-->
              <!--<input type="radio" checked name="paymentType" />-->
            <!--</span>-->
          <!--</qd-cell>-->
        <!--</label>-->
        <!-- <label>
          <qd-cell title="微信支付">
            <span class="PL-r">
              <input type="radio" name="paymentType" />
            </span>
          </qd-cell>
        </label> -->
      <!--</div>-->
      <div class="payment-info">
        <qd-cell class="payment-info-cell">
          <span class="goPaymentBtn" @click="SubmitPay">{{payBtnTitle}}</span>
        </qd-cell>
      </div>
    </div>
  </section>
</template>

<script>
import QdCell from '@/components/bricksSon/Cell'
export default {
  components: {
    QdCell
  },
  data () {
    return {
      user: null,
      openId: null,
      payRentAmount: '',
      rentDate: null,
      totalFee: null,
      payBtnTitle: '-',
      payStatus: false,
      errorMsg: '',
      payQuery: {
        outTradeNo: '',
        openId: '',
        quantity: '',
        price: '',
        totalAmount: '',
        description: '',
        requestUrl: '',
        returnUrl: ''
      }
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.openId = JSON.parse(localStorage.getItem('user')).openId
    this.payRentAmount = this.$route.query.payAmount
    this.rentDate = this.$route.query.rentDate
    this.getPayInfo()
  },
  mounted () {
    $('.payment-info-cell .cell-l').text('￥' + this.payRentAmount)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getPayInfo () {
      var myVue = this

      var callBackUrl = location.origin
                      + '/#/rentDetail/'
                      + myVue.$route.params.id
                      + '?htId='
                      + myVue.$route.query.htId;

      myVue.$indicator.open()
      this.request({
        methodId:'1025',
        data: {
          contractId: myVue.$route.query.htId, //合同号
          openId: myVue.openId, //this.user.openId //租客的OpenID
          payAmount: myVue.payRentAmount, //租金
          rentDate: myVue.rentDate, //支付的租期
          cellPhone: this.user.cellPhone, //用户手机号
          planId: myVue.$route.params.id //还款计划编号
        },
        success: function (res) {
          if ('410' == res.code) {
            console.log(res.res.msg)
            myVue.payBtnTitle = '去支付'
            myVue.payStatus = false
            myVue.errorMsg = res.res.msg
            //$('.cell.payment-info-cell').addClass('payed');
          } else {
            myVue.payBtnTitle = '去支付'
            myVue.payStatus = true
          }
          myVue.payQuery.outTradeNo = res.res.data.payId
          myVue.payQuery.openId = myVue.openId
          myVue.payQuery.quantity = res.res.data.quantity
          myVue.payQuery.price = res.res.data.price
          myVue.payQuery.totalAmount = res.res.data.totalFee
          myVue.payQuery.description = res.res.data.subject
          myVue.payQuery.requestUrl = process.env.PAY_URL,
          myVue.payQuery.returnUrl = callBackUrl;
        },
        complete: function () {
          myVue.$indicator.close()
        }
      })
    },
    SubmitPay () {
      var myVue = this
      if(myVue.payStatus) { // 去支付
        this.request({
          methodId:'5038',
          data: myVue.payQuery,
          success: (res) => {
            if (res.code === '0') {
              console.info(process.env.PAY_URL)
              location.href = process.env.PAY_URL + '?outTradeNo=' + myVue.payQuery.outTradeNo + '&route=smartDirectPay76'
            }
          },
          complete: function () {
            myVue.$indicator.close()
          }
        })
      } else{ // 请先支付更早的租金账单
        myVue.$toast({
          message: myVue.errorMsg,
          position: 'middle',
          className: 'istoast'
        })
      }
    }
  }
}
</script>

<style>
.payment-list{
  background: #ffffff;
  margin-top: .5rem;
}
.payment-list .PL-h{
  height: 1.2rem;
  color: #999999;
}
.PL-r{
  color: rgb(255, 121, 14);
}
.payment-info{
  display: flex;
  flex: 1;
  align-items: flex-end;
}
.payment-info .payment-info-cell{
  width: 100%; 
  background: #ffffff;
}
.payment-info .payment-info-cell{
  padding-right: 0;
}
.payment-info .payment-info-cell .cell-r{
  background: rgb(255, 121, 14);
  color: #ffffff;
  display: flex;
  height: 100%;
  width: 5rem;
  justify-content: center;
  align-items: center;
}
.goPaymentBtn{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.cell.payment-info-cell.payed .cell-r {
  background: #a8a8a8;
  color: #666;
}
</style>
