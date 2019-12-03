<template>
  <div class="mt">
    <div class="hint">设置完成后，我们会在您的账户余额低于您设置的余额时，免费向您发送短信提醒，提醒为1天/次，最多提醒3次。</div>
    <el-form label-position="right" label-width="100px" style="width:40%;" :model="form">
      <el-form-item prop="balance" label="余额（条）" >
        <el-input placeholder="请输入设置余额" v-model="form.balance"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="提醒手机" >
        <el-input @blur="disPhone" placeholder="多个号码换行输入，最多十条" type="textarea" :rows="4" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "setBalance",
      data(){
          return{
            form:{mobile:'',balance:''}
          }
      },
      methods:{
        disPhone(){
          // console.log(this.ruleForm.phone)
          let phoneStr = this.form.mobile
          let str = phoneStr.replace(/\s+/g,",").replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').replace(/,{2,}/g, ',')
          this.form.mobile = str
        },
      }
    }
</script>

<style scoped>
  .hint{
    width: 100%;
    padding: 8px 48px 8px 16px;
    font-size: 12px;
    border: 1px solid #abdcff;
    background-color: #f0faff;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 15px 0 20px 0;
  }
</style>
