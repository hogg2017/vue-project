<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import store from './utils/commonStatus'
// import status from '../src/utils/commonSymbol'
export default {
  name: 'app',
  provide() {
    return {
      // getContext: () => ({
      //   testdata: this.testdata
      // }),
      testdata: this.testdata
    }
  },
  // provide: {
  //   getAnotherContext: this.testdata
  // },
  data() {
    return {
      testdata: 'test',
      // shareData: store.state
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.testdata = 'tset'
    // }, 10000)
    // setTimeout(() => {
    //   store.setMessageAction('change change change')
    // }, 10000)
    this.$bus.on('bus-change', value => {
      console.log('bus监听', value)
    })
    this.$bus.once('once', () => {
      console.log('bus监听once')
    })
  }
}
</script>

<style></style>
