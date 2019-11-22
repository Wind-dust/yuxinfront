<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">行业短信</h3>
          <el-tabs v-model="activeName">
            <el-tab-pane label="产品信息" name="first"></el-tab-pane>
            <el-tab-pane label="短信任务" name="second"></el-tab-pane>
            <el-tab-pane label="模板管理" name="third"></el-tab-pane>
            <!--<el-tab-pane label="模板库" name="fourth">模板库</el-tab-pane>-->
            <el-tab-pane label="黑名单管理" name="fifth"></el-tab-pane>
          </el-tabs>
          <div v-if="activeName === 'first'">
            <v-product-temp :name="bread" :content="content" type="marketing" :messageNum="messageNum"></v-product-temp>
          </div>
          <div v-if="activeName === 'second'">
            <div class="content-content">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="短信签名" prop="signatureValue">
                  <el-select v-model="ruleForm.signatureValue" placeholder="请选择" filterable allow-create
                             default-first-option>
                    <el-option v-for="item in signature" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item label="短信内容" prop="content">
                  <el-input type="textarea" :rows="4" v-model="ruleForm.content"></el-input>
                  <p>现共输入 <span style="color: #3a8ee6">{{textLength}}</span> 个字符（包含短信签名、短信内容），合计短信计费条数 <span
                    style="color: #3a8ee6;">{{num}}</span> 条</p>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="right">
              <div class="preview">
                <div class="inner">
                  <div class="sms-text">{{sms_text+ruleForm.content}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeName === 'third'">
            <v-business-temp></v-business-temp>
          </div>
          <div v-if="activeName === 'fifth'">
            <v-black-list></v-black-list>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--<v-data-info v-if="activeName === 'first'"></v-data-info>-->
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import vProductTemp from './components/productTemp'
  import vBusinessTemp from './components/businessTemp'
  import vBlackList from './components/blackList'
  import vDataInfo from './components/dataInfo'

  export default {
    name: "marketingMessage",
    components: {
      vProductTemp,
      vBusinessTemp,
      vBlackList,
      vDataInfo
    },
    data() {
      return {
        sms_text: '',
        signature: [

        ],
        ruleForm: {
          content: '',
          phone: '',
          signatureValue: ''
        },
        rules: {
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '内容不能为空', trigger: 'blur'},
            {min: 1, max: 500, message: '内容不能超过500个字符'}
          ],
          signatureValue: [
            {required: true, message: '请选择签名', trigger: 'blur'}
          ]
        },
        activeName: 'first',
        bread: '行业短信',
        content: '通过短信的形式，将企业的产品及服务信息推广至用户。',
        dialogVisible: false,
        num: 1,
        textLength: 0,
        disabled: false,
        messageNum:0
      }
    },
    watch: {
      'ruleForm.signatureValue'(newVal, oldVal) {
        this.sms_text = '【' + newVal + '】'
        let len = '【' + newVal + '】' + this.ruleForm.content
        this.textLength = len.length
      },
      'ruleForm.content'(newVal, oldVal) {
        let len = this.sms_text + newVal
        this.textLength = len.length
        if (len.length <= 70) {
          let num = len.length / 70
          this.num = Math.ceil(num)
        } else {
          let num = len.length / 67
          this.num = Math.ceil(num)
        }

      }
    },
    methods: {
      getMessageNum() {
        let that = this
        that.$request({
          url: 'user/getUserEquitises',
          success(res) {
            that.list = res.userEquities
            that.getNum(res.userEquities)
          }
        })
      },
      getNum(data) {
        for (let i = 0; i < data.length; i++) {
          if (parseInt(data[i].business_id) === 6) {
            this.messageNum = data[i].num_balance
          }
        }
      },
      emit() {
        this.$emit('getBread', '行业短信')
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'send/getSmsBuiness',
              data: {
                appid: that.$globalData.userInfo.appid,
                appkey: that.$globalData.userInfo.appkey,
                content: that.sms_text + that.ruleForm.content,
                mobile: that.ruleForm.phone
              },
              success(res) {
                Message({message: '提交成功', type: 'success'})
              }
            })
          } else {
            Message({message: '请填写完整', type: 'error'})
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    ,
    mounted() {
      this.emit()
      this.getMessageNum()
    }
  }
</script>

<style scoped>
  .box-card {
    background: #ffffff;
    border-radius: 4px;
    padding: 20px;
  }

  .title {
    position: relative;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .title::before {
    content: '';
    width: 3px;
    height: 15px;
    background: #1889ff;
    position: absolute;
    top: 4px;
    left: -10px;
  }

  .content-content {
    width: 50%;
    margin-top: 20px;
    float: left;
  }

  .right {
    width: 50%;
    height: 615px;
    float: right;
    padding-left: 150px;
    box-sizing: border-box;
  }

  .preview {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-size: 300px 615px;
    background-repeat: no-repeat;
    height: 100%;
    width: 300px;
    /*background-position-x: 150px;*/
  }

  .inner {
    width: 100%;
    margin: 0px 20px 0 30px;
    padding-top: 100px;
  }

  .sms-text {
    margin-bottom: 5px;
    background: #e5e4e9;
    border-radius: 16px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    padding: 15px;
    width: 200px;
    min-height: 10px;
    word-break: break-all;
  }

  .import {
    margin-top: 10px;
  }

  .el-dialog__body p {
    margin-bottom: 4px;

  }

  .el-dialog__body {
    padding-top: 10px !important;
  }

  .upload {
    display: block;
    margin-top: 20px;
  }
</style>
