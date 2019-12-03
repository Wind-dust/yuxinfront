<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">发送明细</h3>
          <!--根据当前账户服务显示-->
          <el-select size="small" v-model="product" placeholder="产品类型">
            <el-option label="营销短信" value="1"></el-option>
            <el-option label="行业短信" value="2"></el-option>
          </el-select>
          <el-input size="small" style="width: 150px" v-model="name" placeholder="企业名称/账户名称"></el-input>
          <el-button size="mini" type="primary" @click="check">查询</el-button>
          <div class="float-right">
            <el-button plain size="mini" type="primary">导出数据</el-button>
          </div>
          <div class="table">
            <el-table :data="list" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="address" label="账户名称"></el-table-column>
              <el-table-column prop="address" label="企业名称"></el-table-column>
              <el-table-column prop="address" label="账户余额（条）"></el-table-column>
              <el-table-column prop="address" label="今日发送（条）"></el-table-column>
              <el-table-column prop="address" label="累计发送（元）"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "sendlog",
    data() {
      return {
        product: '',
        list: [],
        name: '',
      }
    },
    mounted() {
      this.$emit('getBread', '发送明细')
    },
    methods: {
      check() {

      }
    }
  }
</script>

<style scoped>

</style>
