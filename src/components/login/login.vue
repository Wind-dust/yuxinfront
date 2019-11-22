<template>
  <div class="login">
    <el-card class="box-card">
      <!--<img class="logImg" src="../../assets/imgs/logo.png" alt="钰晰科技" title="钰晰科技">-->
      <el-form label-position="top" label-width="80px" :model="userinfo" ref='login' :rules="rules">
        <el-form-item prop="user" label="账号:" >
          <el-input placeholder="请输入账号" @keyup.enter.native="submitForm('login')" v-model="userinfo.user"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" class="is-required" label="密码:" >
          <el-input placeholder="请输入密码" @keyup.enter.native="submitForm('login')" v-model="userinfo.pwd"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item prop="vercode" class="is-required" label="验证码:">
          <div class="vercode">
            <el-input placeholder="请输入验证码" @keyup.enter.native="submitForm('login')" v-model="userinfo.vercode"
                      type="text"></el-input>
            <v-code :identifyCode="identifyCode" @randomStr="randomStr"></v-code>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('login')">登录</el-button>
        </el-form-item>
        <div class="signText">没有账号？
          <router-link to="/signIn" class="signIn">点我注册</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import vCode from '../component/imgCode'

  export default {
    components: {
      vCode
    },
    data() {
      let check = (rule, value, callback) => {
        let rules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        let result = rules.test(this.userinfo.pwd)
        if (value == '') {
          callback(new Error('密码不能为空'))
        } else if (!result) {
          callback(new Error('密码强度不够，至少8位数且有大小写字母和数字'))
        } else {
          callback()
        }
      };
      let checkCode = (rule, value, callback) => {
        let code = this.identifyCode
        if (!value) {
          callback(new Error('请输入验证码'))
        } else if (value.toLowerCase() !== code.toLowerCase()) {
          callback(new Error('验证码不正确'))
        } else {
          callback()
        }
      }
      return {
        userinfo: {
          user: '',
          pwd: '',
          vercode: ''
        },
        identifyCode: '',
        rules:{
          user:[{ required: true, message: '请输入账号', trigger: 'blur' }],
          pwd:[{validator: check, trigger: 'blur'}],
          vercode:[{validator: checkCode, trigger: 'blur'}]
        }
      }
    },
    mounted() {
      document.title = '登陆'
      this.randomStr()
    },
    methods: {
      randomStr() {
        let seed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'z', 'y', 'm', 'n', 'w', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
        let a = Math.floor(Math.random() * (seed.length))
        let b = Math.floor(Math.random() * (seed.length))
        let c = Math.floor(Math.random() * (seed.length))
        let d = Math.floor(Math.random() * (seed.length))
        this.identifyCode = seed[a] + seed[b] + seed[c] + seed[d] + ''
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'user/login',
              login: true,
              data: {
                nick_name: that.userinfo.user,
                password: that.userinfo.pwd
              },
              success: function (res) {
                localStorage.setItem("con_id", res.con_id)
                that.$router.push({path: '/index'})
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  .box-card {
    width: 400px;
  }

  .btn {
    width: 340px;
    margin: 0 10px;
  }

  .logImg {
    display: block;
    width: 190px;
    margin: 0 auto 10px;
  }

  .title {
    font-size: 24px;
    text-align: center;
  }

  .signText {
    text-align: center;
  }

  .signIn {
    color: #60bff3;
  }

  .vercode {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .vercode input {
    width: 45%;
  }
</style>
