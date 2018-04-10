<template>
  <section style="height: 100vh;">
    <qd-img path="assets/img/01.png"></qd-img>
    <div class="login-form">
      <qd-field v-model="phone" placeholder="请输入手机号" icon="&#xe704;" :state="phoneState"></qd-field>
      <qd-field v-model="code" placeholder="请输入验证码" icon="&#xe73f;">
        <button v-show="!btninfo.lock" @click="checkTelNum" class="getCode" type="button">获取验证码</button>
        <button v-show="btninfo.lock" class="getCode forbid" type="button">{{btninfo.text}}s</button>
      </qd-field>
      <qd-button @click="submitForm" title="登 录" :class="`submitBtn ${phoneState == 'success' && code.length > 0 ? 'ok': null}`" style="margin-top: 2rem"></qd-button>
    </div>
  </section>
</template>

<script>
import QdImg from '@/components/bricksSon/Img'
import QdField from '@/components/bricksSon/Field'
import QdButton from '@/components/bricksSon/Button'
import qs from 'qs'

export default{
  components: {
    QdImg,
    QdField,
    QdButton
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user){
      // this.$router.push({path:'/'})
    }
  },
  data () {
    return {
      user: {},
      phone: '',
      code: '',
      phoneState: '',
      btninfo: {
        lock: false,
        text: '获取验证码',
        counter: '',
        time: 60
      },
      isRegist: true//是否注册
    }
  },
  watch: {
    phone () {
      if(this.phone == ''){
        this.phoneState = ''
      } else{
        let tel = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7]))\d{8}$/;
        if(!tel.test(this.phone)) {
          this.phoneState = 'error'
        } else{
          this.phoneState = 'success'
        }
      }
    }
  },
  methods: {
    //检测账号是否注册
    checkTelNum () {
      if (this.phone == '' || this.phoneState != 'success') {
        this.$toast({
          message: '请正确填写手机号码',
          position: 'middle',
          className: 'istoast'
        })
        return false
      }

      let myVue = this
      this.request({
        methodId: "N002",
        data: {
          'cellphone': this.phone
        },
        success: function (res) {
          if (res.data.results == '1'){
            myVue.isRegist = true
          }else {
            myVue.isRegist = false
          }
          myVue.getAuthCode()
        }
      })
    },
    //获取验证码
    getAuthCode () {
      if (this.phone == '') {
        this.$toast({
          message: '请填写手机号码',
          position: 'middle',
          className: 'istoast'
        })
        return false
      }

      let myVue = this
      myVue.$indicator.open()
      this.request({
        methodId: "N003",
        data: {
          'cellphone': this.phone
        },
        success: function () {
          myVue.$toast({
            message: '发送成功',
            position: 'bottom',
            className: 'istoast'
          });
          myVue.btninfo.counter = setInterval(() => {
            myVue.btninfo.lock = true;
            myVue.btninfo.text = myVue.btninfo.time--
            if(myVue.btninfo.time < 0) {
              clearInterval(myVue.btninfo.counter)
              myVue.btninfo.text = '获取验证码'
              myVue.btninfo.time = 60
              myVue.btninfo.lock = false
            }
          }, 1000)
        },
        complete: function () {
          myVue.$indicator.close()
        }
      })
    },
    submitForm () {
      if(this.phoneState == 'success' && this.code.length > 0){
        this.isRegist?this.loginRequest():this.registRequest()
      }
    },
    registRequest () {
      let myVue = this
      myVue.$indicator.open('登录中...')
      this.request({
        methodId: "1005",
        data: {
          'Gender': "1",
          "NickName": this.phone,
          'phone': this.phone,
          'platform': 'h5',
          'checkCode': '1',
          'verifyCode': this.code
        },
        success: function (res) {
          if (res.code == '0'){
            myVue.$toast({
              message: '登录成功',
              position: 'bottom',
              className: 'istoast'
            });
            res.res.data.cellPhone = myVue.phone
            localStorage.setItem('user',JSON.stringify(res.res.data))
            myVue.$router.push({path:'/'})

          }else {
            myVue.$toast({
              message: res.res.msg,
              position: 'bottom',
              className: 'istoast'
            });
          }
        },
        complete: function () {
          myVue.$indicator.close()
        }
      })
    },
    loginRequest() {
      let myVue = this
      myVue.$indicator.open('登录中...')
      this.request({
        methodId: "1004",
        data: {
          'phone': this.phone,
          'platform': 'h5',
          'verifyCode': this.code
        },
        success: function (res) {
          if (res.code == '0'){
            myVue.$toast({
              message: '登录成功',
              position: 'bottom',
              className: 'istoast'
            });
            res.res.data.cellPhone = myVue.phone
            localStorage.setItem('user',JSON.stringify(res.res.data))
            myVue.$router.push({path:'/'})
          }else {
            myVue.$toast({
              message: res.res.msg,
              position: 'bottom',
              className: 'istoast'
            });
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
.login-form{
  margin-top: 2rem;
  padding: 0 1.5rem;
}
.getCode{
  background: none;
  padding: 0;
  font-size: .7rem;
  color: rgba(255, 121, 14, 1);
}
.forbid{
  color: #999999;
}
.istoast{
  background: rgba(0, 0, 0, .5)
}
.submitBtn{
  background: rgba(255, 121, 14, .3);
  transition: background .3s;
}
.submitBtn.ok{
  background: rgba(255, 121, 14, 1);
}
</style>
