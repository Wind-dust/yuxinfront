<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">数据推送</h3>
          <div class="table">
            <el-switch
              v-model="switchState"
              active-text="开启"
              inactive-text="关闭">
            </el-switch>
            <el-form label-position="top" label-width="80px" :model="form">
              <el-form-item label="下行短信状态报告推送地址（URL）：">
                <el-input size="small" :disabled="disabled" style="width: 250px" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="上行短信状态报告推送地址（URL）：">
                <el-input size="small" :disabled="disabled" style="width: 250px" v-model="form.region"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" :disabled="disabled" type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "systemConfig",
    data() {
      return {
        form: {},
        switchState:false,
        disabled:true
      }
    },
    watch:{
      switchState(newVal,oldVal){
        console.log(newVal)
        this.disabled = !newVal
      }
    },
    mounted() {
      this.$emit('getBread','数据推送')
    }
  }
</script>

<style scoped>
.box-card{
  font-size: 12px!important;

}
.table{
  margin-top: 36px;
}
  .el-form-item__label{s
    line-height: 0!important;
  }
</style>
