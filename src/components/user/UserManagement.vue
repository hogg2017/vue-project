<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容">
              <el-button
                slot="append"
                style="float: right; padding: 3px 0"
                type="text"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div> -->
      <el-table style="100%" ref="userTable" :data="userList">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column
          label="时间"
          prop="date"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //获取用户列表
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: null
    }
  },
  methods: {
    async getUserList() {
      const userList = await this.$http.get('/user-list', {
        params: this.queryInfo
      })
      this.userList = userList.data.data
      console.log('打印一下获取的结果', this.userList)
    }
  },
  created() {
    this.getUserList()
  },
}
</script>
<style lang="less" scoped></style>
