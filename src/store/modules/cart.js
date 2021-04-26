//购物车

//vuex 中 state 模块,定义当前功能用到的变量数据
//页面调用:this.$store.state.cart
const state = {
  cartList:[],//购物车数据
  allSelected:false,//购物车的全选状态
  cartNum: '', //购物车,涉及到刷新数据丢失

}
//vuex 中的actions模块,主要定义一些异步方法
//页面触发调用 this.$store.dispatch(‘方法名’,参数只能有一个)
//action 和 mutation 都可以改变state中的数据的状态,但是action 可以处理异步函数
const action = {
  //购物车数据(查)
  getCartList({
    commit,
    state
  }){
    
  }
}