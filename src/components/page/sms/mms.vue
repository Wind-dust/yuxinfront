<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">图文彩信</h3>
          <el-tabs v-model="activeName">
            <el-tab-pane label="产品信息" name="first"></el-tab-pane>
            <el-tab-pane label="彩信任务" name="second"></el-tab-pane>
            <el-tab-pane label="模板管理" name="third"></el-tab-pane>
            <el-tab-pane label="黑名单管理" name="fifth"></el-tab-pane>
            <el-tab-pane label="发送列表" name="sixth"></el-tab-pane>
          </el-tabs>
          <div v-if="activeName === 'first'">
            <v-product-temp name="图文彩信" :content="content" :messageNum="messageNum" :test="true"></v-product-temp>
          </div>
          <div v-if="activeName === 'second'">
            <div class="content-content">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="彩信签名:" prop="signatureValue">
                  <el-select v-model="ruleForm.signatureValue" placeholder="请选择" filterable allow-create
                             default-first-option>
                    <el-option v-for="item in signature" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="彩信标题" prop="title">
                  <el-input v-model="ruleForm.title" placeholder="请输入彩信标题"></el-input>
                </el-form-item>
                <el-form-item label="彩信内容:" prop="content">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">短信签名、标题加上图文内容不能超过100KB <br>请您避免在彩信正文中使用【】，<>等特殊字符 <br>图片只能上传.gif,.jpg,.jpeg,.png
                    </div>
                    <span style="color: #1889ff">编辑须知 <i class="el-icon-question"></i></span>
                  </el-tooltip>
                  <div style="margin-bottom: 20px;">
                    <el-button size="small" @click="addTab(editableTabsValue)">
                      添加帧
                    </el-button>
                  </div>
                  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                    <el-tab-pane v-for="(item, index) in ruleForm.content" :key="index" :label="'第'+(index+1)+'帧'"
                                 :name="item.num">
                      <el-upload class="avatar-uploader" action="" :http-request="uploadImage"
                                 :show-file-list="false" :before-upload="beforeUpload" :data="{index:index}"
                                 :on-success="uploadSuccess" accept=".gif,.jpg,.jpeg,.png">
                        <img v-if="item.image_path" :src="item.image_path" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <el-input v-model="item.content" type="textarea" :rows="6" placeholder="请输入彩信文字内容"></el-input>
                      <el-checkbox v-model="checked">退订回T</el-checkbox>
                    </el-tab-pane>
                  </el-tabs>
                  <!--图片容量：0KB/80KB-->
                </el-form-item>
                <el-form-item label="手机号码:" prop="phone">
                  <el-input @blur="disPhone" v-model="ruleForm.phone" :rows="4" placeholder="选择导入号码或直接填写号码，多个号码使用英文逗号隔开"
                            type="textarea" :disabled="disabled"></el-input>
                  <el-button class="import" type="primary" size="small " @click="dialogVisible = true">文件导入</el-button>
                  <div class="phone-num" v-if="ruleForm.phone">
                    总数：<span>{{upload_num}}</span>个，联通：<span>{{lt_num}}</span>个，移动：<span>{{yd_num}}</span>个，电信：<span>{{dx_num}}</span>个，未知：<span>{{wz_num}}</span>个，虚拟：<span>{{xn_num}}</span>个
                  </div>
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
              <el-dialog title="导入文件" :visible.sync="dialogVisible" width="30%">
                <p>1：导入文件支持txt、csv、xlsx、xls</p>
                <p>2：单次最大上传不超过2M！,若导入失败，尝试拆分导入</p>
                <p>3：若上传了文件，将覆盖原先输入框中号码</p>
                <p>4：若需重新上传，请先删除上传列表中的文件</p>
                <span class="upload">
                <el-upload class="upload-demo" action="" :http-request="upload" :limit="1" accept=".txt,.csv,.xlsx,.xls"
                           :before-upload="beforeAvatarUpload">

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
                  <div class="sms-text">
                    <p style="color: #848a9f;font-weight: bold">{{sms_text+ruleForm.title}}</p>
                    <div v-for="(v,k) in ruleForm.content" :key="k">
                      <p><img class="img" :src="v.image_path" alt=""></p>
                      <p>{{v.content}}</p>
                    </div>
                    <p>{{TD}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeName === 'third'">
            <v-mms-template></v-mms-template>
          </div>
          <div v-if="activeName ==='fifth'">
            <v-black-list></v-black-list>
          </div>
          <div v-if="activeName==='sixth'">
            <v-task-list></v-task-list>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vProductTemp from './components/productTemp'
  import vBlackList from './components/blackList'
  import vTaskList from './components/taskList'
  import vMmsTemplate from './components/mmsTemplate'

  export default {
    components: {
      vProductTemp,
      vBlackList,
      vTaskList,
      vMmsTemplate
    },
    name: "mms",
    data() {
      return {
        activeName: 'first',
        content: '以图片＋文字的内容形式发送，图文并茂，生动直观，高效直达。',
        ruleForm: {
          signatureValue: '',
          title: '',
          phone: '',
          content: [{
            num: '1',
            name: '第1帧',
            content: '',
            image_path: ''
          }]
        },
        checked: true,
        num: 1,
        disabled: false,
        signature: [],
        rules: {
          phone: [
            {required: true, message: '请输入正确的手机号码', trigger: 'blur'}
          ],
          signatureValue: [
            {required: true, message: '请选择签名', trigger: 'change'}
          ],
          title: [
            {required: true, message: '彩信标题必填', trigger: 'blur'}
          ],
        },
        editableTabsValue: '1',
        dialogVisible: false,
        sms_text: '',
        tabIndex: 1,
        TD: '退订回T',
        messageNum: 0,
        yd_num: 0,
        lt_num: 0,
        dx_num: 0,
        wz_num: 0,
        xn_num: 0,
        upload_num: 0
      }
    },
    watch: {
      'ruleForm.signatureValue'(val) {
        this.sms_text = '【' + val + '】'
      },
      checked(val) {
        if (val) {
          this.TD = '退订回T'
        } else {
          this.TD = ''
        }
      }
    },
    mounted() {
      this.$emit('getBread', '图文彩信')
      this.getMessageNum()
    },
    methods: {
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
          if (parseInt(data[i].business_id) === 8) {
            this.messageNum = data[i].num_balance
          }
        }
      },
      uploadImage(file) {
        console.log(file)
        let that = this
        let formData = new FormData()
        formData.append('image', file.file)
        formData.append('appid', that.$globalData.userInfo.appid)
        formData.append('appkey', that.$globalData.userInfo.appkey)
        that.$request({
          url: 'upload/uploadfile',
          data: formData,
          success(res) {
            that.ruleForm.content[file.data.index].image_path = res.image_path
          }
        })
      },
      uploadSuccess(res, file, fileList) {
        console.log(res)
        console.log(file)
        console.log(fileList)
      },
      disPhone() {
        let phoneStr = this.ruleForm.phone
        phoneStr = phoneStr.trim()
        this.ruleForm.phone = phoneStr.replace(/\s+/g, ",").replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').replace(/,{2,}/g, ',')
        this.phoneAnalyze(this.ruleForm.phone)
      },
      beforeUpload() {

      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        let num = ++this.num + ''
        this.ruleForm.content.push({
          num: num,
          name: '第' + num + '帧',
          content: "",
          image_path: ''
        });
        this.editableTabsValue = num;
      },
      removeTab(targetName) {
        let tabs = this.ruleForm.content;
        let activeName = this.editableTabsValue;
        console.log(activeName, targetName)
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.num === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.num;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.ruleForm.content = tabs.filter(tab => tab.num !== targetName);
      },
      confirmUpload() {
        this.dialogVisible = false
        this.disabled = true
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
      submitForm(formName) {
        let that = this
        let content_data = that.ruleForm.content
        content_data[content_data.length - 1].content = content_data[content_data.length - 1].content + that.TD
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'send/getSmsMultimediaMessageTask',
              form: 1,
              data: {
                appid: that.$globalData.userInfo.appid || '',
                appkey: that.$globalData.userInfo.appkey || '',
                content_data: content_data,
                title: that.sms_text + that.ruleForm.title,
                mobile_content: that.ruleForm.phone,
                send_time: that.ruleForm.dstime,
              },
              success(res) {

              }
            })
          } else {
            that.$message.error('请填写完整')
            return false;
          }
        });
      },
      resetForm(formName) {
        console.log(formName)
        this.disabled = false
        this.$refs[formName].resetFields();
      }
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
    max-height: 430px;
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
    max-height: 435px;
    overflow: auto;
  }

  .phone-num span {
    color: #1889ff;
  }

  .avatar-uploader {
    width: 160px;
    height: 160px;
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
    margin-bottom: 10px;
  }

  .avatar-uploader .el-upload {

  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .img {
    width: 90%;
    margin: 10px auto;
    object-fit: contain;
  }
</style>
