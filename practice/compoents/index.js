import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
    <span v-show="active">is active</span>
    <span >{{propOne}}</span>
  </div>
`,
  data () {
    return {
      text: '123123'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: compoent
  },
  template: `
  <div>
  <comp-one :active="true" prop-one="text1"></comp-one>
  <comp-one :active="false" propOne="text2"></comp-one>
  </div>
`
})
