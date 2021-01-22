<template>
  <!-- Home
    <el-button type="info" @click="logout">退出</el-button> -->
  <el-container>
    <el-header>
      <div>
        <img src="../assets/pic/logo.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#06565b" text-color="#fff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">
                <template slot="title">
                  <i class="el-icon-picture-outline-round"></i>
                  <span slot="title">选项一</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1-2">
                <template slot="title">
                  <i class="el-icon-picture-outline"></i>
                  <span slot="title">选项二</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span slot="title">导航二</span>
            </template>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
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
    },
  },
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background: #003a44;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center; //按钮
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }
    img {
      height: 60px;
      width: 60px;
    }
  }
  .el-aside {
    background: #06565b;
  }
  .el-main {
    background: #66a4ac;
  }
  .el-footer {
    background: #c2dde4;
  }
}
</style>
