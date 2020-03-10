<template>
  <div class="tcontent">
    <div class="info">
      <div class="info-l">
        <img width="60" src="http://imagesdev.shyuxi.com/me.png" alt="">
        <div class="info-text">
          <p>{{name}}</p>
          <p>{{content}}</p>
          <p>当前余额（条）：{{messageNum}}</p>
        </div>
      </div>
      <div class="line" v-show="test"></div>
      <div class="info-l" v-show="test">
        <div class="info-text">
          <p>短信测试</p>
          <p class="in-bu">
            <el-input v-model="phone" placeholder="请输入手机号"></el-input>
            <el-button size="medium" type="primary">发送短信</el-button>
          </p>
          <p>输入手机号码，获得测试短信</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['name', 'content', 'type','messageNum','test'],
    name: "productTemp",
    data() {
      return {
        phone: ''
      }
    },
    mounted() {
    },
    watch: {
      'type'(newVal, oldVal) {
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .info {
    padding: 45px 35px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .info-l {
    display: flex;
    align-items: flex-start;
    width: 49%;
  }

  .info-text {
    display: inline-block;
    margin-left: 15px;
  }

  .info-text p {
    margin-bottom: 15px;
  }

  .info-text p:first-child {
    font-size: 14px;
  }

  .info-text p:nth-of-type(2) {
    margin-bottom: 20px;
  }

  .line {
    height: 146px;
    width: 1px;
    background: #efefef;
  }

  .in-bu {
    display: flex;
    align-items: center;
  }

  .el-button {
    margin-left: 10px;
  }
</style>
