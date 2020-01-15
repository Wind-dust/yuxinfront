<template>
  <div style="width: 50%;">
    <div class="hint">个性化发送是针对不同手机号对应不同短信内容，一条手机号对应一条内容的形式，批量提交发送的方式</div>
    <el-upload class="upload-demo" drag action="" multiple :http-request="upload" :limit="1"
               accept=".txt,.csv,.xlsx,.xls" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div style="font-size: 14px">示例模板下载：<a style="color: #1889ff;" href="http://phonetable.shyuxi.com/readme.rar" download>点击下载</a></div>
    <div class="tips">
      <p>提示：</p>
      <p>1、只能上传xls、xlsx、csv文件</p>
      <p>2、上传本地文件最大不超过300M</p>
      <!--暂定五列：手机号，内容，姓名，地址，签名-->
      <p>3、表格文件 <span>第一列</span> 为 <span>手机号</span>，<span>第二列</span> 为 <span>短信签名+短信内容</span> ，实际内容不要有变量</p>
      <p>4、计费方式：短信以 <span>70字</span> 为一条，超过 70字 以 <span>67字</span> 为一条进行计费。字数包含短信签名。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "customSend",
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      upload(file) {
        let that = this
        let formData = new FormData()
        formData.append('appid',this.$globalData.userInfo.appid)
        formData.append('appkey',this.$globalData.userInfo.appkey)
        formData.append('filename',file.file)
        that.$request({
          url:'upload/uploadModelExcel',
          data:formData,
          success(e){
            console.log(e.send_data)
            that.customBusiness(e.send_data)
          }
        })
      },
      customBusiness(data){
        let that = this
        that.$request({
          url:'send/submitBatchCustomBusiness',
          form:1,
          data:{
            appid:that.$globalData.userInfo.appid,
            appkey:that.$globalData.userInfo.appkey,
            connect:data
          },
          success(e) {

          }
        })
      },
      beforeAvatarUpload() {

      },
      uploadSuccess() {

      }
    }
  }
</script>

<style scoped>
  .el-upload-list{
    width: 360rpx;
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
