<template>
  <div class="margin-top">
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 @click="back" class="title"><i class="el-icon-arrow-left"></i>返回模板管理</h3>
          <div class="temp">
            <div class="form">
              <el-form ref="form" label-position="left" style="width: 85%;" :model="form" label-width="110px">
                <el-form-item label="模板名称：">
                  <el-input v-model="form.temp_name" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="短信签名：">
                  <el-input v-model="form.sign" placeholder="请输入短信签名"></el-input>
                  <el-alert title="建议输入产品名称或公司名称" type="warning"></el-alert>
                </el-form-item>
                <el-form-item label="短信内容：">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">普通短信为70字一条计费<br/>超过70字为长短信以67字一条计费 <br>请您避免在短信正文中使用【】，<>等特殊字符</div>
                    <span style="color: #1889ff">编辑须知 <i class="el-icon-question"></i></span>
                  </el-tooltip>
                  <el-input type="textarea" placeholder="请输入短信内容，不超过500字" v-model="form.content" :rows="6"></el-input>
                  <p class="content-ex">现在共输入 <span>{{inner.length}}</span> 个字符（包含短信签名、短信内容），合计短信计费条数 <span>{{num}}</span> 条
                  </p>
                </el-form-item>
                <el-form-item>
                  <div class="explain">
                    <p>计费说明：</p>
                    <p>单条短信内容（包括但不限于标点符号、英文字符、汉字等）长度最多为70个字符（包含签名）;</p>
                    <p>如发送短信内容超出 <span>70个字符</span>，将以每 <span>67字符</span> 为一条短信进行累计计费;</p>
                    <p>支持长短信，长短信字符数不超过500个.</p>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small">提交</el-button>
                  <el-button type="primary" size="small" plain @click="back">取消</el-button>
                </el-form-item>
                <el-form-item><p style="font-size: 12px;line-height: 10px">审核时间：<span
                  style="color: red">9:00-18:00</span>，模板提交后，人工会在半小时内完成审核。</p></el-form-item>
              </el-form>
            </div>
            <div class="preview">
              <div class="sms">
                <div class="inner">
                  {{inner}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "tempManage",
    data() {
      return {
        form: {
          temp_name: '',
          sign: '',
          content: ''
        },
        inner: '',
        num: 0
      }
    },
    watch: {
      'form.sign'(newVal, oldVal) {
        if (newVal.length <= 0) {
          this.inner = this.form.content
          return
        }
        this.inner = '【' + newVal + '】' + this.form.content
      },
      'form.content'(newVal, oldVal) {
        this.inner = '【'+this.form.sign+ '】'+newVal
      },
      inner(val) {
        if (val.length <= 70) {
          this.num = Math.ceil(val.length / 70)
        } else if (val.length > 70) {
          this.num = Math.ceil(val.length / 67)
        }
      }
    },
    mounted() {
    },
    methods: {
      back() {
        this.$router.push({path: '/businessMessage', query: {activeName: 'third'}})
      }
    }
  }
</script>

<style scoped>
  .title {
    cursor: pointer;
  }

  .title:hover {
    color: #1889ff;
  }

  .temp {
    display: flex;
    justify-content: center;
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
