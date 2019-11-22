<template>
  <div class="tcontent">
    <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->
    <div v-if="status">
      <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%">
        <!--<el-table-column type="selection"></el-table-column>-->
        <el-table-column prop="task_name" label="名称"></el-table-column>
        <el-table-column prop="task_content" show-overflow-tooltip label="内容"></el-table-column>
        <el-table-column prop="mobile_content" show-overflow-tooltip label="手机号"></el-table-column>
        <el-table-column prop="send_num" label="发送数量"></el-table-column>
        <el-table-column prop="source" label="来源" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="getTaskInfo(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination @pageChange="pageChange" :num='num' :total="total" :page-size="10" :page="page"></v-pagination>
    </div>
    <div v-else>
      <div class="tabs">
        <div class="back">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
          <el-button type="primary" size="mini" @click="shouqi">展开/收起</el-button>
        </div>
        <el-tabs class="eltabs" value="first" type="card">
          <el-tab-pane label="任务详细信息" name="first">
            <el-form class="form" label-width="250px">
              <el-form-item label="任务名称:"><span class="text">{{task.task_name}}</span></el-form-item>
              <!---->
              <el-form-item label="任务内容:"  ><span >{{task.task_content}}</span></el-form-item>
              <el-form-item label="任务编号:"><span>{{task.task_no}}</span></el-form-item>
              <el-form-item label="来源:"><span>{{task.source}}</span></el-form-item>
              <el-form-item label="发送状态:" v-if="task.send_status == 1"><span>待发送</span></el-form-item>
              <el-form-item label="发送状态:" v-if="task.send_status == 2"><span>发送中</span></el-form-item>
              <el-form-item label="发送状态:" v-if="task.send_status == 3"><span>已发送</span></el-form-item>
              <el-form-item label="发送数量:"><span>{{task.send_num}}</span></el-form-item>
              <el-form-item label="手机号:" :style="zan?'word-break:break-all':''"><span>{{task.mobile_content}}</span></el-form-item>
              <el-form-item label="审核状态:" v-if="task.free_trial == 1"><span>需要审核</span></el-form-item>
              <el-form-item label="审核状态:" v-if="task.free_trial == 2"><span>审核通过</span></el-form-item>
              <el-form-item label="审核状态:" v-if="task.free_trial == 3"><span>审核不通过</span></el-form-item>
              <el-form-item label="创建时间:"><span>{{task.create_time}}</span></el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import vPagination from '../../../component/pagination'

  export default {
    components: {
      vPagination
    },
    props: [],
    name: "taskList",
    data() {
      return {
        status:true,
        list: [],
        screen: {
          page: 1,
          pageNum: 10
        },
        page: 1,
        total: 0,
        multipleSelection: [],
        num: 1,
        task:{},
        zan:true
      }
    },
    mounted() {
      this.screen.page = parseInt(localStorage.getItem("task")) || 1
      this.page = this.screen.page
      this.getTaskList()
    },
    methods: {
      shouqi(){
        console.log(!this.zan)
        this.zan = !this.zan
      },
      back(){
        this.status = true
      },
      getTaskInfo(id) {
        this.status = false
        this.getTaskInfoDetail(id)
      },
      getTaskInfoDetail(id){
        let that = this
        that.$request({
          url: 'user/getUserSubmitTaskInfo',
          data: {id},
          success(res) {
            that.task = res.task
          }
        })
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("task", obj.page)
        this.getTaskList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('全部选中', val)
      },
      getTaskList() {
        let that = this
        let screen = that.screen
        that.$request({
          url: 'user/getUserSubmitTask',
          data: screen,
          success(res) {
            that.list = res.data
            that.total = res.total
          }
        })
      }
    }
  }
</script>

<style scoped>
.back{
  display: inline-block;
  float: right;
  position: relative;
  z-index: 2;
}
/*.el-form-item__content {*/
  /*word-break: break-all;*/
/*}*/
  #phone{
    display: inline-block;
    word-break: break-all
  }
</style>
