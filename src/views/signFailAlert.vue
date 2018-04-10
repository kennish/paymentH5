<template>
  <div class="mask" v-show="showState">
      <transition name="alert-fade">
          <div class="alert-base" v-show="showState">
              <img class="img-body" src="../assets/img/sign_fail_body.png">
              <div class="alert-body">
                  <img class="img-hand" src="../assets/img/sign_fail_hand.png">
                  <p class="alert-title">签署失败</p>
                  <p class="alert-content">电子签约失败，请重新发起申请</p>
                  <div :class="{highLight:btnHighLight}" class="okBtn" @click="backToIndex" @mousedown="btnHighLight = 1" @mouseup="btnHighLight = 0">知道了</div>
              </div>
          </div>
      </transition>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      btnHighLight: 0
    }
  },
  props: {
    showState: {
      default: 0 //0不显示 1显示
    }
  },
  methods: {
    backToIndex () {
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style scoped>
    .mask {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0,0,0,0.7);
        z-index: 9999;
        transition: 1s all;
    }
    .img-body {
        width:7.58rem;
        height:6.3rem;
    }
    .alert-base {
        position: absolute;
        left:50%;
        top:40%;
        transform: translate(-50%,-50%);
        text-align: center;
        transition: all .3s;
    }
    .alert-body {
        width: 12.5rem;
        height: 8.33rem;
        background-color: white;
        border-radius: .54rem;
        margin-top: -3.3rem;
        position: relative;
        padding-top: 1px;
    }
    .img-hand {
        width:3.125rem;
        position: absolute;
        top:0px;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .alert-title {
        font-size: .83rem;
        color:#212121;
        margin-top: 1.4rem;
        line-height: .83rem;
    }
    .alert-content {
        color:#808080;
        font-size: .625rem;
        line-height: .625rem;
        margin-top: 1.4rem;
    }
    .okBtn {
        width:100%;
        height:2.5rem;
        border-bottom-left-radius: .54rem;
        border-bottom-right-radius: .54rem;
        border-top:1px solid #dedede;
        color:#808080;
        font-size: .625rem;
        line-height: 2.5rem;
        position: absolute;
        bottom:0px;
        left:0px;
        background-color: transparent;
        transition: all .1s;
    }
    .highLight {
        background-color: rgba(0,0,0,0.1);
    }
    .alert-fade-enter {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0.7);
    }
    .alert-fade-leave-active {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0.9);
    }

</style>
