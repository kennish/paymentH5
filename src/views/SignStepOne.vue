<template>
    <section class="container">
        <div>
            <mt-header title="完善信息" class="header">
                <div slot="left" @click="back">
                    <i class="iconfont" style="color: #999999">&#xe679;</i>
                </div>
            </mt-header>
        </div>
        <div class="body">
            <div class="flow">
                <div>
                    <img class="topImg" src="../assets/img/SignStep1_on@3x.png" />
                    <span style="color: #FE6138;">完善信息</span>
                </div>
                <span class="line lineHalf"></span>
                <div>
                    <img class="topImg" src="../assets/img/SignStep2_off@3x.png" />
                    <span  style="color: #C0C0C0;">租赁合同</span>
                </div>
                <span class="line line0"></span>
                <div>
                    <img class="topImg" src="../assets/img/SignStep3_off@2x.png" />
                    <span style="color: #C0C0C0;">电子签约</span>
                </div>
            </div>
            <div class="main">
                <div class="row"><div class="left">基本信息</div></div>
                <div class="row"><div class="left">房源名称</div><input v-model="data.landlordHouse.areaName" disabled class="right"></div>
                <div class="row"><div class="left">租客手机号</div><input v-model="data.tenantsInfo.mobile" disabled class="right"></div>
                <div class="row"><div class="left">租客名称</div><input v-model="data.tenantsInfo.name" class="right"></div>
                <div class="row"><div class="left">身份证号</div><input maxlength="18" v-model="data.tenantsInfo.idCard" class="right"></div>
            </div>
        </div>

        <div class="footer">
            <button @click="next">下一步</button>
        </div>
    </section>
</template>

<script>
    import Valid from '../assets/js/Valid.js'
export default {
  name: '',
  data () {
    return {
      data: {
        user: {},
        landlordHouse: {
          areaName: ''
        },
        tenantsInfo: {
          mobile: '',
          name: '',
          idCard: ''
        },
      }
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (!this.user){
      this.$router.push({path:'/'})
    }
  },
  mounted () {
    this.requestData()
  },
  methods: {
    validAll () {
      var result = false
      if (!this.data.tenantsInfo.name) {
        this.$toast({
          message: '名字必填',
          position: 'bottom',
          className: 'istoast'
        })
      }else if (!Valid.IdentityCodeValid(this.data.tenantsInfo.idCard)) {
        this.$toast({
          message: '身份证不正确',
          position: 'bottom',
          className: 'istoast'
        })
      } else {
        return true
      }
      return result
    },
    next () {
      if (!this.validAll()) {
        return
      }
      var myVue = this
      this.$indicator.open()
      this.request({
        methodId:'4028',
        data: {
          ContractId: myVue.$route.query.id,
          openId: myVue.user.openId,
          tenantsName: myVue.data.tenantsInfo.name,
          idCard: myVue.data.tenantsInfo.idCard
        },
        success: function (res) {
            if (res.code == '0') {
              myVue.$router.push({path: '/signStepTwo',query: {id: myVue.$route.query.id}})
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
    requestData () {
      var myVue = this
      myVue.$indicator.open()
      this.request({
        methodId:'4019',
        data: {
          id:this.$route.query.id
        },
        success: function (res) {
          if (res.code == '0') {
            myVue.data = res.res.data;
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

<style scoped>
    .flow {
        margin-top: .21rem;
        display: flex;
        display: -webkit-flex;
        flex-flow: row;
        -webkit-flex-flow: row;
        width: 100%;
        height: 5.33rem;
        background-color: #fff;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        align-items: center;
        -webkit-align-items: center;
    }
    .flow > div {
        width:2.2rem;
        text-align: center;
    }
    img {
        width:1.91rem;
        height:1.91rem;
    }
    img + span {
        font-size: .5rem;
    }
    .line {
        width:1.5rem;
        height:.33rem;
    }
    .line0 {
        background: url("../assets/img/SignLine0.png") no-repeat 100% 100%;
    }
    .lineHalf {
        background: url("../assets/img/SignLineHalf.png")no-repeat 100% 100%;
    }
    .line1 {
        background: url("../assets/img/SignLine1.png")no-repeat 100% 100%;
    }
    .main {
        background: white;
        margin-top: .42rem;
        padding-bottom: .92rem;
    }
    .body {
        flex:1;
    }
    .row {
        position: relative;
        box-sizing: border-box;
        font-size: .58rem;
        overflow: hidden;
        padding: .5rem .79rem .5rem .79rem;
    }
    .left {
        float: left;
        font-size: inherit;
        height:.9rem;
        line-height: .9rem;
    }
    .right {
        float: right;
        font-size: inherit;
        height:.9rem;
        line-height: .9rem;
    }
    .row + .row:before {
        content: '';
        width:calc(100% - 1.58rem);
        height:.04rem;
        background-color: #eee;
        position: absolute;
        top:0px;
        left:.79rem;
    }
    button {
        background-color: #FF6D11;
        color:white;
        border-radius: 2px;
        width:100%;
        line-height: 1.83rem;
        font-size: .58rem;
    }
    input {
        text-align: right;
        font-size: inherit;
        background-color: transparent;
    }
    input:disabled{
        color:#808080;
    }

</style>
