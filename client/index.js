import Vue from 'vue'
import App from './App/app.vue'

import './assets/css/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: h => h(App)
}).$mount(root)
