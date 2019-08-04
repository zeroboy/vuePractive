import Vue from 'vue'

const app = new Vue({
  template: '<div ref="div1">{{text}}<span ref="span1">123</span></div>',
  data: {
    text: 1
  }
})

app.$mount('#root')

setInterval(() => {
  app.text += 1
}, 1000)
// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
/* app.$options.render = (h) => {
  return h('div', {}, 'new render function')
} */
// console.log(app.$root)

// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)
/* app.$watch('text', (newText, oldText) => {
  console.log(`${newText} : ${oldText}`)
}) */

/* app.$on('test', (a, b) => {
  console.log(`this is a:${a} b:${b}`)
})

app.$emit('test', 1, 2) */
