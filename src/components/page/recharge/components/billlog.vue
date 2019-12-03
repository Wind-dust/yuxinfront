<template>
  <div>
    <el-date-picker v-model="month" size="small" type="month" placeholder="选择月">
    </el-date-picker>
    <!--<el-select size="small" v-model="product" placeholder="产品类型">-->
    <!--<el-option label="营销短信" value="1"></el-option>-->
    <!--<el-option label="行业短信" value="2"></el-option>-->
    <!--</el-select>-->
    <el-input size="small" style="width: 150px" v-model="name" placeholder="企业名称/账户名称"></el-input>
    <el-button size="mini" type="primary" @click="check">查询</el-button>
    <div class="float-right">
      <el-button plain size="mini" type="primary">导出数据</el-button>
    </div>
    <div class="float-right">
      <el-select size="small" multiple style="width: 150px" placeholder="显示更多" v-model="selectOption">
        <el-option label="单价" :value="1"></el-option>
        <el-option label="金额" :value="2"></el-option>
      </el-select>
    </div>
    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="address" label="用户名"></el-table-column>
        <el-table-column prop="address" label="企业名称"></el-table-column>
        <el-table-column prop="address" label="发送量"></el-table-column>
        <el-table-column prop="address" label="计费发送量"></el-table-column>
        <el-table-column v-for="(v,k) in options" prop="" :key="k" :label="v.title" v-if="v.status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "billlog",
    data() {
      return {
        month: '',
        name: '',
        product: '',
        date: '',
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
        }]
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
    mounted() {

    },
    methods: {
      check() {

      }
    }
  }
</script>

<style scoped>

</style>
