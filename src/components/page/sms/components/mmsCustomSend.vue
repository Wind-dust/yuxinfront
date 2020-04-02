<template>
  <div style="width: 50%;">
    <div class="hint">个性化发送是针对不同手机号对应不同短信内容，一条手机号对应一条内容的形式，批量提交发送的方式</div>
    <div class="hint">变量类型是指文件内容是已报备模板对应的变量值</div>
    <el-form :model="ruleForm">
      <el-form-item>
        <el-upload class="upload-demo" drag action="" multiple :http-request="upload" :limit="1"
                   accept=".txt,.csv,.xlsx,.xls" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="模板：">
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
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="模板名称" prop="name"></el-table-column>
        <el-table-column prop="title" label="彩信标题"></el-table-column>
        <el-table-column  label="缩略图">
          <template slot-scope="scope">
            <img :src="scope.row.multimedia_frame[0].image_path" alt="" style="object-fit: contain;max-height: 100px;">
          </template>
        </el-table-column>
        <el-table-column prop="multimedia_frame[0].content" :width="350" label="内容"></el-table-column>
        <el-table-column prop="create_time" label="	创建时间"></el-table-column>
        <el-table-column prop="_status" label="审核状态"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="review(scope.row)">预览</el-button>
            <el-button type="text" size="small" @click="selected(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="total > 10" layout="prev, pager, next" :total="total"></el-pagination>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="30%">
      <div class="preview">
        <div class="inner">
          <div class="sms-text" >
            <p class="title">{{viewTitle}}</p>
            <div v-for="v,k in viewContent">
              <img class="img" :src="v.image_path" alt="">
              <pre>{{v.content}}</pre>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
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
        messageType:false,
        dialogVisible:false,
        viewTitle:'',
        viewContent:[]
      }
    },
    mounted() {

    },
    methods: {
      review(data){
        console.log(data)
        this.dialogVisible = true
        this.viewTitle = data.title
        this.viewContent = data.multimedia_frame
      },
      submit(){
        if (this.template_id == ''){
          this.$message.error('请选择模板！')
          return
        }
        let that = this
        that.$request({
          url: 'send/submitBatchCustomMultimediaMessage',
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
      selected(data) {
        console.log(data)
        this.isShowTemp = false
        this.ruleForm.tempTitle = data.name
        this.template_id = data.template_id
      },
      showTempList() {
        let that = this
        that.$request({
          url: 'user/getUserMultimediaTemplate',
          data: {
            business_id: 9,
            page: that.screen.page,
            pageNum: that.screen.pageNum,
            status:2
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
  .preview {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-size: 300px 615px;
    background-repeat: no-repeat;
    height: 615px;
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
  .title{
    font-size: 14px;
    font-weight: bold;
    color: grey;
    margin-bottom: 20px;
  }
  .img {
    width: 90%;
    margin: 10px auto;
    object-fit: contain;
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
</style>
