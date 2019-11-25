<template>
  <div class="tcontent">
    <v-screen :screen="screenQuery" @query="onQuery"></v-screen>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="ID"></el-table-column>
      <el-table-column prop="nick_name" label="账号"></el-table-column>
      <el-table-column prop="company_name" label="企业名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="user_status" label="状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="product" label="产品" show-overflow-tooltip></el-table-column>
      <el-table-column prop="price" label="单价" show-overflow-tooltip></el-table-column>
      <el-table-column prop="balance_num" label="余量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="创建日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="deleted()">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        }]
      }
    },
    mounted() {
      this.emit()
    },
    methods: {
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

</style>
