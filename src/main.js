import Vue from 'vue'
import App from './App'
import router from './router'

/** css样式 **/
import '@/assets/css/reset.css'
import '@/assets/css/style.css'

/** mint UI **/
import 'mint-ui/lib/style.css'
import MintUi, { Cell, DatetimePicker, Toast, Header, Spinner, Loadmore, Indicator, InfiniteScroll, Popup } from 'mint-ui';
Vue.use(MintUi, Cell.name, Cell, DatetimePicker.name, DatetimePicker, Toast.name, Toast, Header.name, Header, 
  Spinner.name, Spinner ,Loadmore.name, Loadmore, Indicator.name, Indicator, InfiniteScroll.name, InfiniteScroll,
  Popup.name, Popup )

/** axios **/
import axios from './settings/http.js'
import request from './components/signature/signature'
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created () {
    Vue.prototype.request = request.rest(this)
  }

})

let iWin = document.body.clientWidth;
document.getElementsByTagName("html")[0].style.fontSize = iWin / 16 + "px";
