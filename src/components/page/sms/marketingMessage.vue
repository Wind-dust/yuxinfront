<template>
  <div>
  <el-row>
    <el-col :span="24">
      <div class="box-card box-shadow">
        <h3 class="title">营销短信</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane label="产品信息" name="first"></el-tab-pane>
          <el-tab-pane label="短信任务" name="second"></el-tab-pane>
          <el-tab-pane label="模板管理" name="third"></el-tab-pane>
          <!--<el-tab-pane label="模板库" name="fourth">模板库</el-tab-pane>-->
          <el-tab-pane label="黑名单管理" name="fifth"></el-tab-pane>
        </el-tabs>
        <div v-if="activeName === 'first'">
          <v-product-temp :name="bread" :content="content" type="marketing"></v-product-temp>
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
                <el-input v-model="ruleForm.phone" :rows="4" placeholder="选择导入号码或直接填写号码，多个号码使用英文逗号隔开"
                          type="textarea"></el-input>
                <el-button class="import" type="primary" size="small " @click="dialogVisible = true">文件导入</el-button>
              </el-form-item>

              <el-form-item label="短信内容" prop="content">
                <el-input type="textarea" :rows="4" placeholder="输入短信内容"  v-model="ruleForm.content"></el-input>
                <p>现共输入  <span style="color: #3a8ee6">{{textLength}}</span>  个字符（包含短信签名、短信内容），合计短信计费条数  <span style="color: #3a8ee6;">{{num}}</span>  条</p>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-dialog title="导入文件" :visible.sync="dialogVisible" width="30%" >
              <p>1：导入文件支持txt、csv、xlsx、xls</p>
              <p>2：手机号码条数不得超过1000条</p>
              <p>3：除txt外文件大小不超过5M，单次最大上传20w行,txt文件大小不超过40M,单次最大上传300w行,若导入失败，尝试拆分导入</p>
              <p>4：若上传了文件，将覆盖原先输入框中号码</p>
              <span class="upload">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"  multiple :limit="1" accept=".txt,.csv,.xlsx,.xls" >
                  <el-button size="medium" type="primary"><i class="el-icon-upload"></i>本地上传</el-button>
                </el-upload>
              </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
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
    <v-data-info v-if="activeName === 'first'"></v-data-info>
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
          {value: 'XXX', label: 'XXX'}
        ],
        ruleForm: {
          content: '',
          phone: '',
          signatureValue: ''
        },
        rules: {
          phone: [
            {required: true, message: '请输入正确的手机号码', trigger: 'blur'},
            {max: 11, message: '请输入正确的手机号码', trigger: 'blur'}
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
        bread: '营销短信',
        content: '通过短信的形式，将企业的产品及服务信息推广至用户。',
        dialogVisible: false,
        num:1,
        textLength:0
      }
    },
    watch: {
      'ruleForm.signatureValue'(newVal, oldVal) {
        this.sms_text = '【'+newVal+'】'
        let len = '【'+newVal+'】' + this.ruleForm.content
        this.textLength = len.length
      },
      'ruleForm.content'(newVal,oldVal){
        let len = this.sms_text + newVal
        this.textLength = len.length
        let num = len.length / 70
        this.num = Math.ceil(num)
      }
    },
    methods: {
      emit() {
        this.$emit('getBread', '营销短信')
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
                Message({message: '发送成功', type: 'success'})
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
    },
    mounted() {
      this.emit()
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
