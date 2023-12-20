import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
import qs from "qs";

Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.prototype.qs = qs
Vue.config.productionTip = false


// 引入API接口文件
import global_ from './components/global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
