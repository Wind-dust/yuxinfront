<template>
  <div class="margin-top">
    <el-form label-position="right" label-width="100px" style="width:40%;" :model="userinfo" ref='login'>
      <el-form-item prop="nick_name" label="用户名:" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
        <el-input placeholder="请输入用户名" @keyup.enter.native="submitForm('login')"
                  v-model="userinfo.nick_name"></el-input>
      </el-form-item>
      <el-form-item prop="company_name" label="公司名称:"
                    :rules="[{ required: true, message: '请输入公司名称', trigger: 'blur' }]">
        <el-input placeholder="请输入公司名称" @keyup.enter.native="submitForm('login')"
                  v-model="userinfo.company_name"></el-input>
      </el-form-item>
      <el-form-item prop="passwd" label="密码:" class="is-required" :rules="rule">
        <el-input placeholder="至少8位数且有大小写字母" @keyup.enter.native="submitForm('login')" v-model="userinfo.passwd"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label="确认密码:" class="is-required" :rules="rule1">
        <el-input placeholder="请输入密码" @keyup.enter.native="submitForm('login')" v-model="userinfo.checkPass"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱:" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
        <el-input placeholder="请输入邮箱" @keyup.enter.native="submitForm('login')" v-model="userinfo.email"
                  type="text"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号:" :rules="[{ required: true, message: '请输入手机号', trigger: 'blur' },{min:11,max:11,message:'请检查手机号',trigger:'blur'}]">
        <el-input placeholder="请输入手机号" @keyup.enter.native="submitForm('login')" v-model="userinfo.mobile"
                  type="number"></el-input>
      </el-form-item>
      <el-form-item prop="qq" label="QQ:">
        <el-input placeholder="请输入QQ账号" @keyup.enter.native="submitForm('login')" v-model="userinfo.qq"
                  type="number"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="联系地址:">
        <el-input placeholder="请输入联系地址" @keyup.enter.native="submitForm('login')" v-model="userinfo.address"
                  type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('login')">确认</el-button>
        <el-button class="btn" type="primary" @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "accountInfo",
    data() {
      let check = (rule, value, callback) => {
        console.log(value)
        let rules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        let result = rules.test(value)
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else if (!result) {
          callback(new Error('密码强度不够，至少8位数且含有大小写字母和数字'))
        } else {
          console.log(this.userinfo.checkPass)
          if (this.userinfo.checkPass !== '') {
            this.$refs.login.validateField('checkPass');
          }
          callback()
        }
      }
      let checkPass = (rule, value, callback) => {
        console.log(value)
        console.log(this.userinfo)
        if (value === '') {
          callback(new Error('不能为空'))
        } else if (value !== this.userinfo.passwd) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      return {
        userinfo: {
          nick_name: '',
          passwd: '',
          user_type: 1,
          mobile: '',
          email: '',
          checkPass: '',
          company_name: '',
          qq: ''
        },
        text: '获取手机验证码',
        rule: [{validator: check, trigger: 'blur'}],
        rule1: [{validator: checkPass, trigger: 'blur'}],
        bread: '开通子账户'

      }
    },
    mounted() {
    },
    methods: {
      back() {
        this.$emit('back')
      },
      //需要把添加成功的用户信息返给我
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'user/apportionSonUser',
              data: that.userinfo,
              form: 1,
              success: function (res) {
                if (res.code == 200) {
                  that.$emit('getActiveName',{active:'second',name:'woke'})
                  that.userinfo = {
                    nick_name: '',
                    passwd: '',
                    user_type: '',
                    mobile: '',
                    email: '',
                    checkPass: ''
                  }
                }
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
  .margin-top {
    margin-top: 20px;
  }
</style>
