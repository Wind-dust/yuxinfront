<template>
  <div class="margin-top">
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 @click="back" class="title"><i class="el-icon-arrow-left"></i>返回签名管理</h3>
          <div class="temp">
            <div class="form">
              <el-form ref="form" label-position="left" :model="form" style="width: 85%;" label-width="110px">
                <el-form-item prop="signature" label="短信签名："
                              :rules="[{required: true,message: '请输入短信签名',trigger: 'blur'}]">
                  <el-input v-model="form.signature" placeholder="请输入短信签名"></el-input>
                  <el-alert title="建议输入产品名称或公司名称，直接输入，不要有特殊符号" type="warning"></el-alert>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" @click="submit">提交</el-button>
                  <el-button size="small" @click="back">取消</el-button>
                </el-form-item>
                <el-form-item><p style="font-size: 12px;line-height: 10px">审核时间：<span
                  style="color: red">9:00-18:00</span>，签名提交后，人工会在半小时内完成审核。</p></el-form-item>
              </el-form>
            </div>
            <!--<div class="preview">-->
            <!--<div class="sms">-->
            <!--<div class="inner">-->
            <!--{{inner}}-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "signature",

    data() {
      return {
        form: {
          signature: '',
        },
        type: 0,
        inner: ''
      }
    },
    mounted() {
      this.type = this.$route.query.type
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      submit() {
        let that = this
        that.$request({
          url: 'send/SignatureReport',
          data: {
            appid: that.$globalData.userInfo.appid,
            appkey: that.$globalData.userInfo.appkey,
            type: that.type,
            title: '【' + that.form.signature + '】'
          },
          form: 1,
          success(e) {
            that.form.signature = ''
          }
        })
      }
    }
  }
</script>

<style scoped>
  .hint {
    width: 100%;
    padding: 8px 48px 8px 16px;
    font-size: 12px;
    border: 1px solid #abdcff;
    background-color: #f0faff;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 15px 0 20px 0;
  }

  .title {
    cursor: pointer;
  }

  .title:hover {
    color: #1889ff;
  }

  .temp {
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .form {
    width: 50%;
    padding: 50px 100px 0 30px;
  }

  .el-alert {
    padding: 0;
    margin-top: 10px;
  }

  .content-ex {
    font-size: 12px;
  }

  .content-ex span {
    color: #1889ff;
  }

  .explain {
    width: 95%;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 12px;
    padding: 10px;
    line-height: 24px !important;
    background: #f7f7f7;
  }

  .explain span {
    color: red;
  }

  .preview {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-repeat: no-repeat;
    float: right;
    width: 300px;
    height: 615px;
    margin-right: 200px;
    position: relative;
  }

  .sms {
    width: 100%;
    padding: 115px 35px;
    box-sizing: border-box;
    height: 100%;
  }

  .inner {
    border-radius: 20px;
    padding: 15px;
    width: 100%;
    min-height: 50px;
    background: #f7f7f7;
    box-sizing: border-box;
    word-break: break-all;
  }
</style>
