<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">充值记录</h3>
          <el-tabs v-model="activeName">
            <el-tab-pane label="管理商充值记录" name="first">
              <v-log @ckeck="getlog"></v-log>
            </el-tab-pane>
            <el-tab-pane label="客户充值记录" name="second">
              <v-son-log @search="getsonlog"></v-son-log>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vLog from './components/vLog'
  import vSonLog from './components/vSonLog'
  export default {
    components:{
      vLog,
      vSonLog
    },
    name: "rechargelog",
    data(){
      return {
        activeName:'first'
      }
    },
    mounted() {
      this.emit()
    },
    methods:{
      emit(){
        this.$emit('getBread','充值记录')
      },
      getlog(){

      },
      getsonlog(){

      }
    }
  }
</script>

<style scoped>

</style>
