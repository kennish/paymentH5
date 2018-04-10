<template>
    <div class="mask" v-show="showState">
        <transition name="alert-fade">
            <div class="alert-base" v-show="showState">
                <img class="img-body" src="../assets/img/sign_success_body.png">
                <div class="alert-body">
                    <p class="alert-title">{{config.title}}</p>
                    <p class="alert-content">{{config.content}}</p>
                    <div :style="{color:config.confirmColor}" :class="{highLight:btnHighLight}" class="okBtn" @click="$emit('confirmCallBack')" @mousedown="btnHighLight = 1" @mouseup="btnHighLight = 0">{{config.confirmContent}}</div>
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
      },
      config: {
        default: {
          title: '提示',
          content: '提示内容',
          confirmContent: '确认',
          confirmColor: '#212121'
        }
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
        height:7.58rem;
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
        margin-top: -3.4rem;
        position: relative;
        padding-top: 1px;
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
        line-height: 1.08rem;
        margin-top: .42rem;
        width: calc(100% - 4rem);
        margin-left: 2rem;
    }
    .okBtn {
        width:100%;
        height:2.5rem;
        border-bottom-left-radius: .54rem;
        border-bottom-right-radius: .54rem;
        border-top:1px solid #dedede;
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
