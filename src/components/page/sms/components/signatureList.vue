<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-button size="small" class="add fr" type="primary" icon="el-icon-plus" @click="createTemp()">新建签名</el-button>
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery"></v-screen>-->

    <el-table :data="list" style="width: 99%" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="signature_id" label="签名ID"></el-table-column>
      <el-table-column prop="title" label="签名内容"></el-table-column>
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
    props: ['type', 'list'],
    data() {
      return {
        screen: {
          page: 1,
          pageNum: 30
        },
        total: 0
      }
    },
    mounted() {
      console.log(this.list)
    },
    methods: {
      createTemp() {
          this.$router.push({path:'/signature',query:{type:this.type}})
      },
      getList() {
        let that = this
        that.$request({
          url: 'user/getUserSignature',
          data: {
            page: that.screen.page,
            pageNum: that.screen.pageNum,
            business_id: that.type
          },
          success(res) {
            that.total = res.total
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
