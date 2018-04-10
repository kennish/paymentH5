<template>
    <section class="container">
        <mt-header title="租约详情" class="header">
            <div slot="left" @click="back">
                <i class="iconfont" style="color: #999999">&#xe679;</i>
            </div>
        </mt-header>
        <div v-if="leaseInfo" class="content" style="flex:1">
            <div class="status">{{status}}</div>
            <div class="extra">
                <label>合同编号:{{leaseInfo.contractNo}}</label>
                <label v-show="canCancel" @click="cancelLease">我要退租</label>
            </div>
            <div class="info-item">
                <p class="info-title">出租方信息</p>
                <div class="info-row">
                    <label class="info-row-left">出租方</label>
                    <label class="info-row-right">{{leaseInfo.landlordHouse.companyName||leaseInfo.landlordHouse.name}}</label>
                </div>
                <div class="info-row">
                    <label class="info-row-left">出租房源</label>
                    <label class="info-row-right">{{leaseInfo.landlordHouse.areaName + "-" + leaseInfo.landlordHouse.roomAddress}}</label>
                </div>
            </div>
            <div class="info-item">
                <p class="info-title">承租方信息</p>
                <div class="info-row">
                    <label class="info-row-left">承租方</label>
                    <label class="info-row-right">{{leaseInfo.tenantsName}}</label>
                </div>
                <div class="info-row">
                    <label class="info-row-left">联系电话</label>
                    <label class="info-row-right">{{leaseInfo.tenantsPhone}}</label>
                </div>
                <div class="info-row">
                    <label class="info-row-left">证件号码</label>
                    <label class="info-row-right">{{leaseInfo.tenantsInfo.idCard}}</label>
                </div>
            </div>
            <div class="info-item">
                <p class="info-title">租约信息</p>
                <div class="info-row">
                    <label class="info-row-left">租赁期</label>
                    <label class="info-row-right">{{leaseTime}}</label>
                </div>
                <div class="info-row">
                    <label class="info-row-left">总租金</label>
                    <label class="info-row-right">{{leaseInfo.rent}}元</label>
                </div>
                <div class="info-row">
                    <label class="info-row-left">支付方式</label>
                    <label class="info-row-right">{{leaseInfo.rentPayTypeStr}}</label>
                </div>
                <div class="info-row">
                    <label class="info-row-left">押金</label>
                    <label class="info-row-right">{{leaseInfo.deposit}}元</label>
                </div>
                <div class="info-row">
                    <label class="info-row-left">首月房租是否已付</label>
                    <label class="info-row-right">{{leaseInfo.payPeriods > 0 ? '是':'否'}}</label>
                </div>
            </div>
        </div>
        <div v-if="leaseInfo" class="bottom">
            <button :style="leaseInfo.status == 3?{'background':'#909090'}:{}" @click="bottomClick()">{{buttonContent}}</button>
        </div>

    </section>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        leaseInfo:null
      }
    },
    computed: {
      canCancel: function () {
        var data = this.leaseInfo
        var returnValue = false
        if (data.status == 2) {
          returnValue = true
        }
        return returnValue
      },
      leaseTime: function () {
        var start = this.leaseInfo.leaseStartTime;
        var end = this.leaseInfo.leaseEndTime;
        if (start != '-') {
          start = this.leaseInfo.leaseStartTime.split(' ')[0].replace(/-/g,'.')
        }
        if (end != '-') {
          end = this.leaseInfo.leaseEndTime.split(' ')[0].replace(/-/g,'.')
        }
        return  start + ' - ' + end
      },
      buttonContent: function () {
        var data = this.leaseInfo
        var returnValue = ""
        switch (data.status){
          case 1:{
            returnValue = "去签合同"
            break
          }
          case 2:{
            returnValue = "合同预览"
            break
          }
          case 3:{
            returnValue = "去签合同"
            break
          }
          case 4:{
            returnValue = "合同预览"
            break
          }
          case 5:{
            returnValue = "合同预览"
            break
          }
          case 6:{
            returnValue = "合同预览"
            break
          }
        }
        if(data.contractExit){
          returnValue = "合同预览"
        }
        return returnValue
      },
      status: function () {
        var data = this.leaseInfo
        var returnValue = ""
        switch (data.status){
          case 1:{
            returnValue = "租约待确认"
            break
          }
          case 2:{
            returnValue = "租约生效中"
            break
          }
          case 3:{
            returnValue = "租约已失效"
            break
          }
          case 4:{
            returnValue = "合同已解约"
            break
          }
          case 5:{
            returnValue = "已退租"
            break
          }
          case 6:{
            returnValue = "租约已到期"
            break
          }
        }
        if(data.contractExit && data.status != 5){
          returnValue = "退租确认中"
        }
        return returnValue
      }
    },
    methods: {
      cancelLease () {
        this.$router.push({path:'/cancelLease',query:{id: this.$route.query.id}})
      },
      requestLeaseInfo () {
        var myVue = this
        myVue.$indicator.open()
        this.request({
          methodId:'4019',
          data: {
            id: this.$route.query.id
          },
          success: function (res) {
            if (res.code == '0') {
              myVue.leaseInfo = res.res.data;
            }
          },
          complete: function () {
            myVue.$indicator.close()
          }
        })
      },
      back () {
        this.$router.go(-1)
      },
      bottomClick () {
        if (this.buttonContent == '去签合同' && this.leaseInfo.status != 3){
          this.$router.push({path: '/signStepOne', query: {id:this.$route.query.id}})
        }else if (this.buttonContent == '合同预览'){
          this.$router.push({path: '/myContract', query: {id:this.$route.query.id}})
        }
      }
    },
    mounted () {
      this.requestLeaseInfo()
    }
  }
</script>

<style scoped>
    .status {
        text-align: center;
        color: #FF6138;
        font-size:.625rem;
        padding:.46rem 0;
    }
    .extra{
        background-color: white;
        padding:.42rem .84rem 0 .84rem;
    }
    .extra > label:first-child{
        font-size: .5rem;
        float: left;
        color: #c0c0c0;
    }
    .extra > label:last-child{
        font-size: .5rem;
        float: right;
        color: #808080;
    }
    .extra > label:last-child:before{
        content: url("../assets/img/tuizu.png");
    }
    .info-item{
        background-color: white;
        padding:.83rem .84rem;
    }
    .info-title {
        font-size: .66rem;
    }
    .info-row {
        overflow: hidden;
        padding:.64rem 0 0 0;
    }
    .info-row > label:first-child{
        font-size: .5rem;
        float: left;
        color: #606060;
    }
    .info-row > label:last-child{
        font-size: .58rem;
        float: right;
        color: #808080;
    }
    .bottom{
        background: white;
        height:3.33rem;
        text-align: center;
    }
    .bottom > button{
        color:white;
        background-color: #FF6D11;
        font-size: .66rem;
        width: calc(100% - 1.25rem);
        height: 1.83rem;
        margin:.75rem auto;
    }
</style>
