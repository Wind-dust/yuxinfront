<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">平台配置</h3>
          <el-form ref="form" :model="form" label-width="150px" style="width: 350px">
            <el-form-item label="平台名称：">
              <el-input v-model="form.name" size="small" placeholder="请输入平台名称"></el-input>
            </el-form-item>
            <el-form-item label="上传logo：">
              <el-upload class="avatar-uploader" action="" :http-request="uploadImg"
                         accept=".jpeg,.jpg,.png,.gif,.psd,.bmp" :show-file-list="false"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p class="up-hint">建议：图片上传尺寸200*200像素，大小不超过200KB</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">提交</el-button>
              <!--<el-button >取消</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "platformConfig",
    data() {
      return {
        form: {},
        imageUrl: ''
      }
    },
    mounted() {
      this.$emit('getBread', '平台配置')
    },
    methods: {
      uploadImg(file) {
        let that = this
        let formdata = new FormData()
        formdata.append('image',file.file)
        that.$request({
          url:'upload/uploadfile',
          data:formdata,
          success(res){
            that.imageUrl = res.image_path
          }
        })
      },
      beforeAvatarUpload() {

      },
      submit() {

      }
    }
  }
</script>

<style scoped>
  .avatar-uploader {
    width: 160px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .el-upload {
    display: block !important;
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
    width: 160px;
    height: 160px;
    display: block;
  }

  .up-hint {
    font-size: 12px;
    line-height: 25px;
  }
</style>
