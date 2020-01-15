<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <!--<el-button size="small" class="add fr" type="primary" icon="el-icon-plus" @click="createTemp()">新建模板</el-button>-->
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->

    <el-table :data="list"  style="width: 99%" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="template_id" label="模板ID"></el-table-column>
      <el-table-column prop="title" label="模板名称"></el-table-column>
      <el-table-column prop="content" :width="716" label="短信内容"></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="userTemp(scope.row)">使用模板</el-button>
          <!--<el-button type="primary" size="small" @click="setUserService(scope.row.id)"></el-button>-->
        </template>
      </el-table-column>
    </el-table>
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
        total: 0
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
      userTemp(data){
        if (parseInt(this.type) === 5) {
          console.log(1)
          this.$emit('getActiveName',data)
        } else if (parseInt(this.type) === 6) {
          this.$router.push({path:'/marketingMessage',query:{activeName:'second',data:data}})
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
</style>
