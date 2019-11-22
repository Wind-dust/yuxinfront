<template>
  <div class="tcontent">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>完善信息</span>
      </div>
      <div class="text item">
        <div>
          <el-upload class="avatar-uploader" action="" :http-request="upLicense" :show-file-list="false">
            <img v-if="license" :src="license" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>上传营业执照</div>
        </div>
        <div>
          <el-upload class="avatar-uploader" action="" :http-request="upLogo" :show-file-list="false">
            <img v-if="logo" :src="logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>上传LOGO</div>
        </div>
      </div>
    </el-card>
    <div class="div">
      <el-button class="button" type="primary" @click="upload">确认上传</el-button>
    </div>
  </div>
</template>

<script>
  import vUpload from '../../component/upload'

  export default {
    name: "license",
    components: {
      vUpload
    },
    data() {
      return {
        license: '',
        logo: ''
      }
    },
    mounted() {
    },
    methods: {
      upload(){
        let that = this
        that.$request({
          url:'user/completeInformation',
          data:{businesslicense:that.license,logo:that.logo},
          success(res){
            that.$message({message:'上传成功',type:'success'})
          }
        })
      },
      upLicense(file) {
        let formdata = new FormData()
        formdata.append('image', file.file);
        let that = this;
        that.$request({
          data: formdata,
          url: 'upload/uploadFile',
          success(res) {
              that.license = res.image_path
          }
        })
      },
      upLogo(file) {
        console.log(file.file)
        let formdata = new FormData()
        formdata.append('image', file.file);
        let that = this;
        that.$request({
          data: formdata,
          url: 'upload/uploadFile',
          success(res) {
            that.logo = res.image_path
          }
        })
      }
    }
  }
</script>

<style scoped>
  .box-card {
    width: 40%;
    margin: 0 auto;
  }

  .text {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }

  .div {
    width: 40%;
    margin: 0 auto;
    padding: 10px 0;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    margin: 0 auto;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
