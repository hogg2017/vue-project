<template>
  <div class="login-page">
    <div class="login-container">
      <div class="avatar-box">
        <img src="../assets/pic/logo.png" alt="" />
      </div>
      <div class="login-box">
        <el-form :model="loginForm" :rules="formRules" ref="loginRef">
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              v-model="loginForm.passWord"
              type="password"
              placeholder="请输入密码"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="loginBtn">登陆</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { saveToken } from '../utils/utils'
export default {
  data() {
    return {
      loginForm: {
        userName: '',
        passWord: ''
      },
      formRules: {
        userName: [
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginBtn() {
      //   console.log("登陆打印", this.loginForm);
      this.$refs['loginRef'].validate(async valid => {
        //   console.log('登陆校验',valid)
        if (!valid) return
        // 第一种写法
        // this.$http.post("/login",this.loginForm).then(res=>{
        //     console.log('请求结果',res.data);
        //    if(res.data.code =='1000'){
        //         console.log('登陆成功!')
        //         console.log('请求结果',res.data);
        //    }
        // })
        const result = await this.$http.post('/login', this.loginForm)
        // console.log("=====",result)
        if (result.status === 200 && result.data.code == '1000') {
          console.log('登陆成功!')
          console.log('请求结果', result.data)
          this.$message.success('登陆成功')
          let token = result.data.data.token
          saveToken(token)
          // 编程式导航
          this.$router.push('./home')
        } else {
          console.log('请求信息', result.data.msg)
          this.$message.info('登陆失败')
        }
      })
    },
    resetForm() {
      console.log(this.$refs['loginRef'])
      this.$refs['loginRef'].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login-page {
  background: #3eaf7c;
  height: 100%;
  .login-container {
    height: 300px;
    width: 450px;
    border: 1px solid #fff;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 在这里我想尝试一下margin的负值
    // margin-left: -50%;
    // margin-top: -50%;
    border-radius: 3px;
    .avatar-box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }
    .login-box {
      padding: 0 20px;
      position: absolute;
      bottom: 0;
      width: 100%;
      // box-szing 为content
      box-sizing: border-box;
      .btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
