import Vue from 'vue'
import ElementUI from 'element-ui'
import WebCam from "vue-web-cam";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(WebCam);

new Vue({
  el: '#app',
  render: h => h(App)
})
