<template>
  <div>
    <el-date-picker style="width:240px" size="small" v-model="date" type="daterange" range-separator="--"
                    start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <el-select size="small" v-model="product" placeholder="产品类型">
      <el-option label="营销短信" value="1"></el-option>
      <el-option label="行业短信" value="2"></el-option>
    </el-select>
    <el-input size="small" style="width: 150px" v-model="name" placeholder="企业名称/账户名称"></el-input>
    <el-button size="mini" type="primary" @click="search">查询</el-button>
    <div class="float-right">
      <el-select size="small" multiple style="width: 150px"  placeholder="显示更多" v-model="selectOption">
        <el-option label="单价" :value="1"></el-option>
        <el-option label="金额" :value="2"></el-option>
      </el-select>
    </div>
    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column pro="" label="账户名称"></el-table-column>
        <el-table-column pro="" label="企业名称"></el-table-column>
        <el-table-column pro="" label="充值方式"></el-table-column>
        <el-table-column prop="address" label="产品类型"></el-table-column>
        <el-table-column  v-for="(v,k) in options" :key="k" prop="" :label="v.title" v-if="v.status"></el-table-column>
        <el-table-column prop="address" label="条数"></el-table-column>
        <el-table-column prop="address" label="余额"></el-table-column>
        <el-table-column prop="address" label="充值时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vSonLog",
    data() {
      return {
        list: [],
        name:'',
        date:'',
        product:'',
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
    methods: {
      search() {
        let json = {}
        this.$emit('search', json)
      }
    }
  }
</script>

<style scoped>
  .float-right {
    float: right;
  }
</style>
