<template>
  <div style="width: 50%;">
    <div class="hint">个性化发送是针对不同手机号对应不同短信内容，一条手机号对应一条内容的形式，批量提交发送的方式</div>
    <div class="hint">变量类型是指文件内容是已报备模板对应的变量值，非变量类型是指上传文件内容是具体短信内容</div>
    <el-form :model="ruleForm">
      <el-form-item label="文件类型：">
        <el-switch v-model="messageType" active-text="变量类型" active-color="#13ce66" inactive-color="#1889ff"
                   :width="50" inactive-text="非变量类型"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-upload class="upload-demo" drag action="" multiple :http-request="upload" :limit="1"
                   accept=".txt,.csv,.xlsx,.xls" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <!--<el-form-item label="签名：">-->
        <!--<el-select v-model="ruleForm.signature">-->
          <!--<el-option v-for="v,k in signatureList" :value="v.signature_id" :label="v.title"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item v-if="messageType" label="模板：">
        <!--<div>-->
        <!--<el-tooltip class="item" effect="dark" placement="top-start">-->
          <!--<div slot="content">该选项如果不传，</div>-->
          <!--<span style="color: #1889ff">须知 <i class="el-icon-question"></i></span>-->
        <!--</el-tooltip>-->
        <!--</div>-->
        <el-input style="width: 221px;" v-model="ruleForm.tempTitle" disabled></el-input>
        <el-button size="mini" type="primary" plain @click="showTempList">选择模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

    <div style="font-size: 14px">示例模板下载：<a style="color: #1889ff;" href="http://phonetable.shyuxi.com/%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9F%AD%E4%BF%A1%E9%A1%BB%E7%9F%A5.zip" download>点击下载</a></div>
    <div class="tips">
      <p>提示：</p>
      <p>1、只能上传xls、xlsx、csv文件</p>
      <p>2、<span>非变量类型上传文件内容第一列是手机号，第二列是签名+内容。变量类型文件内容第一列是手机号，第二列以及后面的列每一列对应一个变量值</span></p>
      <p>3、计费方式：短信以 <span>70字</span> 为一条，超过 70字 以 <span>67字</span> 为一条进行计费。字数包含短信签名。</p>
      <p>4、重新上传请先删除上传列表中的文件</p>
      <p>5、文件内容中<span>除签名外</span>，短信正文中请不要有特殊符号：【】，<>等，分号，逗号，冒号等基础符号请使用中文符号。</p>
    </div>
    <el-dialog title="选择模板" :visible.sync="isShowTemp" width="60%">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="template_id" label="模板ID" width="180"></el-table-column>
        <el-table-column prop="title" label="模板名称" width="180"></el-table-column>
        <el-table-column prop="content" :width="450" label="短信内容"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="selected(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="total > 10" layout="prev, pager, next" :total="total"></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['type'],
    name: "customSend",
    data() {
      return {
        ruleForm: {
          signature: '',
          tempTitle: ''
        },
        screen: {
          page: 1,
          pageNum: 10
        },
        total: 0,
        list: [],
        isShowTemp: false,
        template_id: '',
        signatureList: [],
        send_data:[],
        messageType:false
      }
    },
    mounted() {
      this.getSignature()
    },
    methods: {
      submit(){
        if (this.messageType && this.template_id == ''){
            this.$message.error('请选择模板！')
            return
        }
        let url = ''
        if (this.type == 5){
          url = 'send/submitBatchCustomMarketing'
        } else if (this.type == 6) {
          url = 'send/submitBatchCustomBusiness'
        }
        let that = this
        that.$request({
          url: url,
          form: 1,
          data: {
            appid: that.$globalData.userInfo.appid,
            appkey: that.$globalData.userInfo.appkey,
            connect: this.send_data,
            template_id:that.template_id || ''
          },
          success(e) {

          }
        })
      },
      getSignature() {
        let that = this
        that.$request({
          url: 'user/getUserSignature',
          data: {
            business_id: that.type,
            page: 1,
            pageNum: 100
          },
          success(res) {
            // that.signature = that.disSign(res.result)
            that.signatureList = that.disSign(res.result)
            that.sign_total = res.result
          }
        })
      },
      disSign(data) {
        return data
      },
      selected(data) {
        console.log(data)
        this.isShowTemp = false
        this.ruleForm.tempTitle = data.title
        this.template_id = data.template_id
      },
      showTempList() {
        let that = this
        that.$request({
          url: 'user/getUserModel',
          data: {
            business_id: that.type,
            page: that.screen.page,
            pageNum: that.screen.pageNum
          },
          success(e) {
            that.isShowTemp = true
            that.list = e.result
            that.total = e.total
          }
        })
      },
      upload(file) {
        let that = this
        let formData = new FormData()
        formData.append('appid', this.$globalData.userInfo.appid)
        formData.append('appkey', this.$globalData.userInfo.appkey)
        formData.append('filename', file.file)
        let url = ''
        if (that.messageType){
          url = 'upload/uploadVarModelExcel' //变量类型
        } else {
          url = 'upload/uploadModelExcel' //非变量
        }
        that.$request({
          url: url,
          data: formData,
          success(e) {
            console.log(e.send_data)
            that.send_data = e.send_data
          }
        })
      },
      customBusiness(data) {

      },
      beforeAvatarUpload() {

      },
      uploadSuccess() {

      }
    }
  }
</script>

<style scoped>
  .el-upload-list {
    width: 360px;
  }

  .tips {
    margin-top: 10px;
  }

  p {
    font-size: 14px;
    line-height: 30px;
  }

  p span {
    color: red;
  }

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
</style>
