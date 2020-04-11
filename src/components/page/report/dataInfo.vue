<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">日度报表</h3>
          <el-date-picker size="small" v-model="date" type="daterange" range-separator="--" :start-placeholder="startTime"
                          :end-placeholder="endTime" :picker-options="endDateOpt" ></el-date-picker>
          <!--<el-select size="small" v-model="type">-->
            <!--<el-option label="营销短信" value="1"></el-option>-->
            <!--<el-option label="行业短信" value="2"></el-option>-->
          <!--</el-select>-->
          <el-select style="width: 150px" size="small" v-model="type" placeholder="请选择产品" >
            <el-option v-for="(v,k) in service" :key="k" :label="v.business_name"
                       :value="v.business_id"></el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="search">查询</el-button>
          <div id="main"></div>
          <div class="table">
            <el-table :data="list" style="width: 100%"  :summary-method="getSummaries" show-summary >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="_business" label="产品类型"></el-table-column>
              <el-table-column prop="time" label="日期"></el-table-column>
              <el-table-column prop="mobile_num" label="发送号码数量"></el-table-column>
              <el-table-column prop="num" label="发送总计费数"></el-table-column>
              <el-table-column prop="success" label="成功计费数"></el-table-column>
              <el-table-column prop="default" label="失败计费数"></el-table-column>
              <el-table-column prop="unknown" label="未知条数"></el-table-column>
              <el-table-column prop="ratio" label="成功率（%）"></el-table-column>
              <!--<el-table-column prop="address" label="操作"></el-table-column>-->
            </el-table>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="jumpPage"
            :page-sizes="[30,50,80, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import echarts from 'echarts'
  import vPagination from '../../component/pagination'

  export default {
    components: {
      vPagination
    },
    data() {
      return {
        jumpPage:10,
        date: [],
        type: '',
        list: [],
        pageScreen:{
          page:1,
          pageNum:30
        },
        start:'',
        end:'',
        startTime:'',
        endTime:'',
        endDateOpt:{
          disabledDate: (time) => {
            return time.getTime() > new Date().getTime();
          }
        },
        deValue:'',
        total:0,
        num:1,
        page:1,
        pageSize:30,
        service:[]
      }
    },
    watch: {
      date(newVal, oldVal) {
        if (newVal == null){
          this.start = this.startTime
          this.end = this.endTime
          return
        }
        const d = new Date(newVal[0])
        this.start=d.getFullYear() + this.p((d.getMonth() + 1)) + this.p(d.getDate())
        const c = new Date(newVal[1])
        this.end = c.getFullYear() + this.p((c.getMonth() + 1)) + this.p(c.getDate())
      }
    },
    mounted() {
      const s = new Date()
      this.startTime = s.getFullYear() + '-' + this.p((s.getMonth() + 1)) + '-1'
      this.start = s.getFullYear() + this.p((s.getMonth() + 1)) + '01'
      const e = new Date()
      this.endTime = e.getFullYear() + '-' + this.p((e.getMonth() + 1)) + '-' + this.p(e.getDate())
      this.end = e.getFullYear() + this.p((e.getMonth() + 1)) + this.p(e.getDate())
      console.log(this.start)
      this.emit()
      // this.createLine()
      this.getService()
      this.page = this.pageScreen.page
    },
    methods: {
      getService() {
        let that = this
        that.$request({
          url: 'user/getUserEquitises',
          success(res) {
            // that.disService(res.userEquities)
            that.service = res.userEquities
            that.type = res.userEquities[0].business_id
            that.getUserSendInfo(res.userEquities[0].business_id)
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.pageScreen.pageNum = val
        this.getUserSendInfo(this.type)
      },
      handleCurrentChange(val) {
        this.jumpPage = val
        this.pageScreen.page = val
        this.getUserSendInfo(this.type)
      },
      getSummaries(param){
        console.log(param)
        //data里面是数据 columns里面是列
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if(index === 8) {
            sums[index] = ((sums[5] / sums[4]) * 100).toFixed(2);
            return
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      pageChange(obj) {
        console.log(obj)
        this.screen.page = obj.page
        this.getUserSendInfo(this.type)
      },
      search(){
        this.getUserSendInfo()
      },
      p(s) {
        return s < 10 ? '0' + s : s
      },
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
      getUserSendInfo(type){
        let that = this
        that.$request({
          url:'user/getUserStatisticsDay',
          data:{
            page:that.pageScreen.page,
            pageNum:that.pageScreen.pageNum,
            start_timekey:that.start,
            end_timekey:that.end,
            business_id:that.type
          },
          success(res) {
            that.total=res.total
            that.list =that.disData(res.data)
          }
        })
      },
      disData(data){
        for (let i=0;i<data.length;i++) {
          switch (parseInt(data[i].business_id)) {
            case 5:
              data[i]._business = '营销短信';
              break;
            case 6:
              data[i]._business = '行业短信';
              break;
            case 7:
              data[i]._business = '网贷服务';
              break;
            case 8:
              data[i]._business = '图文彩信';
              break;
            case 9:
              data[i]._business = '游戏服务';
              break;
            case 10:
              data[i]._business = '视频彩信';
              break;
            default:
              data[i]._business = '--'
          }
          data[i].time = (data[i].timekey+'').replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
        }
        return data
      },
      emit() {
        this.$emit('getBread', '日度报表')
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
