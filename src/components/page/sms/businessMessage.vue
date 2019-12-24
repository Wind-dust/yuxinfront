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
          <el-tab-pane label="发送列表" name="sixth"></el-tab-pane>
        </el-tabs>
        <div v-if="activeName === 'first'">
          <v-product-temp :name="bread" :content="content" type="business" :message-num="messageNum"></v-product-temp>
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
                <el-input @blur="disPhone" v-model="ruleForm.phone" :rows="4" placeholder="选择导入号码或直接填写号码，多个号码使用英文逗号隔开"
                          type="textarea" :disabled="disabled"></el-input>
                <el-button class="import" type="primary" size="small " @click="dialogVisible = true">文件导入</el-button>
              </el-form-item>
              <el-form-item label="任务名称" prop="taskName">
                <el-input type="text" v-model="ruleForm.taskName"></el-input>
              </el-form-item>

              <el-form-item label="短信内容" prop="content">
                <el-input type="textarea" :rows="4" placeholder="输入短信内容" v-model="ruleForm.content"></el-input>
                <p>现共输入 <span style="color: #3a8ee6">{{textLength}}</span> 个字符（包含短信签名、短信内容），合计短信计费条数 <span
                  style="color: #3a8ee6;">{{num}}</span> 条</p>
              </el-form-item>
              <el-form-item label="发送时间" prop="dstime">
                <el-date-picker v-model="ruleForm.dstime" type="datetime" placeholder="发送日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-dialog title="导入文件" :visible.sync="dialogVisible" width="30%">
              <p>1：导入文件支持txt、csv、xlsx、xls</p>
              <p>2：单次最大上传不超过2M！,若导入失败，尝试拆分导入</p>
              <p>3：若上传了文件，将覆盖原先输入框中号码</p>
              <p>4：若需重新上传，请先删除上传列表中的文件</p>
              <span class="upload">
                <el-upload class="upload-demo" action="" :http-request="upload" :limit="1" accept=".txt,.csv,.xlsx,.xls"
                           :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">

                  <el-button style="margin-top: 20px" size="medium" type="primary"><i class="el-icon-upload"></i>本地上传</el-button>
                </el-upload>
              </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmUpload">确 定</el-button>
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
        <div v-if="activeName === 'sixth'">
          <v-task-list></v-task-list>
        </div>
      </div>
    </el-col>
  </el-row>
    <!--<v-data-info v-if="activeName === 'first'"></v-data-info>-->
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import vBusinessTemp from './components/businessTemp'
  import vProductTemp from './components/productTemp'
  import vBlackList from './components/blackList'
  import vDataInfo from './components/dataInfo'
  import vTaskList from './components/taskList'

  export default {
    name: "marketingMessage",
    components: {
      vBusinessTemp,
      vProductTemp,
      vBlackList,
      vDataInfo,
      vTaskList
    },
    data() {
      return {
        sms_text: '...',
        signatureValue: '',
        signature: [

        ],
        dialogVisible:false,
        disabled:false,
        ruleForm: {
          content: '',
          phone: '',
          signatureValue: '',
          taskName: '',
          dstime: ''
        },
        rules: {
          phone: [
            {required: true, message: '请输入正确的手机号码', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '内容不能为空', trigger: 'blur'},
            {min: 1, max: 500, message: '内容不能超过500个字符'}
          ],
          signatureValue: [
            {required: true, message: '请选择签名', trigger: 'change'}
          ],
          taskName: [
            {required: true, message: '任务名称不能为空', trigger: 'blur'}
          ],
          // dstime: [
          //   {required: true, message: '请选择发送时间', trigger: 'change'}
          // ]
        },
        activeName: 'first',
        bread:'营销短信',
        content:'网站、APP通过调用API接口，实现手机验证、订单通知等功能。',
        num:0,
        textLength:0,
        messageNum:0
      }
    },
    watch: {
      'ruleForm.signatureValue'(newVal, oldVal) {
        console.log(newVal)
        this.sms_text = '【'+newVal+'】'
        let len = '【'+newVal+'】' + this.ruleForm.content
        this.textLength = len.length
      },
      'ruleForm.content'(newVal,oldVal){
        let len = this.sms_text + newVal
        this.textLength = len.length
        if (len.length <= 70 ) {
          // 字数/70 = 条数
          let num = len.length / 70
          this.num = Math.ceil(num)
        } else {
          let len = this.sms_text + newVal
          let num = len.length / 67
          console.log(num)
          this.num = Math.ceil(num)
        }
      },
      'ruleForm.dstime'(val){
        console.log(val)
      }
    },
    methods: {
      disPhone(){
        // console.log(this.ruleForm.phone)
        let phoneStr = this.ruleForm.phone
        let str = phoneStr.replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').replace(/,{2,}/g, ',')
        this.ruleForm.phone = str
      },
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
          if (parseInt(data[i].business_id) === 5) {
            this.messageNum = data[i].num_balance
          }
        }
      },
      confirmUpload(){
        this.dialogVisible = false
        this.disabled = true
      },
      uploadSuccess(res,file,list){

      },
      upload(file) {
        console.log(file.file)
        let formData = new FormData()
        formData.append('filename',file.file)
        let that = this
        that.$request({
          url:'upload/uploadUserExcel',
          data:formData,
          success(res) {
            that.ruleForm.phone = res.phone
          }
        })
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('文件大小不能超过 2MB!');
          return
        }
      },
      emit() {
        this.$emit('getBread', '营销短信')
      },
      submitForm(formName) {
        let that = this
        console.log(that.ruleForm)

        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'send/getSmsMarketingTask',
              form:1,
              data: {
                appid: that.$globalData.userInfo.appid || '',
                appkey: that.$globalData.userInfo.appkey || '',
                content: that.sms_text + that.ruleForm.content,
                mobile: that.ruleForm.phone ,
                dstime: that.ruleForm.dstime,
                taskname: that.ruleForm.taskName
              },
              success(res) {
                if (res.code == 200) {
                  Message({message: '提交成功', type: 'success'})
                }

              }
            })
          } else {
            Message({message: '请填写完整', type: 'error'})
            return false;
          }
        });
      },
      resetForm(formName) {
        console.log(formName)
        this.disabled = false
        this.$refs[formName].resetFields();
      }
    },
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

</style>
