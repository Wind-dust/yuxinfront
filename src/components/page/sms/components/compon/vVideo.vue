<template>
  <div class="item img"  @mouseover="mouseOver"
       @mouseleave="mouseLeave">

    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">
      <video v-if="video" :src="video" class="avatar value"></video>
      <div v-else>
        <i class="icon iconfont icon-shipin ic"></i>
        <p class="">添加视频</p>
      </div>
    </el-upload>
    <div class="btn-handle" :style="active">
      <div class="icon-jt jt-left">
        <i class="icon iconfont icon-tuodong down"></i>
      </div>
      <div class="icon-jt jt-right">
        <i class="el-icon-delete" @click="del"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vVideo",
    props: ['selected', 'ind'],
    data() {
      return {
        active: '',
        video:''
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.video = URL.createObjectURL(file.raw);
      },
      del(){
        this.$emit('del',this.ind)
      },
      mouseOver() {
        this.active = 'display:flex'
      },
      mouseLeave() {
        this.active = 'display:none'
      },
    }
  }
</script>

<style scoped>
  @import '../../../../../assets/font/iconfont.css';



  .iconfont {
    font-size: 24px;
  }
  .ic {
    font-size: 48px;
  }
  .btn-handle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 38px;
    background: rgba(0, 0, 0, .7);
    padding: 0 10px;
    display: none;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .icon-jt {
    color: #fff;
    font-size: 20px;
  }

  .down {
    margin-right: 4px;
  }

  .icon-jt i:hover {
    color: #1889ff;
    cursor: pointer;
  }
</style>
