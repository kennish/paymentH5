<template>
    <section class="container">
        <mt-header title="租客退租" class="header">
            <div slot="left" @click="back">
                <i class="iconfont" style="color: #999999">&#xe679;</i>
            </div>
        </mt-header>
        <div v-if="leaseInfo" class="content" style="flex:1">
            <div class="extra">
                <label>合同编号:{{leaseInfo.contractNo}}</label>
            </div>
            <template v-if="!leaseInfo.contractExit">
                <div class="info-item">
                    <p class="info-title">选择退租时间</p>
                    <div class="info-row">
                        <div class="date-panel" @click="datePanelClick">{{dateString}}</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="info-item">
                    <p class="info-title">退租信息</p>
                    <div class="info-row">
                        <label class="info-row-left">退租人</label>
                        <label class="info-row-right">{{leaseInfo.tenantsName}}</label>
                    </div>
                    <div class="info-row">
                        <label class="info-row-left">退租房源</label>
                        <label class="info-row-right">{{leaseInfo.landlordHouse.areaName + "-" + leaseInfo.landlordHouse.roomAddress}}</label>
                    </div>
                    <div class="info-row">
                        <label class="info-row-left">退租日期</label>
                        <label class="info-row-right">{{leaseInfo.contractExit.exitDate}}</label>
                    </div>
                </div>
            </template>

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
            </div>
        </div>
        <div v-if="leaseInfo" class="bottom">
            <button :style="leaseInfo.contractExit?{'background':'#909090'}:{}" @click="bottomClick()">{{buttonContent}}</button>
        </div>
        <mt-datetime-picker ref="picker" type="date" v-model="chooseDate.dateCur"
                            @confirm="selectDate"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :startDate="chooseDate.dateStart"
                            :endDate="chooseDate.dateEnd"></mt-datetime-picker>

    </section>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        user: {},
        leaseInfo:null,
        chooseDate: {
          placeHolder: '请选择起始时间',
          dateStart: new Date(),
          dateEnd: new Date(0?leaseInfo.leaseEndTime.split(' ')[0]:'2020-01-01'),
          dateCur: null
        },
      }
    },
    created () {
      this.user = JSON.parse(localStorage.getItem('user'))
    },
    computed: {
      dateString: function () {
        if (this.chooseDate.dateCur == null){
          return '请选择退租时间'
        }else {
          return this.chooseDate.dateCur
        }
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
        if (data.contractExit) {
          if (data.status == 5) {
            returnValue = "已退租"
          } else {
            returnValue = "房东审核中"
          }
        } else {
          returnValue = "申请退租"
        }
        return returnValue
      },
    },
    methods: {
      selectDate (d) {
        if (d instanceof Date || new Date(d) instanceof Date) {
          this.chooseDate.dateCur = this.dateToString(d)
        }
      },
      dateToString (d) {
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        month = month < 10 ? ('0' + month) : month
        let date = d.getDate()
        date = date < 10 ? ('0' + date) : date
        let result = year + '-' + month + '-' + date
        return result
      },
      datePanelClick () {
        this.$refs.picker.open();
      },
      requestLeaseInfo () {
        var myVue = this
        myVue.$indicator.open()
        this.request({
          methodId:'5021',
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
        if (!this.leaseInfo.contractExit) {
          this.requestCancel()
        }
      },
      requestCancel () {
        if (!this.chooseDate.dateCur) {
          this.$toast({
            message: '请选择退租时间',
            position: 'middle',
            className: 'istoast'
          })
          return
        }
        var myVue = this
        myVue.$indicator.open()
        this.request({
          methodId:'1050',
          data: {
            initiatorOpenId: this.user.openId,
            contractId: this.$route.query.id,
            exitDate: this.chooseDate.dateCur,
            statusName: 'OrderPreOutMemberApply'
          },
          success: function (res) {
            if (res.code == '0') {
              myVue.$router.go(0)
            } else {
              myVue.chooseDate.datecur = null
              myVue.$toast({
                message: '请重新选择退租时间',
                position: 'middle',
                className: 'istoast'
              })
            }
          },
          complete: function () {
            myVue.$indicator.close()
          }
        })
      }
    },
    mounted () {
      this.requestLeaseInfo()
    }
  }
</script>

<style scoped>
    .content {
        background-color: white;
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
    .date-panel {
        width:13.2rem;
        height:1.5rem;
        border: 1px solid #D7D7D7;
        border-radius: .33rem;
        text-align: center;
        font-size: .75rem;
        line-height: 1.5rem;
        position: relative;
    }
    .date-panel:before {
        content: '';
        background: url("../assets/img/date-icon@3x.png") no-repeat;
        background-size: 100% 100%;
        width:1.25rem;
        height:1.25rem;
        display: block;
        position: absolute;
        top:50%;
        left:.41rem;
        transform: translate(0%,-50%);

    }
</style>
