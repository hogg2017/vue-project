<template>
  <div>
    Home
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>
<script>
import { clearSession } from '../utils/utils'
export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      clearSession()
      this.$router.push('./login')
    }
  }
}
</script>
<style lang="less" scoped></style>
