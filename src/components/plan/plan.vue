<template>
  <div>
    <div>123</div>
    <TodoList :list="list" @change="listenChange"></TodoList>
  </div>
</template>
<script>
import TodoList from '../todolist/TodoList'
export default {
  components: {
    TodoList,
  },
  data() {
    return {
      list: [
        { id: 1001, selected: false, label: '计划1' },
        { id: 1002, selected: true, label: '计划2' },
      ],
    }
  },
  methods: {
    listenChange(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="less" scoped>

</style>