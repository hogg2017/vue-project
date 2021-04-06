<template>
  <div>
    <div class="add-item">
      <el-input class="input-style" v-model="inputData"></el-input>
      <el-button class="button-style" @click="addNewData">添加</el-button>
    </div>
    <div class="show-content">
      <div
        class="todoist-item"
        v-for="(item, index) in todolist"
        :key="item.id"
      >
        <div style="width: 25px; display: inline-block">
          <el-tag
            class="pointer"
            size="small"
            effect="plain"
            :type="item.selected ? 'success' : 'info'"
            @click="clickIndex(item.id)"
            >{{ index + 1 }}</el-tag
          >
        </div>
        <div class="item-content">
          <el-checkbox
            class="paddingleft-5"
            size="medium"
            v-model="item.selected"
            @change="itemradioChange(item.id)"
          >
            <label
              :class="item.selected ? 'color-green' : ''"
              class="width-137"
              style="display: inline-block"
              >{{ item.label }}</label
            >
          </el-checkbox>
        </div>
        <el-button
          size="small"
          class="margin-left-6"
          type="danger"
          @click="deleteItem(item.id)"
          >删除</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Array,
  },
  data() {
    return {
      inputData: '',
    }
  },
  computed: {
    todolist() {
      //不直接在props里面对数据进行修改,一般我们用computed 或者data保存一下
      return this.list ? this.list : []
    },
  },
  methods: {
    //添加一个新的数据
    addNewData() {
      if (this.checkedInput(this.inputData)) {
        let newData = this.buildNewData(null, null, this.inputData)
        this.todolist.push(newData)
        this.inputData = ''
        this.$emit('change', { eventType: 'addnewdata', data: newData })
        return
      }
      this.warginning()
    },
    checkedInput(inputdata) {
      if (!!inputdata || !!inputdata.trim()) {
        return true
      }
    },
    warginning(msg) {
      let message = msg ? msg : '输入数据不合法'
      this.$message({
        message: message,
        type: 'warning',
      })
    },
    buildNewData(id, selected, inputdata) {
      let localid = id ? id : Math.random() * 100 + new Date().getTime()
      let localselected = selected ? selected : false
      let obj = {
        id: localid,
        selected: localselected,
        label: inputdata,
      }
      return obj
    },
    //点击tag
    clickIndex(id) {
      let index = this.findItembyId(id)
      this.todolist[index].selected = !this.todolist[index].selected
      this.$emit('change', {
        eventType: 'changeSelected',
        index: index,
        status: this.todolist[index].selected,
      })
    },
    findItembyId(id) {
      let data = this.todolist
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          return i
        }
      }
    },
    //勾选点击
    itemradioChange(id) {
      this.$emit('change', {
        eventType: 'radioChange',
        index: id,
      })
    },
    //删除事件
    deleteItem(id) {
      let index = this.findItembyId(id)
      this.todolist.splice(index, 1)
      this.$emit('change', {
        eventType: 'deleteList',
        index: index,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.margin-left-6 {
  margin-left: 6px;
}
.width-137 {
  width: 137px;
}
.color-green {
  color: #67c23a;
}
.pointer {
  cursor: pointer;
}
.paddingleft-5 {
  padding-left: 5px;
}
.add-item {
  display: inline-block;
  .input-style {
    display: inline-block;
    width: 200px;
  }
  .button-style {
    display: inline-block;
    width: 70px;
    margin-left: 10px;
  }
}
.show-content {
  .item-content {
    display: inline-block;
    line-height: 40px;
    padding-right: 20px;
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
      color: #67c23a;
      background: #67c23a;
      border-color: #67c23a;
    }
  }
}
</style>
