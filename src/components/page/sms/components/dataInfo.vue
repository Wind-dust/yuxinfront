<template>
  <el-row>
    <el-col :span="24">
      <div class="box-card box-shadow">
        <div class="data-info">
            <div class="head">发送数据</div>
          <div class="third">
            <div class="o-info">
              <div>
                <p>今日发送数（条）</p>
                <p>200009</p>
              </div>
            </div>
            <div class="o-info">
              <div>
                <p>本周发送数（条）</p>
                <p>200009</p>
              </div>
            </div>
            <div class="o-info">
              <div>
                <p>本月发送数（条）</p>
                <p>200009</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "dataInfo",
      data(){
          return{

          }
      },
    }
</script>

<style scoped>
  .data-info{
    padding: 20px 20px 60px;
  }
  .box-card{
    background: #ffffff;
    border-radius: 4px;
    padding: 20px;
  }
  .head{
    font-size: 16px;
    height: 40px;
    border-bottom: 1px solid #efefef;
  }
  .third{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .o-info{
    width: 33%;
  }
  .o-info > div{
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
  }
  .o-info > div p:nth-of-type(2){
    margin-top: 20px;
    font-size: 20px;
  }
</style>
