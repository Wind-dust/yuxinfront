<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">服务器白名单</h3>
          <div class="table">

            <el-form label-position="top" label-width="80px" :model="form">
              <el-form-item label="服务器白名单：" label-position="left">
                <el-switch v-model="switchState" active-text="开启" inactive-text="关闭"></el-switch>
              </el-form-item>
              <el-form-item label="添加服务器IP地址：">
                <el-input type="textarea" @blur="disIp" :rows="6" size="small" placeholder="一行一个IP地址" :disabled="disabled" style="width: 250px" v-model="form.ip"></el-input>
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
        name: "whiteList",
      data(){
          return{
            form:{
              ip:''
            },
            disabled:true,
            switchState:false
          }
      },
      watch:{
          switchState(val) {
            this.disabled = !val
          }
      },
      mounted() {
          this.$emit('getBread','服务器白名单')
      },
      methods:{
          disIp(){
            let phoneStr = this.form.ip
            phoneStr = phoneStr.trim()
            this.form.ip = phoneStr.replace(/\s+/g,",").replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').replace(/,{2,}/g, ',')
          }
      }
    }
</script>

<style scoped>

</style>
