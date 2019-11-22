<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">数据总览</h3>
          <el-date-picker size="small" v-model="date" type="datetimerange" range-separator="--" start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
          <el-select size="small" v-model="type">
            <el-option label="营销短信" value="1"></el-option>
            <el-option label="行业短信" value="2"></el-option>
          </el-select>
          <el-button size="mini" type="primary">查询</el-button>
          <div id="main"></div>
          <div class="table">
            <el-table :data="list" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="发送数量"></el-table-column>
              <el-table-column prop="address" label="成功条数"></el-table-column>
              <el-table-column prop="address" label="失败条数"></el-table-column>
              <el-table-column prop="address" label="未知条数"></el-table-column>
              <el-table-column prop="address" label="成功率"></el-table-column>
              <el-table-column prop="address" label="操作"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import echarts from 'echarts'

  export default {
    components: {},
    data() {
      return {
        date: '',
        type: '',
        list: []
      }
    },
    watch: {
      date(newVal, oldVal) {
        console.log(newVal)
      }
    },
    mounted() {
      this.emit()
      // this.createLine()
    },
    methods: {
      createLine() {
        //获取元素
        let main = document.getElementById('main')
        //初始化echarts
        let myChart = echarts.init(main,'walden')
        myChart.setOption({
          title: {text:'趋势图'},
          tooltip: { trigger: 'axis'},
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
//            dataView : {show: true, readOnly: false},     //数据视图按钮
              magicType : {show: true, type: ['line', 'bar']},
//            restore : {show: true},       //图表右上角刷新按钮
              saveAsImage : {show: true}
            }
          },
          // x轴
          xAxis: [{
            boundaryGap : true,
            data: ['10-20','10-21','10-22','10-23','10-26','10-28']
          }],
          // y 轴
          yAxis: {
            // data:[]
          },
          // 图裂
          legend: {
            data: ['发送条数', '成功条数']
          },
          calculable : true,
          //连接点
          series: [{
            name: '发送条数',
            type: 'line',
            data: [5, 30, 36, 10, 60, 60] //数据，对应xAxis时间
          }, {
            name: '成功条数',
            type: 'line',
            data: [10, 20, 20, 20, 50, 10]
          }]
        })
      },
      emit() {
        this.$emit('getBread', '数据总览')
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

  #main {
    /*width: 100%;*/
    /*height: 200px;*/
    /*margin-top: 40px;*/
  }
</style>
