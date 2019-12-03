<template>
  <div class="tcontent">
    <div class="margin">
    <el-input style="width:180px" size="small" placeholder="请输入手机号"></el-input>
    <el-button size="mini" type="primary">查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column type="index" label="ID"></el-table-column>
      <el-table-column prop="phone" label="号码"></el-table-column>
      <el-table-column prop="source" label="来源" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="添加时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="deleted()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import vScreen from '../../../component/screen'

  export default {
    name: "black-list",
    components: {
      vScreen
    },
    data() {
      return {
        screenQuery: [{
          ref: 'phone',
          placeholder: '输入手机号搜索',
          type: 'input',
        }],
        list:[],
        multipleSelection:[]
      }
    },
    methods: {
      onQuery() {

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('全部选中',val)
      },
      deleted(){
        this.list = []
      }
    }
  }
</script>

<style scoped>

</style>
