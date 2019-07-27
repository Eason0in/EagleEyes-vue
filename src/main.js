import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import eventBus from './js/bus'
import './plugins/vuetify'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  data() {
    return {
      bus: eventBus
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
