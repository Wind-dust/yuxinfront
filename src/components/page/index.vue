<template>
  <div>
    <!--<div class="el-row screen">-->
    <!--<div class="left box-shadow border-radius el-col-17"></div>-->
    <!--<div class="right box-shadow border-radius el-col-7"></div>-->
    <!--</div>-->
    <el-row class="screen" :gutter="20">
      <el-col :span="16">
        <div class="box-shadow border-radius left">
          <div class="left-title">账户中心</div>
          <div class="left-info">
            <div class="account-info">
              <img class="avatar" src="../../assets/imgs/logoicon.png" alt="">
              <p class="name">Hello! &nbsp;&nbsp;<span>{{name}}</span></p>
              <p class="name">用户等级：0</p>
            </div>
            <div class="account-type">
              <p>账户类型：{{userInfo._user_type}}</p>
            </div>
            <div class="account-type">
              <p>账户状态：{{userInfo._user_status}}</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="box-shadow border-radius right">
          <div class="left-title">账户信息</div>
          <div class="left-info">
            <div class="account-type">
              <p>我的余额：{{userInfo.money}}</p>
            </div>
            <div class="account-type">
              <p>我的服务：{{userInfo.reservation_service}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        userInfo: {}
      }
    },
    components: {},
    computed: {},
    mounted() {
      this.getuserInfo()
      this.$globalData.bread = '控制台'
      document.title = '管理中心|控制台'
    },
    methods: {
      getuserInfo() {
        let that = this;
        that.$request({
          url: 'user/getuser',
          success: function (res) {
            let user = that.disUserInfo(res.data)
            that.$globalData.userInfo = user || {};
            that.userInfo = user
            that.name = res.data.nick_name
          },
          complete: function (res) {
            if (res.code == 5000) {
              that.$router.push({path: '/login'})
            }
          }
        })
      },
      disUserInfo(data) {
        switch (parseInt(data.user_type)) {
          case 1:
            data._user_type = '个人账户';
            break;
          case 2:
            data._user_type = '企业账户';
            break;
        }
        switch (parseInt(data.user_status)) {
          case 1:
            data._user_status = '停用';
            break;
          case 2:
            data._user_status = '启用';
            break;
        }
        return data
      }
    }
  }
</script>

<style scoped>
  .navigation {
    width: 100%;
    height: 60px;
    background: white;
    /*box-shadow: 5px 5px 5px rgba(0,0,0,.5);*/
    line-height: 60px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .screen {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .screen .left {
    background: #ffffff;
    height: 230px;
    padding: 10px;
    box-sizing: border-box;
  }

  .screen .right {
    background: white;
    height: 230px;
  }

  .left-title {
    font-size: 16px;
    padding-left: 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
  }

  .left-info {
    padding: 0 20px 10px 20px;
    min-height: 180px;
  }

  .account-info {
    width: 100%;
    height: 60px;
    background: #f5f5f6;
    border-radius: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 55px;
    height: 55px;
  }

  .name {
    font-size: 16px;
    margin-left: 30px;
  }

  .name span {
    color: #60bff3;
  }

  .account-type {
    font-size: 14px;
    margin-top: 20px;
  }
</style>
