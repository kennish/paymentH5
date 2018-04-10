<template>
    <section class="container">
        <div>
            <mt-header title="电子签约" class="header">
                <div slot="left" @click="back">
                    <i class="iconfont" style="color: #999999">&#xe679;</i>
                </div>
            </mt-header>
        </div>
        <div class="body">
            <div class="flow">
                <div>
                    <img class="topImg" src="../assets/img/SignStep1_on@3x.png"/>
                    <span style="color: #FE6138;">完善信息</span>
                </div>
                <span class="line line1"></span>
                <div>
                    <img class="topImg" src="../assets/img/SignStep2_on@3x.png"/>
                    <span style="color: #FE6138;">租赁合同</span>
                </div>
                <span class="line lineHalf"></span>
                <div>
                    <img class="topImg" src="../assets/img/SignStep3_off@2x.png"/>
                    <span style="color: #C0C0C0;">电子签约</span>
                </div>
            </div>
            <div class="page-sign">
                <span class="word">请书写清晰可辨的签名</span>
                <!-- canvas画布签名 -->
                <div class="draw-wrapper" style="position: relative;"></div>
            </div>
        </div>
        <signFailAlert :showState="failAlertShow"></signFailAlert>
        <successAlert :showState="successAlertShow" :config="successConfig"
                      v-on:confirmCallBack="goToPay"></successAlert>
    </section>
</template>

<script>
  import {WritingPad} from '../assets/js/drawName.js'
  import signFailAlert from '../views/signFailAlert.vue'
  import successAlert from '../views/successAlert.vue'

  export default {
    name: '',
    data() {
      return {
        user: {},
        failAlertShow: 0,
        successAlertShow: 0,
        successConfig: {
          title: '签署成功',
          content: '您的房屋租约已经确认成功啦\n' + '现在可以去付租了哦',
          confirmContent: '去付款',
          confirmColor: '#FF6138'
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      goToPay() {
        this.$router.push({path: '/rent'})
      }
    },
    components: {
      signFailAlert, successAlert
    },
    created() {
      this.user = JSON.parse(localStorage.getItem('user'))
      if (!this.user) {
        this.$router.push({path: '/'})
      }
    },
    mounted() {
      var myVue = this
      var wp = new WritingPad();
      wp.init();
      window.upLoadSignNamePic = function (imgSrc) {
        myVue.$indicator.open()
        myVue.request({
          methodId: '6011',
          data: {
            ContractId: myVue.$route.query.id,
            OriginalId: myVue.user.openId,
            ImageStream: imgSrc,
            TeantsLocation: "121.495638,31.225836"
          },
          success: function (res) {
            if (res.code == '0') {
              myVue.successAlertShow = 1
            } else {
              myVue.failAlertShow = 1
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
        width: 2.2rem;
        text-align: center;
    }

    img {
        width: 1.91rem;
        height: 1.91rem;
    }

    img + span {
        font-size: .5rem;
    }

    .line {
        width: 1.5rem;
        height: .33rem;
    }

    .line0 {
        background: url("../assets/img/SignLine0.png") no-repeat 100% 100%;
    }

    .lineHalf {
        background: url("../assets/img/SignLineHalf.png") no-repeat 100% 100%;
    }

    .line1 {
        background: url("../assets/img/SignLine1.png") no-repeat 100% 100%;
    }

    .body {
        flex: 1;
        overflow: auto;
    }

    .word {
        font-size: 16px;
        color: #DEDEDE;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .page-sign {
        position: relative;
        margin-top: 1.5rem;
    }

</style>
