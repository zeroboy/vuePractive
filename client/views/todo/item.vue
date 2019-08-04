<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']" >
        <input
                type="checkbox"
                class="toggle"
                v-model="todo.completed"
        >
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>

<script>
import eventBus from '../../assets/eventBus'
export default {
  data () {
    return {
      active: 'activeblock',
      completed: 'completedblock'
    }
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTodo () {
      // console.log(this.views.id);
      /* console.log('------------------');
                console.log(this.views.id);
                console.log('------------------'); */
      this.$emit('del', this.todo.id)
    },
    setClass (iscompleted) {
      const css = ['views-item']
      if (iscompleted) {
        css.push('completed')
        css.push(this.completed)
      } else {
        css.push(this.active)
      }
      return css
    }
  },
  created () {
    console.log('----------start----------')
    var that = this

    eventBus.$on('userEvent', function (state) {
      switch (state) {
        case 'all':
          that.completed = 'completedblock'
          that.active = 'activeblock'
          break
        case 'active':
          that.completed = 'completednone'
          that.active = 'activeblock'
          break
        case 'completed':
          that.active = 'activenone'
          that.completed = 'completedblock'
          break
      }
    })
    console.log(this)
    eventBus.$destroy('userEvent')
    console.log('----------end----------')
  }
}
</script>

<style lang="stylus" scoped>
    .todo-item{
        position relative
        background-color #fff
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.06)
        &:hover{
            .destory:after{
                content: '×'
            }
        }
        label{
            white-space: pre-line;
            word-break: break-all;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: color 0.4s;
        }
        &.completed{
            label{
                color: #d9d9d9;
                text-decoration line-through
            }
        }
    }
    .completednone{
        display none
    }
    .activenone{
        display none
    }

    .activeblock{
        display block
    }
    .completeblock{
        display block
    }
    .toggle{
        text-align: center;
        cursor: pointer;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        appearance: none;
        outline none
        &:after{
            content url('../../assets/img/round.svg')
        }
        &:checked:after{
            content url('../../assets/img/done.svg')
        }
    }
    .destory{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>
