<template>
  <div ref="pullDown" id="pullDown">
    <transition name="fade">
      <div v-if="loading" class="pull-loading">
        <mt-spinner :type="3" color="#666666" :size="20" class="pull-loading-icon"></mt-spinner>{{loadingMsg}}
      </div>
    </transition>
    <div class="pull-list">123</div>
    <div class="pull-list">123</div>
    <div class="pull-list">123</div>
    <div class="pull-list">123</div>
    <div class="pull-list">123</div>
    <div class="pull-list">123</div>
    <div class="pull-list">123</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      loadingMsg: '释放更新',
      startY: null,
      moveY: null,
      endY: null,
      scrollT: 0
    }
  },
  methods: {
    touchstart (ev) {
      this.startY = ev.changedTouches[0].pageY;
    },
    touchmove (ev) {
      this.moveY = ev.changedTouches[0].pageY;
      this.scrollT = this.$refs.pullDown.scrollTop
      if (this.moveY - this.startY > 50 && this.scrollT == 0) {
        ev.preventDefault();
        this.loading = true
      }
    },
    touchend (ev) {
      this.endY = ev.changedTouches[0].pageY;
      if (this.endY - this.startY > 50 && this.scrollT == 0) {
        setTimeout(() => {
          this.loadingMsg = '更新完成'
        }, 4000)
        setTimeout(() => {
          this.loading = false
          this.loadingMsg = '释放更新'
        }, 5000)
      } else{
        this.loading = false
      }
    }
  },
  mounted () {
    let oWrap = this.$refs.pullDown
    oWrap.addEventListener('touchstart', this.touchstart)
    oWrap.addEventListener('touchmove', this.touchmove)
    oWrap.addEventListener('touchend', this.touchend)
  }
}
</script>

<style>
#pullDown{
  height: 100%;
  overflow-y: auto;
}
#pullDown .pull-loading{
  display: flex;
  font-size: .7rem;
  color: #666666;
  justify-content: center;
  padding: .3rem 0;
  align-items: center;
}
#pullDown .pull-loading-icon{
  margin-right: .5rem;
}
.pull-list{
  padding: 5rem 0;
  background: #ffffff;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(.5);
}
</style>
