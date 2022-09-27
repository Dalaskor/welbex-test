import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuePugPlugin from 'vue-pug-plugin'
import '../src/assets/styles/normalize.scss'
import '../src/assets/styles/google-fonts.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
