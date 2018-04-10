<template>
    <div id="app">
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        user: null
      }
    },
    methods: {
      getZgToken () {
        this.request({
          methodId:'7040',
          data:{
            clientid:'aliMiniApp',
            mobile:this.user?this.user.cellPhone:''
          },
          success: function (jsonData) {
            var accessToken=jsonData.res.data.accessToken;
            var tokenType=jsonData.res.data.tokenType;
            localStorage.setItem("accessToken",accessToken);
            localStorage.setItem("tokenType",tokenType)
          }
        })
      },
    },
    created () {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.getZgToken()
    }
  }
</script>

<style>
    #app {

    }

    @font-face {
        font-family: 'iconfont';  /* project id 506320 */
        src: url('http://at.alicdn.com/t/font_506320_z8ve52gyx905p14i.eot');
        src: url('http://at.alicdn.com/t/font_506320_z8ve52gyx905p14i.eot?#iefix') format('embedded-opentype'),
        url('http://at.alicdn.com/t/font_506320_z8ve52gyx905p14i.woff') format('woff'),
        url('http://at.alicdn.com/t/font_506320_z8ve52gyx905p14i.ttf') format('truetype'),
        url('http://at.alicdn.com/t/font_506320_z8ve52gyx905p14i.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .fade-enter-active, .fade-leave-active {
        opacity: 1;
        transition:all .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
