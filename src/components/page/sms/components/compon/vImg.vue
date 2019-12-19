<template>
  <div class="item img" @mouseover="mouseOver"
       @mouseleave="mouseLeave">
    <img draggable="false" v-if="imageUrl" :src="imageUrl" class="avatar">
    <div v-else @click="showMask">
      <i class="icon iconfont icon-tupian ic"></i>
      <p class="">添加图片</p>
    </div>
    <div class="btn-handle" :style="active">
      <div class="icon-jt jt-left">
        <i class="icon iconfont icon-tuodong down"></i>
        <i class="el-icon-zoom-in down" style="font-size: 24px" @click="changeState"></i>
      </div>
      <div class="icon-jt jt-right">
        <i class="el-icon-delete" @click="del"></i>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="mask">
    <el-card >
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">
        <i class="icon iconfont icon-tupian ic"></i>
      </el-upload>
    </el-card>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "vImg",
    props: ['selected', 'ind','dom'],
    data() {
      return {
        active: '',
        imageUrl:'',
        dialogVisible:false,
        mask:false
      }
    },
    methods: {
      showMask(){
        this.mask = true
      },
      changeState(){
        if (!this.imageUrl) {
          return this.$message.error('请先上传图片')
        }
        this.dialogVisible = true
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      del() {
        this.$emit('del', this.ind)
      },
      mouseOver() {
        this.active = 'display:flex'
      },
      mouseLeave() {
        this.active = 'display:none'
      },
      select() {
        this.$emit('')
      }
    }
  }
</script>

<style scoped>
  @import '../../../../../assets/font/iconfont.css';

  .iconfont {
    font-size: 24px;
  }

  .ic {
    font-size: 40px;
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

  .upload-demo .el-upload-dragger {
    width: 100% !important;
    height: 100% !important;
  }
  .avatar{
    margin: 0 auto;
    max-width: 216px;
    max-height: 94px;
    object-fit: contain;
  }
</style>
