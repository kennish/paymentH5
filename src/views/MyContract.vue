<template>
    <section class="container">
        <mt-header title="我的合同" class="header">
            <div slot="left" @click="back">
                <i class="iconfont" style="color: #999999">&#xe679;</i>
            </div>
        </mt-header>
        <iframe width="100%" style="flex:1" :src="demoLink"></iframe>
    </section>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      demoLink:""
    }
  },
  mounted () {
    this.getDemoLink()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getDemoLink(){
      var myVue = this
      myVue.$indicator.open()
      this.request({
        methodId: '5005',
        data: {
          'contractId': this.$route.query.id
        },
        success: function (res) {
          if (res.code == '0') {
            myVue.demoLink = res.res.data.filePath;
          } else {
            myVue.alertShowState = 1
            myVue.alertMsg = res.res.msg
          }
        },
        complete: function () {
          myVue.$indicator.close()
        }
      })
    },

  }
}
</script>

<style scoped>
</style>
