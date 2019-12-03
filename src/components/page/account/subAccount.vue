<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">帐户列表</h3>
          <el-select size="small" v-model="user_status" placeholder="选择账户状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
          <el-select size="small" v-model="type" placeholder="选择结算方式">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
          <el-input size="small" style="width: 150px" v-model="name" placeholder="企业名称/账户名称"></el-input>
          <el-button size="mini" type="primary">查询</el-button>
          <el-button style="float: right" @click="createUser" type="primary" size="mini">创建子账户</el-button>
          <el-button style="float: right" @click="stopUse" type="primary" plain size="mini">批量停用</el-button>
          <el-button style="float: right" @click="startUse" type="primary" plain size="mini">批量启用</el-button>
          <div class="table">
            <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="date" label="用户名"></el-table-column>
              <el-table-column prop="name" label="企业名称"></el-table-column>
              <el-table-column prop="address" label="付费方式"></el-table-column>
              <el-table-column prop="address" label="状态"></el-table-column>
              <el-table-column prop="address" label="产品类型"></el-table-column>
              <el-table-column prop="address" label="单价"></el-table-column>
              <el-table-column prop="address" label="金额"></el-table-column>
              <el-table-column prop="address" label="余额"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "subAccount",
    data() {
      return {
        list: [],
        user_status: '',
        type: '',
        name: '',
        selected: []
      }
    },
    mounted() {
      this.emit()
    },
    methods: {
      emit(){
        this.$emit('getBread','账户列表')
      },
      createUser(){
        this.$router.push({path:'/createUser'})
      },
      handleSelectionChange(val) {
        this.selected = val
      },
      stopUse() {
        if (this.selected.length <= 0) {
          this.$message.error('至少选择一项')
          return
        }
        alert(123)
      },
      startUse() {
        if (this.selected.length <= 0) {
          this.$message.error('至少选择一项')
          return
        }
        alert(123)
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

  .table {
    margin-top: 20px;
  }
</style>
