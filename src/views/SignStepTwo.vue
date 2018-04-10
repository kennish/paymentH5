<template>
    <section class="container">
        <div>
            <mt-header title="租赁合同" class="header">
                <div slot="left" @click="back">
                    <i class="iconfont" style="color: #999999">&#xe679;</i>
                </div>
            </mt-header>
        </div>
        <template v-if="data && isXyzTemplate">
            <xyzContract :data="data"></xyzContract>
        </template>
        <template v-else-if="data && !isXyzTemplate">
            <normalContract :data="data"></normalContract>
        </template>
        <div class="footer">
            <button @click="next">同意并继续</button>
        </div>
    </section>
</template>

<script>
    import xyzContract from '../views/xyzContract.vue'
    import normalContract from '../views/normalContract.vue'
export default {
  name: '',
  data () {
    return {
      data: null
    }
  },
  components:{
    xyzContract, normalContract
  },
  computed: {
    //是否使用小业主合同模板
    isXyzTemplate: function () {
        return this.data.landlordType == '6'
    }
  },
  mounted () {
    this.requestData()
  },
  methods: {
    next () {
      this.$router.push({path: '/signStepThree',query: {id: this.$route.query.id}})
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
          id: this.$route.query.id
        },
        success: function (res) {
          if (res.code == '0') {
            var model = res.res.data;
            if (!model.landlordHouse.companyName){
              model.landlordHouse.companyName = model.landlordHouse.name;
            }
            if (model.landlordType == 2 || model.landlordType == 3 || model.landlordType == 4 || model.landlordType == 5)
            {
              model.landlordHouse.companyName = "研耀（上海）信息科技有限公司";
              model.landlordHouse.companyAddress = "上海市黄浦区外滩SOHO G座1F";
              model.zengyidiscription = "租赁合同以此次签署为准。";
            }
            myVue.data = model
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

    button {
        background-color: #FF6D11;
        color:white;
        border-radius: 2px;
        width:100%;
        line-height: 1.83rem;
        font-size: .58rem;
    }
</style>
