<template>
    <div>
      <el-date-picker v-model="month" size="small" style="width: 120px;" type="month" placeholder="选择月"  :picker-options="pickerOptions">
      </el-date-picker>
      <!--<el-select size="small" v-model="product" placeholder="产品类型">-->
      <!--<el-option label="营销短信" value="1"></el-option>-->
      <!--<el-option label="行业短信" value="2"></el-option>-->
      <!--</el-select>-->
      <el-input size="small" style="width: 150px" v-model="name" placeholder="企业名称/账户名称"></el-input>
      <el-button size="mini" type="primary" @click="check">查询</el-button>
      <div class="float-right"><el-button plain size="mini" type="primary">导出数据</el-button></div>
      <div class="float-right">
        <el-select size="small" multiple style="width: 150px" placeholder="显示更多" v-model="selectOption">
          <el-option label="单价" :value="1"></el-option>
          <el-option label="金额" :value="2"></el-option>
        </el-select>
      </div>
      <div class="table">
        <el-table :data="list" style="width: 100%" show-summary sum-text="汇总">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="address" label="产品类型"></el-table-column>
          <el-table-column prop="address" label="发送条数"></el-table-column>
          <el-table-column prop="address" label="成功条数"></el-table-column>
          <el-table-column prop="address" label="失败条数"></el-table-column>
          <el-table-column prop="address" label="未知条数"></el-table-column>
          <el-table-column prop="address" label="计费条数"></el-table-column>
          <el-table-column v-for="(v,k) in options" prop="" :key="k" :label="v.title" v-if="v.status"></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "billDetail",
      data(){
          return{
            name:'',
            month:'',
            list: [],
            selectOption: [1, 2],
            options: [{
              id: 1,
              title: '单价',
              value: '',
              status: true,
            }, {
              id: 2,
              title: '金额',
              value: '',
              status: true
            }],
            pickerOptions:{
              disabledDate(time) {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                if (month >= 1 && month <= 9) {
                  month = "0" + month;
                }
                let currentdate = year.toString()  + month.toString();

                let timeyear = time.getFullYear();
                let timemonth = time.getMonth() + 1;
                if (timemonth >= 1 && timemonth <= 9) {
                  timemonth = "0" + timemonth;
                }
                let timedate = timeyear.toString() + timemonth.toString();
                return currentdate < timedate;
              }
            }
          }
      },
      watch: {
        selectOption(newVal, oldVal) {
          let options = this.options
          for (let i = 0; i < options.length; i++) {
            // options里的id在newVal里，就显示，反之不显示
            //注意newVal里面的值的数据类型
            options[i].status = newVal.indexOf(options[i].id) !== -1;
          }
        }
      },
      methods:{
          check(){

          },

      }
    }
</script>

<style scoped>

</style>
