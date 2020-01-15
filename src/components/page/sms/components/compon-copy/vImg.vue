<template>
  <div class="item img " :class="text?'have':''" @mouseover="mouseOver"
       @mouseleave="mouseLeave" @click="selectedCard(ind)">
    <img  v-if="text" :src="text" class="avatar value" @click="showMask">
    <div v-else>
      <i class="icon iconfont icon-tupian ic"></i>
      <p class="">添加图片</p>
    </div>
    <div class="btn-handle" :style="active">
      <div class="icon-jt jt-left">
        <i class=" el-icon-sort-up down" @click="moveUp(ind,$event)"></i>
        <i class="el-icon-sort-down down" @click="moveDown(ind,$event)"></i>
      </div>
      <div class="icon-jt jt-right">
        <i class="el-icon-delete" @click="del"></i>
      </div>
    </div>
    <el-dialog :visible.sync="mask" size="tiny">
      <img width="100%" :src="text" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "vImg",
    props: ['text', 'ind','dom'],
    data() {
      return {
        active: '',
        imageUrl:'',
        dialogVisible:false,
        mask:false,
        file_list:[]
      }
    },
    watch:{
      imageUrl(val,old){
        console.log(123)
        console.log(val,old)
      },
      file_list(val,old){
        console.log(val)
      }
    },
    methods: {
      selectedCard(idx){
        let text = {
          type:'img',
          value:this.text
        }
        this.$emit('getInd',idx,4,text)
      },
      moveUp(index,e){
        console.log(index)
        console.log(e)
        this.$emit('moveUp',index)
      },
      moveDown(index,e){
        this.$emit('moveDown',index)
      },
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
        console.log(this.ind)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.mask = false
        this.$emit('getText',{value:this.imageUrl,type:'img'})
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
    max-width: 200px;
    max-height: 94px;
    object-fit: contain;
  }
  .have{
    padding-top: 15px;
  }
</style>
