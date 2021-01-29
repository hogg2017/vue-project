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
    <!-- 1. :unique-opened 加: 代表属性绑定和不加: 是有区别的 -->
    <!-- 2. router 开启路由模式这个是elementUI特有的,在antd中应该直接将点击事件暴露出来了 -->
    <!-- 3. 设置完router 之后,点击跳转的页面一片空白,并没有左侧的导航,也就是说这是一个全新的页面,并不是使用了router-view的占位符 -->
    <!-- 4. 嵌套路由的设计思维其实本质上和 网络工程的路由表类似 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="collapse-btn" @click="changeCollapse">|||</div>
        <el-menu
          background-color="#06565b"
          text-color="#fff"
          active-text-color="#996666"
          :unique-opened="true"
          :collapse-transition="false"
          :collapse="isCollapse"
          router
        >
          <el-submenu
            :index="'/' + item.path"
            :key="item.id + ''"
            v-for="item in menuList"
          >
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <div v-if="item.children">
              <el-menu-item-group
                :key="childrenitem.id + ''"
                v-for="childrenitem in item.children"
              >
                <el-menu-item :index="'/' + childrenitem.path">
                  <template slot="title">
                    <i class="el-icon-picture-outline-round"></i>
                    <span slot="title">{{ childrenitem.authName }}</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { clearSession } from '../utils/utils'
export default {
  data() {
    return {
      menuList: null,
      isCollapse: false
    }
  },
  methods: {
    logout() {
      clearSession()
      this.$router.push('./login')
    },
    async getMenuList() {
      //.get 返回是一个promise
      //为了简化操作,使用 async await

      //记录,此处有get 争议
      const result = await this.$http.post('/menu', {
        Authorization: window.sessionStorage.getItem('token')
      })
      if (result.status == 200 && result.data.code == 1004) {
        // this.logout() 这个地方这样写有问题,每次刷新,mock会重新生成新的token,create会重载触发这个
        // debugger
        // console.log('============')
        // console.log(result)
        this.logout()
      } else {
        //    console.log(result)
        //    console.log(result.data.msg )
        this.menuList = result.data.data
        console.log('menuList', this.menuList)
      }
    },
    changeCollapse() {
      //
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-menu {
    border-right: none;
  }
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
  .collapse-btn {
    background: #006666;
    text-align: center;
    letter-spacing: 0.2rem;
    font-size: 15px;
    color: #fff;
    line-height: 30px;
    cursor: pointer;
  }
}
</style>
