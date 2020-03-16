<template>
    <div class="box-card box-shadow">
      <h3 @click="back" class="title"><i class="el-icon-arrow-left"></i>返回模板管理</h3>
      <div class="content-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="彩信标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入彩信标题"></el-input>
          </el-form-item>
          <el-form-item label="彩信内容:" prop="content">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">短信签名、标题加上图文内容不能超过100KB <br>请您避免在彩信正文中使用【】，<>等特殊字符 <br>图片只能上传.gif,.jpg,.jpeg,.png</div>
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
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
          <el-form-item><p style="font-size: 12px;line-height: 10px">审核时间：<span
            style="color: red">9:00-18:00</span>，模板提交后，人工会在半小时内完成审核。</p></el-form-item>
        </el-form>
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
</template>

<script>
    export default {
        name: "createMmsTemp",
      data() {
        return {
          activeName: 'first',
          content: '以图片＋文字的内容形式发送，图文并茂，生动直观，高效直达。',
          ruleForm: {
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
        }
      },
      methods:{
        back(){
          this.$router.go(-1)
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
        submitForm(formName){
          let that = this
          let content_data = that.ruleForm.content
          content_data[content_data.length - 1].content = content_data[content_data.length - 1].content + that.TD
          this.$refs[formName].validate((valid) => {
            if (valid) {
              that.$request({
                url: 'send/multimediaTemplateSignatureReport',
                form: 1,
                data: {
                  appid: that.$globalData.userInfo.appid || '',
                  appkey: that.$globalData.userInfo.appkey || '',
                  content_data: content_data,
                  title:that.ruleForm.title,
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
        }
      }
    }
</script>

<style scoped>
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
