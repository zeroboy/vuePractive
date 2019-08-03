import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div v-bind:id="aaa" :style="style1"><p v-html="html"></p></div>',
  data: {
    isActive: false,
    html: '<span>223</span>',
    aaa: 'test',
    style1: {
      appearance: 'none'
    }
  }
})
