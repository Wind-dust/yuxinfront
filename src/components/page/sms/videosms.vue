<template>
  <el-row>
    <el-col :span="24">
      <div class="box-card box-shadow">
        <h3 class="title">视频彩信</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane label="产品信息" name="first"></el-tab-pane>
          <el-tab-pane label="模板管理" name="second"></el-tab-pane>
          <el-tab-pane label="黑名单管理" name="fifth"></el-tab-pane>
          <el-tab-pane label="发送列表" name="sixth"></el-tab-pane>
        </el-tabs>
        <div v-if="activeName === 'first'">
          <v-product-temp name="视频彩信" :message-num="0" :content="content" :test="true" :icon="icon"></v-product-temp>
        </div>
        <div v-if="activeName === 'second'">
          <v-video-template></v-video-template>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import vProductTemp from './components/productTemp'
  import vVideoTemplate from './components/videoTemplate'

  export default {
    components: {
      vProductTemp,
      vVideoTemplate
    },
    name: "videosms",
    data() {
      return {
        activeName: 'first',
        content: '发送2MB以内的文字+图片+动画+声音等信息内容，高效直达，即点即看。',
        icon: 'http://imagesdev.shyuxi.com/video.png'
      }
    },
    mounted() {
      this.$emit('getBread', '视频彩信')
    }
  }
</script>

<style scoped>

</style>
