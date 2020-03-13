<template>
  <div class="tcontent">
    <el-select size="small" v-model="status" placeholder="状态">
      <el-option label="全部" value=""></el-option>
      <el-option label="审核中" value="1"></el-option>
      <el-option label="通过" value="2"></el-option>
      <el-option label="拒绝" value="3"></el-option>
    </el-select>
    <el-input size="small" style="width: 150px" v-model="name" placeholder="模板ID/名称/标题"></el-input>
    <el-button size="mini" type="primary" @click="check">查询</el-button>
    <div class="float-right" style="float: right">
      <!--<el-button plain size="mini" type="primary" @click="createMms">新建模板</el-button>-->
    </div>
    <el-table :data="list"  style="width: 99%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="模板名称"></el-table-column>
      <el-table-column prop="type" label="缩略图"></el-table-column>
      <el-table-column prop="type" label="彩信标题"></el-table-column>
      <el-table-column prop="mobile" label="	创建时间"></el-table-column>
      <el-table-column prop="email" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="small" @click="setUserInfo(scope.row.id)"></el-button>-->
          <!--<el-button type="primary" size="small" @click="setUserService(scope.row.id)"></el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :layout="total ? layout : ''" :total="total" background></el-pagination>
  </div>
</template>

<script>
  export default {
    name: "videoTemplate",
    data(){
      return{
        list:[],
        total:0,
        page:1,
        status:'',
        name:''
      }
    },
    mounted() {

    },
    methods:{
      check(){

      },
      createMms(){
        this.$router.push({path:'/createMms'})
      }
    }
  }
</script>

<style scoped>

</style>
