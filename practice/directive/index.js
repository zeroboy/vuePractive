import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
    <div v-text="text" v-pre>{{text}}</div>
    <div v-html="html"></div>
    <div v-if="active">active</div>
    <div v-else="active">else content</div>
    <div v-show="show">show</div>
    <ul>
      <li v-for="(item,index) in arr" :key="item">{{index}}:{{item}}</li>
    </ul>
    <ul>
      <li v-for="(value,key,index) in obj">{{key}}:{{value}}:{{index}}</li>
    </ul>
    <input type="text" name="text" v-model.lazy="text">
    <input type="checkbox" v-model="active">
    <div>
        <input type="checkbox" v-model="arr" :value="1">
        <input type="checkbox" v-model="arr" :value="2">
        <input type="checkbox" v-model="arr" :value="3">
    </div>
    </div>
  `,
  data: {
    text: 1,
    html: '<span>123</span>',
    active: false,
    show: true,
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    }
  }
})
