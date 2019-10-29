<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <el-menu-item index="index">
        <span class="sb-cn">控制台</span>
      </el-menu-item>
      <el-submenu  v-for="(v,k) in menuList" :key="k" :index="k+''">
        <template slot="title">
          <span class="sb-cn">{{v.name}}</span>
        </template>
        <el-menu-item class="bc" v-for="(v1,k1) in v._child" :key="k1" :index="'/'+v1.link">{{v1.name}}</el-menu-item>
      </el-submenu>
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
            _child: [{
              name: '开通子账户',
              link: 'account'
            },{
              name:'账户资质',
              link:'qualification'
            },{
              name:'子账户设置',
              link:'subAccount'
            },{
              name:'我的服务',
              link:'myService'
            }]
          }
        ]
      }
    },
    mounted() {

    },
    methods: {

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
    background: #42485b;
  }

  .sidebar > ul {
    /*height: 100%;*/
    overflow: auto;
    margin-top: 66px;
    background: #42485b;
    width: 100%;
  }

  .sb-cn{
    color: #ffffff;
  }
  .el-menu-item, .el-submenu__title {
    font-size: 14px;

  }
  .el-submenu__title:hover{
    background: #60bff3;
  }
  .material-icons {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }
  .bc{
    background: #42485b!important;
    color: #ffffff;
  }
  .sidebar > ul > li:hover{
    color: #000!important;
    background: #60bff3!important;
  }
  .bc:hover{
    background: #60bff3!important;
  }
  .el-submenu:hover{
    background: #60bff3!important;
  }
  /*.is-active{*/
    /*background: #60bff3!important;*/
  /*}*/
</style>
