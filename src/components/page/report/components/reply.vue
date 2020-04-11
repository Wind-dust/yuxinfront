<template>
  <div>
    <!--<el-date-picker style="width:240px" size="small" v-model="date" type="daterange" range-separator="&#45;&#45;"-->
                    <!--start-placeholder="开始日期"-->
                    <!--end-placeholder="结束日期"></el-date-picker>-->
    <el-select style="width: 150px" size="small" v-model="type" placeholder="请选择产品" @change="query(type)">
      <el-option v-for="(v,k) in service" :key="k" :label="v.business_name"
                 :value="v.business_id"></el-option>
    </el-select>
    <!--<el-input style="width: 150px;" v-model="mobile" size="small" placeholder="手机号"></el-input>-->
    <!--<el-button size="mini" type="primary">查询</el-button>-->
    <!--<el-button style="float: right" type="primary" plain size="mini">导出数据</el-button>-->
    <!--<el-button style="float: right" type="primary" size="mini">全部标记已读</el-button>-->
    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="business" label="短信类型"></el-table-column>
        <el-table-column prop="message_info" label="上行内容" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="上行时间" show-overflow-tooltip></el-table-column>
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
</template>

<script>
    export default {
      props:['service'],
        name: "reply",
      data(){
          return{
            mobile:'',
            screen:{
              page:1,
              pageNum:10
            },
            total:0,
            pageSize:30,
            jumpPage:10,
            list:[],
            type:''
          }
      },
      mounted(){
        this.getReply(this.service[0].business_id)
        this.type = this.service[0].business_id
      },
      methods:{
        query(type){
          this.screen.page = 1
          this.screen.pageNum = 10
          this.num = 1
          this.total = 0
          this.page = 1
          this.list = []
          this.getReply(type)
        },
        handleSizeChange(val) {
          this.pageSize = val
          this.pageScreen.pageNum = val
          this.getReply()
        },
        handleCurrentChange(val) {
          this.jumpPage = val
          this.pageScreen.page = val
          this.getReply()
        },
        getReply(type){
          let that = this
          that.$request({
            url:'user/getUserUpriver',
            data:{
              page:that.screen.page,
              pageNum: that.screen.pageNum,
              business_id:type
            },
            success(res){
                that.list = that.disReply(res.upriver)
                that.total = res.total
            }
          })
        },
        disReply(data){
          for (let i=0;i<data.length;i++){
            switch (parseInt(data[i].business_id)) {
              case 5:
                data[i].business = '营销短信';
                break;
              case 6:
                data[i].business = '行业短信';
                break;
              case 7:
                data[i].business = '网贷服务';
                break;
              case 8:
                data[i].business = '图文彩信';
                break;
              case 9:
                data[i].business = '游戏服务';
                break;
              case 10:
                data[i].business = '视频彩信';
                break;
            }
          }
          return data
        }
      }
    }
</script>

<style scoped>

</style>
