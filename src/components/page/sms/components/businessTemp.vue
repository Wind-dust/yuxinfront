<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-button size="small" class="add fr" type="primary" icon="el-icon-plus" @click="createTemp()">新建模板</el-button>
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->

    <el-table :data="list"  style="width: 99%" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="template_id" label="模板ID"></el-table-column>
      <el-table-column prop="title" label="模板名称"></el-table-column>
      <el-table-column prop="content" :width="716" label="短信内容"></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="userTemp(scope.row)">使用</el-button>
          <el-button type="text" size="small" @click="review(scope.row)">预览</el-button>
          <!--<el-button type="primary" size="small" @click="setUserService(scope.row.id)"></el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="30%">
      <div class="preview">
        <div class="inner">
          <div class="sms-text" >
            <pre>{{content}}</pre>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page="page"></v-pagination>
  </div>
</template>

<script>
  // import vScreen from '../../component/screen'
  import vPagination from '../../../component/pagination'
  import vCard from '../../../component/card'

  export default {
    props:['type'],
    data() {
      return {
        num: 1,
        name: '',
        cardStatus: false,
        ruleForm: {},
        rules: [],
        ruleType: {},
        screen: {
          page: 1,
          pageNum: 10
        },
        page: 1,
        screenQuery: [{
          ref: 'mobile',
          label: '手机号',
          placeholder: '请输入手机号',
          type: 'input',
        }],
        list: [],
        total: 0,
        dialogVisible:false,
        content:''
      }
    },
    components: {
      vPagination,
      vCard
    },
    mounted() {
      this.getTempList()
    },
    methods: {
      review(data){
        console.log(data)
        this.content = data.content
        this.dialogVisible = true

      },
      userTemp(data){
        if (parseInt(this.type) === 5) {
          console.log(1)
          this.$emit('getActiveName',data)
        } else if (parseInt(this.type) === 6) {
          // this.$router.push({path:'/marketingMessage',query:{activeName:'second',data:data}})
          this.$emit('getActiveName',data)
        }

      },
      getTempList(){
        let that = this
        that.$request({
          url:'user/getUserModel',
          data:{
            business_id: that.type,
            page:that.screen.page,
            pageNum:that.screen.pageNum
          },
          success(e){
            that.list = e.result
            that.total = e.total
          }
        })
      },
      createTemp() {
        this.$router.push({path:'/sms/template',query:{type:this.type}})
      },
      setUser(data) {
        let that = this
        that.$request(
          {
            url: 'user/seetingUser',
            data: data,
            form: 3,
            success(res) {
              that.cardStatus = false
              that.getUser()
              that.ruleForm = {}
              that.ruleType = {}
            }
          }
        )
      },
      setAccount(data) {
        let that = this
        that.$request({
          url: 'user/seetingUserEquities',
          data: data,
          form: 3,
          success(res) {
            that.cardStatus = false
            that.getUser()
            that.ruleType = {}
            that.ruleForm = {}
          }
        })
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        this.num++
      },
      extend(target, options) {
        for (name in options) {
          target[name] = options[name];
        }
        return target;
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("supplier", obj.page)
      }
    }
  }
</script>

<style scoped>
  .preview {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-size: 300px 615px;
    background-repeat: no-repeat;
    height: 615px;
    width: 300px;
    /*background-position-x: 150px;*/
  }

  .inner {
    width: 100%;
    margin: 0px 20px 0 30px;
    padding-top: 100px;
  }

  .sms-text {
    margin-bottom: 5px;
    background: #e5e4e9;
    border-radius: 16px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    padding: 15px;
    width: 200px;
    min-height: 10px;
    word-break: break-all;
  }
</style>
