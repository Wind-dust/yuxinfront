<template>
  <div class="login">
    <el-card class="box-card">
      <img class="logImg" src="../../assets/imgs/logo.png" alt="">
      <el-form label-position="top" label-width="80px" :model="userinfo" ref='login'>
        <el-form-item prop="nick_name" label="用户姓名:" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
          <el-input placeholder="请输入用户姓名" @keyup.enter.native="submitForm('login')" v-model="userinfo.user"></el-input>
        </el-form-item>
        <el-form-item prop="passwd" label="密码:" :rules="rule">
          <el-input placeholder="至少8位数且有大小写字母" @keyup.enter.native="submitForm('login')" v-model="userinfo.pwd"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码:" :rules="rule1">
          <el-input placeholder="请输入密码" @keyup.enter.native="submitForm('login')" v-model="userinfo.checkPass"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item prop="user_type" label="账户类型:" :rules="[{required:true,message:'请选择账户类型',trigger:'blur'}]">
          <el-select v-model="userinfo.user_type" placeholder="请选择账户类型" @keyup.enter.native="submitForm('login')">
            <el-option label="个人账户" value="1"></el-option>
            <el-option label="企业账户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
          <el-input placeholder="请输入邮箱" @keyup.enter.native="submitForm('login')" v-model="userinfo.email"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号:" :rules="[{ required: true, message: '请输入手机号', trigger: 'blur' }]">
          <el-input placeholder="请输入手机号" @keyup.enter.native="submitForm('login')" v-model="userinfo.mobile"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item prop="vercode" label="验证码:" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <el-input class="vercode" placeholder="请输入验证码" @keyup.enter.native="submitForm('login')"
                    v-model="userinfo.vercode"
                    type="text"></el-input>
          <el-button class="getCode" type="primary" @click.prevent="getCode">{{text}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('login')">登录</el-button>
        </el-form-item>
        <div class="signText">已有账号？
          <router-link to="/login" class="signIn">去登录</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { Message} from 'element-ui'
  export default {
    data() {
      let check = (rule,value,callback) =>{
        let rules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        let result = rules.test(this.userinfo.passwd)
        if (value == ''){
          callback(new Error('密码不能为空'))
        } else if (!result) {
          callback(new Error('密码强度不够，至少8位数且含有大小写字母和数字'))
        } else {
          if (this.userinfo.checkPass !== '') {
            this.$refs.userinfo.validateField('checkPass');
          }
          callback()
        }
      }
      let checkPass = (rule,value,callback) => {
        if (value === ''){
          callback(new Error('不能为空'))
        } else if (value !== this.userinfo.passwd) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      return {
        userinfo: {
          user: '',
          passwd: '',
          user_type: '',
          mobile: '',
          email: '',
          varcode: '',
          checkPass:''
        },
        text: '获取手机验证码',
        rule:[{validator:check,trigger:'blur'}],
        rule1:[{validator:checkPass,trigger:'blur'}]

      }
    },
    mounted() {
      document.title = '注册'
    },
    methods: {
      getCode() {
        if (!this.userinfo.mobile || this.userinfo.mobile.length < 11){
          Message({message:'手机号错误',type:'error'})
          return
        }
        let that = this
        that.$request({
          url: 'user/sendvercode',
          data: {
            mobile: that.userinfo.mobile,
            stype: 1
          },
          login:true,
          success(res) {
            that.timeout()
            that.disabled = true
          }
        })
      },
      timeout() {
        let i = 60
        let that = this
        let timer = setInterval(function () {
          i--
          if (i <= 0) {
            clearInterval(timer)
            that.text = '获取手机验证码'
            return
          }
          that.text = i + 's后重新获取'
        }, 1000)
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'admin/login',
              login: true,
              data: {
                admin_name: that.userinfo.user,
                passwd: that.userinfo.pwd
              },
              success: function (res) {
                localStorage.setItem("cms_con_id", res.cms_con_id)
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
    width: 60%;
  }

  .getCode {
    height: 100%;
    float: right;
    padding: 9px 20px;
  }
</style>
