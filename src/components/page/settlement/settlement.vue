<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">充值记录</h3>
          <div class="">
            <el-date-picker style="width: 180px" size="small" v-model="date" type="datetimerange" range-separator="--" start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
            <el-select size="small" v-model="type" style="width: 150px;">
              <el-option label="营销短信" value="1"></el-option>
              <el-option label="行业短信" value="2"></el-option>
            </el-select>
            <el-input size="small" v-model="nick_name" style="width: 150px" placeholder="账户名称"></el-input>
            <el-button size="mini" type="primary">查询</el-button>
          </div>
          <div class="table">
            <el-table :data="list" style="width: 100%" >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="date" label="充值日期"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="账户名称"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="产品类型"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="充值条数"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="短信单价"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="总金额"></el-table-column>

            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "settlement",
      data(){
          return{
            list:[],
            date:'',
            type:"",
            nick_name:''
          }
      }
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
</style>
