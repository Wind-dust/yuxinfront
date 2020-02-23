<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <el-menu-item index="index">
        <span class="sb-cn"><i class="icon el-icon-s-home"></i>控制台</span>
      </el-menu-item>
      <el-submenu v-for="(v,k) in menuList" :key="k" :index="k+''">
        <template slot="title">
          <span class="sb-cn"><i :class="v.icon" class="icon"></i>{{v.name}}</span>
        </template>
        <el-menu-item class="bc" v-for="(v1,k1) in v._child" :key="k1" :hidden="v1.status" :index="'/'+v1.link">
          {{v1.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item>
        <router-link to="/message">
          <span class="sb-cn"><i class="icon el-icon-chat-dot-square"></i>系统消息</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuList: [
          {
            name: '账户管理',
            icon: 'el-icon-s-custom',
            _child: [
              {
                name: '我的服务',
                link: 'myService',
                status: false
              }, {
                name: '账户资质',
                link: 'qualification',
                status: false
              }, ]
          },
          {
            name: '产品中心',
            icon: 'el-icon-s-grid',
            _child: [{
              name: '营销短信',
              link: 'businessMessage',
              status: false
            }, {
              name: '行业短信',
              link: 'marketingMessage',
              status: false
            },{
              name:'图文彩信',
              link:'mms',
              status: false
            }]
          },
          // {
          //   name:'充值服务',
          //   _child:[{
          //     name:'充值记录',
          //     link:'settlement',
          //     status:false
          //   }]
          // },
          {
            name: '报表中心',
            icon: 'el-icon-document',
            _child: [
              //   {
              //   name: '数据总览',
              //   link: 'dataInfo',
              //   status: false
              // }, {
              //   name: "明细查询",
              //   link: 'dataDetail',
              //   status: false
              // }, {
              //   name: '模板查询',
              //   link: 'templateDetail',
              //   status: false
              // }
              {
                name: '明细查询',
                link: 'sendDetail',
                status: false
              }
            ]
          }, {
            name: '通讯录',
            icon: 'el-icon-notebook-1',
            _child: [{
              name: '通讯录列表',
              link: 'addressList',
              status: false
            }]
          }
        ],
        user: {}
      }
    },
    mounted() {
      this.getuserInfo()
    },
    methods: {
      getuserInfo() {
        let that = this;
        that.$request({
          url: 'user/getuser',
          success: function (res) {
            that.$globalData.userInfo = res.data || {};
            that.user = res.data || {}
            console.log(res.data.pid)
            that.disBar(res.data)
          }
        })
      },
      disBar(user) {
        let data = this.menuList
        console.log(user.pid)
        // for (let i = 0; i < data.length; i++) {
        if (parseInt(user.user_type) === 2) {
          data[0]._child.push({
            name: '开通子账户',
            link: 'account',
            status: false
          })
          data[0]._child.push({
            name: '子账户设置',
            link: 'subAccount',
            status: false
          })
          data[0]._child.push({
            name: '子账户列表',
            link: 'accountList',
            status: false
          })
          data[0]._child.push(
            {
              name: '完善信息',
              link: 'license',
              status: false
            }
          )
          // }
          // for (let j = 0; j < data[i]._child.length; j++) {
          //   if (user.pid != '0' && data[i]._child[j].link == 'account') {
          //     data[i]._child[j].status = true
          //   }
          //   if (user.pid != 0 && data[i]._child[j].link == 'subAccount') {
          //     data[i]._child[j].status = true
          //   }
          // }
        }
      }
    },
    computed: {
      onRoutes() {
        return '/' + this.$route.path.split('/')[1];
      }
    }
  }
</script>
<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 200px;
    left: 0;
    top: 0px;
    z-index: 9999;
    bottom: 0;
    overflow: auto;
    background: #17174a;
  }

  .sidebar > ul {
    /*height: 100%;*/
    overflow: auto;
    margin-top: 66px;
    background: #17174a;
    width: 100%;
  }

  .sb-cn {
    color: #ffffff;
    display: flex;
    align-items: center;
  }

  .el-menu-item, .el-submenu__title {
    font-size: 14px;

  }

  .el-submenu__title:hover {
    background: #60bff3;
  }

  .material-icons {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  .bc {
    background: #070844 !important;
    color: #ffffff;
  }

  .sidebar > ul > li:hover {
    color: #000 !important;
    background: #60bff3 !important;
  }

  .bc:hover {
    background: #60bff3 !important;
  }

  .el-submenu:hover {
    background: #60bff3 !important;
  }

  .el-menu-item i, .el-submenu__title i {
    color: #fff;
  }

  .icon {
    font-size: 20px;
    margin-right: 10px;
  }

  /*.is-active{*/
  /*background: #60bff3!important;*/
  /*}*/
</style>
