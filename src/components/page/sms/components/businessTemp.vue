<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <!--<el-button size="medium" class="add fr" type="primary" icon="el-icon-plus" @click="showCard()">新建模板</el-button>-->
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->

    <el-table :data="list"  style="width: 99%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="模板名称"></el-table-column>
      <el-table-column prop="type" :show-overflow-tooltip="true" label="短信内容">
      </el-table-column>
      <el-table-column prop="mobile" label="	创建时间"></el-table-column>
      <el-table-column prop="email" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="small" @click="setUserInfo(scope.row.id)"></el-button>-->
          <!--<el-button type="primary" size="small" @click="setUserService(scope.row.id)"></el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page="page"></v-pagination>

    <v-card :name='name' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
            @sumbit="sumbit" @hideCard="hideCard" :is_hiden="true"></v-card>

  </div>
</template>

<script>
  // import vScreen from '../../component/screen'
  import vPagination from '../../../component/pagination'
  import vCard from '../../../component/card'

  export default {
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
          pagenum: 10
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
      this.screen.page = parseInt(localStorage.getItem("supplier")) || 1
      this.page = this.screen.page
    },
    methods: {
      showCard() {
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        console.log(data)
        parseInt(data.ruleForm.type) === 1 ? this.setUser(data.ruleForm) : this.setAccount(data.ruleForm)
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
