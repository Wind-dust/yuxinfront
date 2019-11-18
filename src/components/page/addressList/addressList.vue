<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">通讯录</h3>
          <el-input style="width: 150px" size="small" placeholder="请输入手机号"></el-input>
          <el-button size="mini" type="primary">查询</el-button>
          <div class="float-right">
            <el-select size="small" style="width: 150px" v-model="addMobile">
              <el-option label="添加联系人" value=""></el-option>
              <el-option label="批量添加" value="1"></el-option>
              <el-option label="单个添加" value="2"></el-option>
              <el-option label="文件导入" value="3"></el-option>
            </el-select>
            <el-select size="small" style="width: 150px" v-model="addMobile">
              <el-option label="批量操作" value=""></el-option>
              <el-option label="删除" value="1"></el-option>
              <el-option label="复制" value="2"></el-option>
              <!--<el-option label="移动" value="3"></el-option>-->
            </el-select>
            <el-select size="small" multiple style="width: 150px" placeholder="更多维度" collapse-tags v-model="selectOption">
              <el-option label="公司" value="1"></el-option>
              <el-option label="职务" value="2"></el-option>
              <el-option label="QQ" value="3"></el-option>
              <el-option label="邮箱" value="4"></el-option>
              <el-option label="号码归属地" value="5"></el-option>
            </el-select>
          </div>
          <div class="table">
            <el-table :data="list" style="width: 100%">
              <el-table-column type="selection"></el-table-column>
              <!--<el-table-column type="index" label="序号"></el-table-column>-->
              <el-table-column prop="date" label="姓名"></el-table-column>
              <el-table-column prop="name" label="手机号"></el-table-column>
              <el-table-column prop="address" label="所属分组"></el-table-column>
              <el-table-column v-for="(v,k) in options" prop="address" :key="k" :label="v.name"
                               v-if="v.status"></el-table-column>
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
        list: [],
        addMobile: '',
        options: [{
          id:1,
          name: '公司',
          status: false
        }, {
          id:2,
          name: '职务',
          status: false
        }, {
          id:3,
          name: 'QQ',
          status: false,
        }, {
          id:4,
          name: '邮箱',
          status: false
        }, {
          id:5,
          name: '号码归属地',
          status: false
        }],
        selectOption: []
      }
    },
    watch: {
      date(newVal, oldVal) {
        console.log(newVal)
      },
      selectOption(newVal, oldVal) {
        console.log(newVal)
        if (newVal.length > 0){
          for (let i=0;i<newVal.length;i++){
            //如果
            this.options[newVal[i] - 1].status = true
          }
        } else {
          for (let i=0;i<this.options.length;i++){
            this.options[i].status = false
          }
        }

      }
    },
    mounted() {
      this.emit()
    },
    methods: {
      emit() {
        this.$emit('getBread', '通讯录')
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
