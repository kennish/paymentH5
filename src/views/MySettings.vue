<template>
  <section class="container">

    <mt-header title="我的设置" class="header">
        <div slot="left" @click="back">
            <i class="iconfont" style="color: #999999">&#xe679;</i>
        </div>
    </mt-header>
    <div class="content">
      <div class="setting-list">
        <cell title="用户协议" icon="&#xe791;">
          <i class="iconfont cell-r-icon">&#xe6a3;</i>
        </cell>
        <cell title="帮助中心" icon="&#xe6ff;">
          <i class="iconfont cell-r-icon">&#xe6a3;</i>
        </cell>
        <cell title="关于我们" icon="&#xe6cc;">
          <i class="iconfont cell-r-icon">&#xe6a3;</i>
        </cell>
      </div>
      <div class="login-out" @click="logoutAlert">退出登录</div>
    </div>

  </section>
</template>

<script>
import Cell from '@/components/bricksSon/Cell'
import { MessageBox } from 'mint-ui';
export default{
  components: {
    Cell
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    logoutAlert (){
      MessageBox({
        title: '提示',
        message: '确定退出登录?',
        showCancelButton: true
      }).then(action =>{
        if (action == 'confirm'){
          this.logoutRequest()
          localStorage.removeItem('user')
          this.$router.push({path:'/'})
        }

      });
    },
    logoutRequest(){
      this.request({
        methodId: "N006",
        data: {}
      })
    }
  }
}
</script>

<style>
.setting-list{
  background: #ffffff;
  margin-top: .5rem;
}
.setting-list .cell:last-child{
  border: none;
}
.login-out{
  height: 2.2rem;
  font-size: .6rem;
  color: rgb(255, 121, 14);
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: .5rem;
}
</style>
