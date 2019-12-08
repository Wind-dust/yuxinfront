<template>
  <el-row>
    <el-col :span="24">
      <div class="box-card box-shadow">
        <h3 class="title">号码分网</h3>
        <div class="mt">
          <el-radio v-model="radio" :label="1">手动输入</el-radio>
          <el-radio v-model="radio" :label="2">文件导入</el-radio>
        </div>
        <p class="margin">请输入或导入需要分网的号码</p>
        <div v-if="radio === 1">
          <el-input type="textarea" @blur="disPhone" :rows="8" style="width: 500px;" v-model="mobiles"
                    placeholder="输入号码请使用英文逗号隔开"></el-input>
        </div>
        <div v-else-if="radio === 2">
          <el-upload class="upload-demo" drag action="" multiple :http-request="upload" :limit="1"
                     accept=".txt,.csv,.xlsx,.xls" :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <div>
            <p>1、上传文件类型：txt、xls、xlsx、cvs</p>
            <p>2、文件最大不超过10M</p>
          </div>
        </div>
        <div class="margin">
          <p>总计号码数：<span>0</span> 个，详情如下：</p>
          <div class="detail">
            <div class="yd">
              <p>移动：<span>1</span> 个
                <el-tooltip class="item" effect="dark" content="复制号码" placement="top-start">
                  <i class="el-icon-document" v-clipboard:copy="'电话号码'" v-clipboard:success="onCopy"
                     v-clipboard:error="onError"></i>
                </el-tooltip>
              </p>
              <div class="yd-content"></div>
            </div>
            <div class="yd">
              <p>联通：<span>1</span> 个
                <el-tooltip class="item" effect="dark" content="复制号码" placement="top-start">
                  <i class="el-icon-document" v-clipboard:copy="'电话号码'" v-clipboard:success="onCopy"
                     v-clipboard:error="onError"></i>
                </el-tooltip>
              </p>
              <div class="yd-content"></div>
            </div>
            <div class="yd">
              <p>电信：<span>0</span> 个
                <el-tooltip class="item" effect="dark" content="复制号码" placement="top-start">
                  <i class="el-icon-document" v-clipboard:copy="'电话号码'" v-clipboard:success="onCopy"
                     v-clipboard:error="onError"></i>
                </el-tooltip>
              </p>
              <div class="yd-content"></div>
            </div>
            <div class="yd">
              <p>未知：<span>0</span> 个
                <el-tooltip class="item" effect="dark" content="复制号码" placement="top-start">
                  <i class="el-icon-document" v-clipboard:copy="'电话号码'" v-clipboard:success="onCopy"
                     v-clipboard:error="onError"></i>
                </el-tooltip>
              </p>
              <div class="yd-content"></div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "numCate",
    data() {
      return {
        radio: 1,
        mobiles: ''
      }
    },
    mounted() {

    },
    methods: {
      disPhone() {
        let phoneStr = this.mobiles
        phoneStr = phoneStr.trim()
        this.mobiles = phoneStr.replace(/\s+/g, ",").replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').replace(/,{2,}/g, ',')
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

          }
        })
      },
      beforeAvatarUpload(file) {
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   this.$message.error('文件大小不能超过 2MB!');
        //   return
        // }
      },

      onCopy(e) {
        this.$message.success("内容已复制到剪切板！")
      },

      onError(e) {
        this.$message.error("抱歉，复制失败！")
      }
    }

  }
</script>

<style scoped>
  p span {
    font-size: 13px;
    color: #1889ff;
  }

  .detail {
    width: 1000px;
    padding: 20px 50px 20px 0;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .upload {
    width: 800px;
    height: 200px;
    border-radius: 8px;
    border: 1px solid #f7f7f7;
  }

  .yd {
    width: 160px;
    height: 275px;
    background: #f7f7f7;
    margin-left: 40px;
    padding: 10px 20px;
    border-radius: 4px;
  }

  p {
    font-size: 14px;
  }

  p i {
    font-size: 16px;
  }

  .yd-content {
    width: 134px;
    height: 250px;
    overflow: auto;
  }
</style>
