<template>
    <div class="margin-top">
      <el-row>
        <el-col :span="24">
          <div class="box-card box-shadow">
            <h3 @click="back" class="title"><i class="el-icon-arrow-left"></i>返回账户列表</h3>
            <el-tabs v-model="activeName">
              <el-tab-pane label="账户信息" name="first">
                <v-account-info @back="back"></v-account-info>
              </el-tab-pane>
              <el-tab-pane label="短信价格" name="second">
                <v-set-service></v-set-service>
              </el-tab-pane>
            </el-tabs>

          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import vAccountInfo from './component/accountInfo'
  import vSetService from './component/setService'
    export default {
        name: "createUser",
      components:{
          vAccountInfo,
        vSetService
      },
      data(){
          return{
            activeName:'first'
          }
      },
      mounted() {
          this.emit()
      },
      methods:{
          emit(){
            this.$emit('getBread','创建子账户')
          },
          back(){
            this.$router.go(-1)
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
    font-weight: 400;
    display: inline-block;
  }
  .title:hover{
    color: #1889ff;
  }

  /*.title::before {*/
    /*content: '';*/
    /*width: 3px;*/
    /*height: 15px;*/
    /*background: #1889ff;*/
    /*position: absolute;*/
    /*top: 4px;*/
    /*left: -10px;*/
  /*}*/

</style>
