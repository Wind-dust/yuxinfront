<template>
  <el-row>
    <el-col :span="24">
      <div class="box-card box-shadow">
        <h3 class="title">数据分析</h3>
        <div id="main"></div>
        <div class="table">
          <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="date" label="错误码"></el-table-column>
            <el-table-column prop="name" label="失败原因"></el-table-column>
            <el-table-column prop="address" label="失败条数"></el-table-column>
            <el-table-column prop="address" label="所占比例"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "dataAnalyze",
    data() {
      return {
        list:[]
      }
    },
    mounted() {
      this.$emit('getBread', '数据分析')
      this.createLine()
    },
    methods:{
      createLine() {
        //获取元素
        let main = document.getElementById('main')
        //初始化echarts
        let myChart = echarts.init(main,'walden')
        myChart.setOption({
          color: ['#3398DB'],
          title: {text:'数据分析'},
          tooltip: { trigger: 'axis'},
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
//            dataView : {show: true, readOnly: false},     //数据视图按钮
//               magicType : {show: true, type: ['line', 'bar']},
//            restore : {show: true},       //图表右上角刷新按钮
              saveAsImage : {show: true}
            }
          },
          // x轴
          xAxis: [{
            boundaryGap : true,
            data: ['空号','关机','其他原因','短消息超过期','无法接通','移动网关错误','停机','敏感词']
          }],
          // y 轴
          yAxis: {
            // data:[]
          },
          // 图示
          legend: {
            data: []
          },
          calculable : true,
          //连接点
          series: [{
            name: '',
            type: 'bar',
            data: [5, 30, 36, 10, 60, 60,1,2] //数据，对应xAxis时间
          }]
        })
      },
    }
  }
</script>

<style scoped>
  #main {
    width: 100%;
    height: 200px;
    margin-top: 40px;
  }
</style>
