<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-button size="small" class="add fr" type="primary" icon="el-icon-plus" @click="createTemp()">新建签名</el-button>
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->

    <el-table :data="list" style="width: 99%" border>
      <el-table-column type="index" label="序号" :width="120"></el-table-column>
      <el-table-column prop="signature_id" label="签名ID"></el-table-column>
      <el-table-column prop="title" label="签名内容"></el-table-column>
      <el-table-column prop="_audit_status" label="审核状态"></el-table-column>
      <!--<el-table-column fixed="right" label="操作" >-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="text" size="small" @click="userTemp(scope.row)">编辑</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: "signatureList",
    props: ['type', 'list', 'total'],
    data() {
      return {
        screen: {
          page: 1,
          pageNum: 30
        }
      }
    },
    mounted() {
      this.disStatus()
    },
    methods: {
      createTemp() {
        this.$router.push({path: '/signature', query: {type: this.type}})
      },
      disStatus() {
        let that = this
        let data = this.list
        for (let i = 0; i < data.length; i++) {
          switch (parseInt(data[i].audit_status)) {
            case 1:
              data[i]._audit_status = '待审核';
              break;
            case 2:
              data[i]._audit_status = '通过';
              break;
            case 3:
              data[i]._audit_status = '不通过'
          }
        }
        this.list = data
      }
    }
  }
</script>

<style scoped>

</style>
