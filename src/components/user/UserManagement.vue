<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <div>测试项目1:{{ this.context }}</div> -->
    <!-- <div>测试项目1:{{ this.shareDate }}</div> -->
    <div>测试项目3:{{ testData }}</div>
    <div>测试项目3getter:{{ $store.getters.doubleCount }}</div>
    <div>
      <button @click="$store.commit('increments')">count++</button>
      <button @click="$store.dispatch('bite', { n: 5 })">count++</button>
    </div>
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
      <el-table border style="100%" ref="userTable" :data="userList">
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
            <!-- 这个状态在 50讲中使用了axios.put去实现了传递给后台的操作,我觉得频繁操作是有问题的涉及到防抖,所以暂不实现-->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template>
            <el-tooltip content="编辑人员信息"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button
            ></el-tooltip>
            <el-tooltip content="删除人员信息"
              ><el-button
                type="success"
                icon="el-icon-delete"
                size="mini"
              ></el-button
            ></el-tooltip>
            <el-tooltip content="设置人员信息"
              ><el-button
                type="info"
                icon="el-icon-setting"
                size="mini"
              ></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-justify">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="pageSizeList"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
// import store from '../../utils/commonStatus'
// import status from './../../utils/commonSymbol'
export default {
  // 'getContext',
  inject: ['testdata'],
  data() {
    return {
      //获取用户列表
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: null,
      pageSizeList: [5, 10, 15, 20],
      userList: null,
      // injectStatus: this.getContext.testdata
      // shareDate: store.state.message
    }
  },
  computed: {
    // context() {
    //   console.log('打印一下provider的数据', this.getContext())
    //   return this.getContext()
    // },
    context2() {
      return this.testdata
    },
    testData() {
      return this.$store.state.count
    }
  },
  methods: {
    async getUserList() {
      const userList = await this.$http.get('/user-list', {
        params: this.queryInfo
      })
      this.userList = userList.data.data
      this.total = userList.data.total
      // console.log('打印一下获取的结果', userList)
    },
    // 单页显示条目
    handleSizeChange(val) {
      console.log('val', val)
      this.queryInfo.pagesize = val
      this.queryInfo.pagenum = 1
      this.getUserList()
    },
    // 当前页面改变
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      // console.log('打印当前改变的currentVal', val)
      console.log('this.queryInfo.pagenum', this.queryInfo.pagenum)
      this.getUserList()
    }
  },
  created() {
    this.getUserList()
    console.log('打印一下provider的数据', this.context2)
    this.$bus.emit('bus-change', { status: false })
    this.$bus.emit('once')
    setTimeout(() => {
      this.$bus.emit('bus-change', { status: true })
      console.log('this', this)
    }, 10000)
  },
  beforeDestroy() {
    // this.$bus.off('bus-change')
    // this.$bus.off('once', () => {
    //   console.log('destroy bus')
    // })
  }
}
</script>
<style lang="less" scoped>
.pagination-justify {
  display: flex;
  justify-content: flex-end;
}
</style>
