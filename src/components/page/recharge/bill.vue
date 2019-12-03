<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">客户账单</h3>
          <el-tabs v-model="activeName">
            <el-tab-pane label="账单记录" name="first">
              <v-bill-log></v-bill-log>
            </el-tab-pane>
            <el-tab-pane label="账单详情" name="second">
              <v-bill-detail></v-bill-detail>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vBillLog from './components/billlog'
  import vBillDetail from './components/billDetail'

  export default {
    name: "bill",
    components: {
      vBillLog,
      vBillDetail
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    mounted() {
      this.emit()
    },
    methods: {
      emit() {
        this.$emit('getBread', '客户账单')
      }
    }
  }
</script>

<style scoped>

</style>
