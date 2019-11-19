<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">系统消息</h3>
          <div class="">
            <el-select size="small" style="width: 150px" v-model="mailStatus">
              <el-option label="全部" value=""></el-option>
              <el-option label="未读" value="1"></el-option>
              <el-option label="已读" value="2"></el-option>
            </el-select>
            <el-button size="mini" @click="markRead">标为已读</el-button>
            <el-button size="mini">删除</el-button>
          </div>
          <div class="table">
            <el-table :data="list" style="width: 100%" @selection-change="selectMail">
              <el-table-column type="selection"></el-table-column>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="主题"></el-table-column>
              <el-table-column prop="date" label="日期"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Message} from 'element-ui'

  export default {
    components: {},
    data() {
      return {
        date: '',
        type: '',
        list: [{name: '主题主题主题', date: '2019-10-11'}],
        mailStatus: '',
        selectMailOptions: []
      }
    },
    watch: {},
    mounted() {
      this.emit()
    },
    methods: {
      selectMail(val) {
        this.selectMailOptions = val
      },
      markRead() {
        if (this.selectMailOptions.length <= 0) {
          Message({message: '至少选择一项', type: 'error'})
          return
        }
      },
      del() {
        if (this.selectMailOptions.length <= 0) {
          Message({message: '至少选择一项', type: 'error'})
          return
        }
      },
      emit() {
        this.$emit('getBread', '系统消息')
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url: 'send/getSmsBuiness',
              data: {
                appid: that.$globalData.userInfo.appid,
                appkey: that.$globalData.userInfo.appkey,
                content: that.sms_text + that.ruleForm.content,
                mobile: that.ruleForm.phone
              },
              success(res) {
                Message({message: '发送成功', type: 'success'})
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
    },

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

  .table {
    margin-top: 30px;
  }

  .float-right {
    float: right;
    display: inline-block;
  }
</style>
