import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
    <p>{{name}}</p>
    <p>{{getname()}}</p>
    <p>{{number}}</p>
    <input type="text" name="name" v-model="number">
    <input type="text" name="firstName" v-model="firstName">
    <input type="text" name="lastName" v-model="lastName">
    <input type="text" name="obj" v-model="obj.a">
    </div>
  `,
  data: {
    firstName: 'ming',
    lastName: 'lis',
    number: 0,
    obj: {
      a: '123'
    }
  },
  mounted () {
    this.obj = {
      a: '345'
    }
  },
  computed: {
    name () {
      console.log('names')
      return `${this.lastName}-${this.firstName}`
    }
  },
  methods: {
    getname () {
      console.log('getname')
      return `${this.lastName}-${this.firstName}`
    }
  },
  watch: {
    'obj.a': {
      handler () {
        console.log('obj.a is changed')
      },
      immediate: true
    }
  }
})
