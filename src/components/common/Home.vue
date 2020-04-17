<template>
  <div class="wrapper">
    <v-head :name='name' :breadText="breadText" :logo="logo"></v-head>
    <v-sidebar></v-sidebar>

    <div class="content">
      <transition name="move" mode="out-in">
        <keep-alive>
          <router-view @getBread="bread" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="move" mode="out-in">
        <router-view @getBread="bread" v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHead from './header';
  import vSidebar from './sidebar';

  export default {
    data() {
      return {
        name: '',
        breadText:'',
        logo:''
      }
    },
    mounted() {
      this.getuserInfo()
    },

    methods: {
      bread: function (bread) {
        this.breadText = bread
      },
      getuserInfo() {
        let that = this;
        that.$request({
          url: 'user/getuser',
          success: function (res) {
            that.$globalData.userInfo = res.data || {};
            that.name = res.data.nick_name
            that.logo = res.data.logo
            that.$store.commit('setPrint',{
              upriver:res.data.need_upriver_api,
              receipt:res.data.need_receipt_api,
              receipt_info:res.data.need_receipt_info
            })
          }
        })
      }
    },
    components: {
      vHead, vSidebar
    }
  }
</script>
