<template>
  <div class="tcontent">
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->
          <div v-if="status">
            <h3 class="title">任务列表</h3>
            <el-select style="width: 150px" size="small" v-model="type" placeholder="请选择产品" @change="query(type)">
              <el-option v-for="(v,k) in service" :key="k" :label="v.business_name" :value="v.business_id"></el-option>
            </el-select>
            <!--<el-button size="mini" type="primary" @click="query(type)">查询</el-button>-->
            <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" border>
              <!--<el-table-column type="selection"></el-table-column>-->
              <el-table-column prop="task_name" show-overflow-tooltip label="名称" v-if="type == 5"></el-table-column>
              <el-table-column :label="type == 8?'标题':'内容'" :width="716" >
                <template slot-scope="scope">
                  <span v-if="type == 8">{{scope.row.title}} <el-button type="text"
                                                                        @click="preview(scope.row.multimedia_frame,scope.row.title)">查看内容</el-button></span>
                  <span v-else >{{scope.row.task_content}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="send_num" label="发送数量"></el-table-column>
              <!--<el-table-column prop="source" label="来源" show-overflow-tooltip></el-table-column>-->
              <el-table-column prop="create_time" label="提交时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="address" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="getTaskInfo(scope.row.id)">明细查询</el-button>
                </template>
              </el-table-column>
            </el-table>
            <v-pagination @pageChange="pageChange" :num='num' :total="total" :page-size="10"
                          :page="page"></v-pagination>
          </div>
          <div v-else>
            <h3 class="title">明细查询</h3>
            <el-button size="small" type="primary" @click="back">返回</el-button>
            <div class="tabs">
              <el-table ref="multipleTable" :data="task_log" tooltip-effect="dark" style="width: 100%">
                <!--<el-table-column type="selection"></el-table-column>-->
                <!--<el-table-colum type="index"></el-table-colum>-->
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <!--<el-table-column prop="task_content" show-overflow-tooltip label="短信内容"></el-table-column>-->
                <!--<el-table-column prop="send_num" label="条数"></el-table-column>-->
                <el-table-column prop="create_time" label="发送时间" show-overflow-tooltip></el-table-column>
                <!--<el-table-column prop="create_time" label="回执时间" show-overflow-tooltip></el-table-column>-->
                <el-table-column prop="_send_status" label="发送状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="explanation" label="回执状态" show-overflow-tooltip></el-table-column>
              </el-table>
              <v-pagination @pageChange="pageChangeDetail" :num='detailNum' :total="detailTotal" :page-size="10"
                            :page="detailPage"></v-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="详细内容" :visible.sync="dialogVisible" width="30%">
      <p style="color: #848a9f;font-weight: bold;margin-bottom: 20px">{{title}}</p>
      <div v-for="v,k in content">
        <img style="object-fit: cover;max-width: 80%;" :src="v.image_path" alt="">
        <p style="margin: 10px 0;max-width: 80%;">{{v.content}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
  import vPagination from '../../component/pagination'

  export default {
    components: {
      vPagination
    },
    props: [],
    name: "taskList",
    data() {
      return {
        status: true,
        list: [],
        content:[],
        screen: {
          page: 1,
          pageNum: 10
        },
        codeScreen: {
          page: 1,
          pageNum: 10
        },
        page: 1,
        total: 0,
        multipleSelection: [],
        num: 1,
        task: {},
        zan: true,
        task_log: [],
        detailNum: 1,
        detailTotal: 20,
        detailPage: 1,
        detailScreen: {
          page: 1,
          pageNum: 10
        },
        service: [],
        type: '',
        dialogVisible:false,
        title:''
      }
    },
    mounted() {
      // this.screen.page = parseInt(localStorage.getItem("task")) || 1
      // this.detailScreen.page = parseInt(localStorage.getItem("task_log")) || 1
      this.page = this.screen.page
      this.detailPage = this.detailScreen.page
      this.emit()
      this.getService()
    },
    methods: {
      preview(data,title) {
        console.log(data)
        this.content = data
        this.title = title
        this.dialogVisible = true
      },
      query(type) {
        this.screen.page = 1
        this.screen.pageNum = 10
        this.num = 1
        this.total = 0
        this.page = 1
        this.list = []
        console.log(this.type)
        if (this.type == 5) {
          this.getTaskList()
        } else if (this.type == 6) {
          this.getCodeTask()
        } else if (this.type == 8) {
          this.getMmsTask()
        }
      },
      getMmsTask() {
        let that = this
        let screen = that.screen
        that.$request({
          url: 'user/getUserMultimediaMessageTask',
          data: screen,
          success(res) {
            that.list = res.message_data
            that.total = res.total
          }
        })
      },
      getCodeTask() {
        let that = this
        let screen = that.screen
        that.$request({
          url: 'user/getUserBusinessSubmitTask',
          data: screen,
          success(res) {
            that.list = res.data
            that.total = res.total
          }
        })
      },
      getService() {
        let that = this
        that.$request({
          url: 'user/getUserEquitises',
          success(res) {
            // that.disService(res.userEquities)
            that.service = res.userEquities
            that.type = res.userEquities[0].business_id
            that.query(res.userEquities[0].business_id)
          }
        })
      },
      disService(data) {
        for (let i = 0; i < data.length; i++) {
          this.ruleType.business_id.option.push({
            value: data[i].business_id,
            label: data[i].business_name
          })
        }
      },
      emit() {
        this.$emit('getBread', '明细查询')
      },
      shouqi() {
        console.log(!this.zan)
        this.zan = !this.zan
      },
      back() {
        this.status = true
      },
      getTaskInfo(id) {
        this.id = id
        this.status = false
        this.task_log = []
        this.detailTotal = 0
        this.detailScreen.pageNum = 10
        this.detailScreen.page = 1
        if (this.type == 5) {
          this.getTaskInfoDetail(id)
        } else if (this.type == 6) {
          this.getCodeTaskDetail(id)
        } else if (this.type == 8){
          this.getMmsTasDetailk(id)
        }
      },
      getMmsTasDetailk(id){
        let that = this
        that.$request({
          url:'user/getUserMultimediaMessageTaskInfo',
          data:{id:id,pageNum: that.detailScreen.pageNum, page: that.detailScreen.page},
          success(res){
            that.task_log = that.disinfo(res.task_log)
            that.detailTotal = res.total
          }
        })
      },
      getCodeTaskDetail(id) {
        let that = this
        that.$request({
          url: 'user/getUserBusinessSubmitTaskInfo',
          data: {id: id, pageNum: that.detailScreen.pageNum, page: that.detailScreen.page},
          success(res) {
            that.task_log = that.disinfo(res.task_log)
            that.detailTotal = res.total
          }
        })
      },
      getTaskInfoDetail(id) {
        let that = this
        that.$request({
          url: 'user/getUserSubmitTaskInfo',
          data: {id: id, pageNum: that.detailScreen.pageNum, page: that.detailScreen.page},
          success(res) {
            that.task_log = that.disinfo(res.task_log)
            that.detailTotal = res.total
          }
        })
      },
      disinfo(data) {
        console.log(data)
        let _send_status = ''
        for (let i = 0; i < data.length; i++) {
          if (data[i].send_status == 1) {
            data[i]._send_status = '待发送'
          } else if (data[i].send_status == 2) {
            data[i]._send_status = '已完成'
          } else if (data[i].send_status == 3) {
            data[i]._send_status = '成功'
          } else if (data[i].send_status == 4) {
            data[i]._send_status = '失败'
          }
        }
        return data
      },
      pageChange(obj) {
        this.screen.page = obj.page
        if (this.type === 5) {
          this.getTaskList()
        } else if (this.type === 6) {
          this.getCodeTask()
        } else if (this.type === 8){
          this.getMmsTask()
        }

      },
      pageChangeDetail(obj) {
        this.detailScreen.page = obj.page
        localStorage.setItem("task_log", obj.page)
        this.getTaskInfoDetail(this.id)
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

  .back {
    display: inline-block;
    float: right;
    position: relative;
    z-index: 2;
  }

  /*.el-form-item__content {*/
  /*word-break: break-all;*/
  /*}*/
  #phone {
    display: inline-block;
    word-break: break-all
  }

</style>
