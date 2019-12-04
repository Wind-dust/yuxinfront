<template>
  <div class="tcontent">
    <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">账户列表</h3>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="ID"></el-table-column>
      <el-table-column prop="nick_name" label="账号名称"></el-table-column>
      <!--<el-table-column prop="company_name" label="企业名称" show-overflow-tooltip></el-table-column>-->
      <el-table-column prop="_user_status" label="账户状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="_reservation_service" label="是否可预用服务" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="price" label="单价" show-overflow-tooltip></el-table-column>-->
      <!--<el-table-column prop="balance_num" label="余量" show-overflow-tooltip></el-table-column>-->
      <el-table-column prop="create_time" label="创建日期" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="address" label="操作" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<el-button size="small" type="danger" @click="deleted()">编辑</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vScreen from '../../component/screen'

  export default {
    components: {
      vScreen
    },
    name: "accountList",
    data() {
      return {
        list: [],
        screenQuery: [{
          placeholder: '状态',
          ref: 'user_status',
          type: 'select',
          option: [{label: '启用', value: 1}, {label: '停用', value: 2}]
        }, {
          placeholder: '企业名称/账户名称',
          ref: 'company_name',
          type: 'input'
        }],
        screen: {
          page: 1,
          pageNum: 10
        }
      }
    },
    mounted() {
      this.emit()
      this.getAccountList()
    },
    methods: {
      getAccountList() {
        let that = this
        that.$request({
          url: 'user/getUserSonAccount',
          data: that.screen,
          success(res) {
            that.list = that.disAccount(res.result)
          }
        })
      },
      disAccount(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].user_status == 1){
            data[i]._user_status = '停用'
          }  else if (data[i].user_status == 2){
            data[i]._user_status = '启用'
          }
          if (data[i].reservation_service == 1){
            data[i]._reservation_service = '否'
          } else if (data[i].reservation_service == 2){
            data[i]._reservation_service = '是'
          }
        }
        return data
      },
      emit() {
        this.$emit('getBread', '子账户列表')
      },
      onQuery() {

      },
      handleSelectionChange() {

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
</style>
