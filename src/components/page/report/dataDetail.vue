<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">明细查询</h3>
          <el-tabs v-model="activeName" >
            <el-tab-pane label="短信明细" name="first"></el-tab-pane>
            <el-tab-pane label="上行查询" name="second"></el-tab-pane>
          </el-tabs>
          <div v-if="activeName == 'first'">
            <el-date-picker style="width:240px" size="small" v-model="date" type="daterange" range-separator="--"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
            <el-select style="width: 150px" size="small" v-model="type" placeholder="请选择产品">
              <el-option label="营销短信" value="1"></el-option>
              <el-option label="行业短信" value="2"></el-option>
            </el-select>
            <el-select style="width: 150px" size="small" v-model="status" placeholder="状态">
              <el-option label="所有状态" value=""></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="失败" value="2"></el-option>
              <el-option label="未知" value="3"></el-option>
            </el-select>
            <el-input style="width: 150px;" size="small" placeholder="手机号"></el-input>
            <el-input style="width: 150px" size="small" placeholder="短信内容"></el-input>
            <el-button size="mini" type="primary">查询</el-button>
            <el-button style="float: right" type="primary" plain size="mini">导出数据</el-button>
            <div class="table">
              <el-table :data="list" style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="date" label="手机号"></el-table-column>
                <el-table-column prop="name" label="短信产品"></el-table-column>
                <el-table-column prop="address" label="短信内容" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="条数"></el-table-column>
                <el-table-column prop="address" label="提交时间"></el-table-column>
                <el-table-column prop="address" label="回执时间"></el-table-column>
                <el-table-column prop="address" label="状态"></el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="activeName == 'second'">
            <el-date-picker style="width:240px" size="small" v-model="date" type="daterange" range-separator="--" start-placeholder="开始日期"
                            end-placeholder="结束日期" ></el-date-picker>
            <el-select style="width: 150px" size="small" v-model="type" placeholder="请选择产品">
              <el-option label="营销短信" value="1"></el-option>
              <el-option label="行业短信" value="2"></el-option>
            </el-select>
            <el-input style="width: 150px;" v-model="mobile" size="small" placeholder="手机号"></el-input>
            <el-button size="mini" type="primary">查询</el-button>
            <el-button style="float: right" type="primary" plain size="mini">导出数据</el-button>
            <el-button style="float: right" type="primary"  size="mini">全部标记已读</el-button>
            <div class="table">
              <el-table :data="list" style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="date" label="手机号"></el-table-column>
                <el-table-column prop="name" label="短信产品"></el-table-column>
                <el-table-column prop="name" label="短信类型"></el-table-column>
                <el-table-column prop="address" label="上行内容" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="上行时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="阅读状态"></el-table-column>
                <el-table-column prop="address" label="操作"></el-table-column>
              </el-table>
            </div>
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
        list: [],
        status: '',
        activeName: 'first',
        mobile:''
      }
    },
    watch: {
      date(newVal, oldVal) {
        console.log(newVal)
      }
    },
    mounted() {
      this.emit()
    },
    methods: {
      emit() {
        this.$emit('getBread', '明细查询')
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
</style>
