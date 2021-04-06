<template>
  <div>
    <div>welcome</div>
    <el-button @click="queryRouter">query传参</el-button>
    <el-button @click="paramsRouter">params传参</el-button>
    <el-button @click="testRouter">test路径</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    queryRouter() {
      this.$router.push({
        path: '/router1',
        query: { id: 12 },
      })
    },
    paramsRouter() {
      this.$router.push({
        name: 'router2',
        params: { id: 12 },
      })
    },
    testRouter() {
      this.$router.push({
        path: '/router1/test',
        query: { id: 12 },
      })
    },
  },
}
</script>
<style lang="less" scoped></style>
