<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <div v-if="selectTemp" class="center">
            <el-card class="box-card" body-style="width:800px">
              <div slot="header" class="clearfix">
                <span style="font-size: 14px;">选择模板</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="selectTemp = false">关闭</el-button>
              </div>
              <el-input size="small" style="width: 120px;" placeholder="模板名称"></el-input>
              <el-button size="mini" type="primary" palin>搜索</el-button>
              <div>
                <el-table :data="tempList" style="width: 100%">
                  <el-table-column type="index" label="序号"></el-table-column>
                  <el-table-column prop="date" label="模板名称" width=""></el-table-column>
                  <el-table-column prop="date" label="短信内容" width=""></el-table-column>
                  <el-table-column prop="date" label="字数" width=""></el-table-column>
                  <el-table-column label="操作" width="">
                    <template slot-scope>
                      <el-button size="mini">选择</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-pagination layout="prev, pager, next" :total="0" hide-on-single-page></el-pagination>
            </el-card>
          </div>
          <h3 class="title">行业短信</h3>
          <el-tabs v-model="activeName">
            <el-tab-pane label="产品信息" name="first"></el-tab-pane>
            <el-tab-pane label="发送短信" name="second"></el-tab-pane>
            <el-tab-pane label="个性化发送" name="seventh"></el-tab-pane>
            <el-tab-pane label="模板管理" name="third"></el-tab-pane>
            <el-tab-pane label="签名管理" name="fourth"></el-tab-pane>
            <el-tab-pane label="黑名单管理" name="fifth"></el-tab-pane>
            <el-tab-pane label="发送列表" name="sixth"></el-tab-pane>
          </el-tabs>
          <div v-if="activeName === 'first'">
            <v-product-temp :name="bread" :content="content" type="marketing" :messageNum="messageNum"></v-product-temp>
          </div>
          <div v-if="activeName === 'second'">
            <div class="content-content">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="发送方式:">
                  <el-switch v-model="messageType" active-text="自定义发送" active-color="#13ce66" inactive-color="#1889ff"
                             :width="50" inactive-text="模板发送"></el-switch>
                </el-form-item>
                <div v-if="!messageType">
                  <el-form-item label="模板选择:" >
                    <el-input v-model="ruleForm.tempTitle" disabled></el-input>
                    <el-button size="mini" type="primary" plain @click="showTempList">选择模板</el-button>
                  </el-form-item>

                  <el-form-item label="短信内容:" >
                    <el-tooltip class="item" effect="dark" placement="top-start">
                      <div slot="content">1、普通短信为70字一条计费<br/>2、超过70字为长短信以67字一条计费 <br>3、短信正文中请不要使用‘【】’，‘<>’等特殊字符</div>
                      <span style="color: #1889ff">编辑须知 <i class="el-icon-question"></i></span>
                    </el-tooltip>
                    <el-input disabled type="textarea" :rows="4" placeholder="请输入短信内容，最多500个字符"
                              v-model="ruleForm.tempContent"></el-input>
                    <p>现共输入 <span style="color: #3a8ee6">{{tempTextLength}}</span> 个字符（包含短信签名、短信内容），合计短信计费条数 <span
                      style="color: #3a8ee6;">{{tempNum}}</span> 条</p>
                  </el-form-item>
                </div>
                <div v-else>
                  <el-form-item label="短信签名:" prop="signatureValue">
                    <el-select v-model="ruleForm.signatureValue" placeholder="请选择" filterable allow-create
                               default-first-option>
                      <el-option v-for="item in signature" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="短信内容:" prop="content">
                    <el-tooltip class="item" effect="dark" placement="top-start">
                      <div slot="content">普通短信为70字一条计费<br/>超过70字为长短信以67字一条计费 <br>请您避免在短信正文中使用【】，<>等特殊字符</div>
                      <span style="color: #1889ff">编辑须知 <i class="el-icon-question"></i></span>
                    </el-tooltip>
                    <el-input type="textarea" :rows="4" placeholder="请输入短信内容，最多500个字符"
                              v-model="ruleForm.content"></el-input>
                    <p>现共输入 <span style="color: #3a8ee6">{{textLength}}</span> 个字符（包含短信签名 <span style="color: #3a8ee6">{{sms_text.length}}</span>个字符、短信内容 <span style="color: #3a8ee6">{{contentLength}}</span>个字符），合计短信计费条数 <span
                      style="color: #3a8ee6;">{{num}}</span> 条</p>
                  </el-form-item>
                </div>
                <el-form-item label="手机号码:" prop="phone">
                  <el-input @blur="disPhone" v-model="ruleForm.phone" :rows="4" placeholder="选择导入号码或直接填写号码，多个号码使用英文逗号隔开"
                            type="textarea" :disabled="disabled"></el-input>
                  <el-button class="import" type="primary" size="small " @click="dialogVisible = true">文件导入</el-button>
                  <!--<el-button class="import" type="primary" size="small " @click="saveNumber">保存</el-button>-->
                  <!--<div class="phone-num" v-if="ruleForm.phone">-->
                    <!--总数：<span>{{upload_num}}</span>个，联通：<span>{{lt_num}}</span>个，移动：<span>{{yd_num}}</span>个，电信：<span>{{dx_num}}</span>个，未知：<span>{{wz_num}}</span>个，虚拟：<span>{{xn_num}}</span>个-->
                  <!--</div>-->
                </el-form-item>
                <el-form-item label="拓展码:">
                  <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="发送时间:" prop="dstime">
                  <el-date-picker v-model="ruleForm.dstime" type="datetime" placeholder="发送日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-dialog title="选择模板" :visible.sync="isShowTemp" width="60%">
                <el-table :data="list" style="width: 100%">
                  <el-table-column prop="template_id" label="模板ID" width="180"></el-table-column>
                  <el-table-column prop="title" label="模板名称" width="180"></el-table-column>
                  <el-table-column prop="content" :width="500" label="短信内容"></el-table-column>
                  <el-table-column  label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="selected(scope.row)">选择</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination v-if="total > 10" layout="prev, pager, next" :total="total"></el-pagination>
              </el-dialog>

              <el-dialog title="导入文件" :visible.sync="dialogVisible" width="30%">
                <p>1：导入文件支持txt、csv、xlsx、xls</p>
                <p>2：单次最大上传不超过2M！,若导入失败，尝试拆分导入</p>
                <p>3：若上传了文件，将覆盖原先输入框中号码</p>
                <p>4：若需重新上传，请先删除上传列表中的文件</p>
                <span class="upload">
                <el-upload class="upload-demo" action="" :http-request="upload" :limit="1" accept=".txt,.csv,.xlsx,.xls"
                           :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">

                  <el-button style="margin-top: 20px" size="medium" type="primary"><i
                    class="el-icon-upload"></i>本地上传</el-button>
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
                  <div class="sms-text" v-if="messageType" >
                    <pre>{{viewText}}</pre>
                  </div>
                  <div class="sms-text" v-else>
                    <pre>{{ruleForm.tempContent}}</pre>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div v-if="activeName === 'third'">
            <v-business-temp :type="6" @getActiveName="getActiveName"></v-business-temp>
          </div>
          <div v-if="activeName === 'fourth'">
            <v-signature-list :type="6" :signaTotal="sign_total" :list="signatureList"></v-signature-list>
          </div>
          <div v-if="activeName === 'fifth'">
            <v-black-list></v-black-list>
          </div>
          <div v-if="activeName === 'sixth'">
            <v-task-list :type="2"></v-task-list>
          </div>
          <div v-if="activeName === 'seventh'">
            <v-custom-send :type="6"></v-custom-send>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import vProductTemp from './components/productTemp'
  import vBusinessTemp from './components/businessTemp'
  import vBlackList from './components/blackList'
  import vDataInfo from './components/dataInfo'
  import vTaskList from './components/taskList'
  import vCustomSend from './components/customSend'
  import vSignatureList from './components/signatureList'

  export default {
    name: "marketingMessage",
    components: {
      vProductTemp,
      vBusinessTemp,
      vBlackList,
      vDataInfo,
      vTaskList,
      vCustomSend,
      vSignatureList
    },
    data() {
      return {
        list:[],
        total:0,
        tempList: [],
        selectTemp: false,
        sms_text: '',
        signature: [],
        ruleForm: {
          content: '',
          phone: '',
          signatureValue: '',
          tempContent: '',
          code:''
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
        content: '网站、APP通过调用API接口，实现手机验证、订单通知等功能。',
        dialogVisible: false,
        num: 1,
        textLength: 0,
        disabled: false,
        messageNum: 0,
        tempTextLength: 0,
        tempNum: 0,
        messageType: false,
        yd_num: 0,
        lt_num: 0,
        dx_num: 0,
        wz_num: 0,
        xn_num: 0,
        upload_num: 0,
        isShowTemp:false,
        screen:{
          page:1,
          pageNum:10
        },
        contentLength:0,
        signatureList:[],
        signa_total:0,
        viewText:''
      }
    },
    watch: {
      'ruleForm.signatureValue'(newVal, oldVal) {
        this.sms_text = '【' + newVal + '】'
        let len = '【' + newVal + '】' + this.ruleForm.content
        this.viewText = len
        this.textLength = len.length
      },
      'ruleForm.content'(newVal, oldVal) {
        this.contentLength = newVal.length
        let len = this.sms_text + newVal
        this.viewText = len
        this.textLength = len.length
        if (len.length <= 70) {
          let num = len.length / 70
          this.num = Math.ceil(num)
        } else {
          let num = len.length / 67
          this.num = Math.ceil(num)
        }

      },
      'ruleForm.tempContent'(val) {
        this.tempTextLength = val.length
        if (val.length <= 70) {
          let num = val.length / 70
          this.tempNum = Math.ceil(num)
        } else {
          let num = val.length / 67
          this.tempNum = Math.ceil(num)
        }

      }
    },
    methods: {

      saveNumber(){
        if (!this.ruleForm.phone) {
          return this.$message.error('请检查号码')
        }
      },
      getSignature(){
        let that = this
        that.$request({
          url:'user/getUserSignature',
          data:{
            business_id:6,
            page:1,
            pageNum:100
          },
          success(res) {
            that.signature = res.result
            that.signatureList = res.result
            that.signa_total = res.total
          }
        })
      },
      disSign(data){
        let arr= []
        for (let i=0;i<data.length;i++){
          data[i]._title = data[i].title.replace(/【/,'').replace(/】/,'')
          switch (parseInt(data[i].audit_status)) {
            case 1:
              data[i]._audit_status = '待审核';
              break;
            case 2:
              data[i]._audit_status = '通过';
              break;
            case 3:
              data[i]._audit_status = '不通过'
          }
        }

        return data
      },
      getActiveName(data) {
        this.activeName = 'second';
        this.ruleForm.tempContent = data.content
        this.ruleForm.tempTitle = data.title
      },
      selected(data){
        this.isShowTemp = false
        this.ruleForm.tempContent = data.content
        this.ruleForm.tempTitle = data.title
      },
      showTempList(){
        let that = this
        that.$request({
          url:'user/getUserModel',
          data:{
            business_id: 6,
            page:that.screen.page,
            pageNum:that.screen.pageNum
          },
          success(e){
            that.isShowTemp = true
            that.list = e.result
            that.total = e.total
          }
        })
      },
      phoneAnalyze(phone = '') {
        if (phone === '') {
          return
        }
        let that = this
        that.$request({
          url: 'send/getMobilesDetail',
          data: {
            phone: phone,
            appid: that.$globalData.userInfo.appid,
            appkey: that.$globalData.userInfo.appkey
          },
          success(res) {
            that.yd_num = res.mobile_num
            that.lt_num = res.unicom_num
            that.dx_num = res.telecom_num
            that.wz_num = res.unknown_num
            that.xn_num = res.virtual_num
            that.upload_num = res.submit_num
          }
        })
      },
      disPhone() {
        // console.log(this.ruleForm.phone)
        let phoneStr = this.ruleForm.phone
        phoneStr = phoneStr.trim()
        this.ruleForm.phone = phoneStr.replace(/\s+/g, ",").replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').replace(/,{2,}/g, ',')
        // this.phoneAnalyze(this.ruleForm.phone)
      },
      confirmUpload() {
        this.dialogVisible = false
        this.disabled = true
      },
      uploadSuccess(res, file, list) {

      },
      upload(file) {
        console.log(file.file)
        let formData = new FormData()
        formData.append('filename', file.file)
        let that = this
        that.$request({
          url: 'upload/uploadUserExcel',
          data: formData,
          success(res) {
            that.ruleForm.phone = res.phone
            that.phoneAnalyze(res.phone)
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
        let data = this.messageType ? {
          appid: that.$globalData.userInfo.appid || '',
          appkey: that.$globalData.userInfo.appkey || '',
          content: that.sms_text + that.ruleForm.content,
          mobile: that.ruleForm.phone,
          dstime: that.ruleForm.dstime,
          taskname: that.ruleForm.taskName,
          develop_no:that.ruleForm.code
        }:{
          appid: that.$globalData.userInfo.appid || '',
          appkey: that.$globalData.userInfo.appkey || '',
          content: that.ruleForm.tempContent,
          mobile: that.ruleForm.phone,
          dstime: that.ruleForm.dstime,
          taskname: that.ruleForm.taskName,
          develop_no:that.ruleForm.code
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'send/getSmsBuiness',
              data: data,
              form:1,
              success(res) {

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
      this.getSignature()
      if (this.$route.query.activeName) {
        this.activeName = this.$route.query.activeName
      }
    }
  }
</script>

<style scoped>
  .center {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
  }

  .box-card {
    background: #ffffff;
    border-radius: 4px;
    padding: 20px;
    position: relative;
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

  .phone-num span {
    color: #1889ff;
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
