<template>
  <div class="item img"   @mouseover="mouseOver"
       @mouseleave="mouseLeave" @click="selectCard(ind)">

    <!--<el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">-->
      <audio v-if="audio" :src="audio" class="avatar value"></audio>
      <div v-else>
        <i class="icon iconfont icon-dilanxianxingiconyihuifu_huabanfuben ic"></i>
        <p class="">添加音频</p>
      </div>
    <!--</el-upload>-->
    <div class="btn-handle" :style="active">
      <div class="icon-jt jt-left">
        <i class=" el-icon-sort-up down" @click="moveUp(ind,$event)"></i>
        <i class="el-icon-sort-down down" @click="moveDown(ind,$event)"></i>
      </div>
      <div class="icon-jt jt-right">
        <i class="el-icon-delete" @click="del"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vAudio",
    props: ['ind','text'],
    data(){
      return{
        active:'',
        audio:''
      }
    },
    methods:{
      selectedCard(idx){
        let text = {
          type:'audio',
          value:this.text
        }
        this.$emit('getInd',idx,6,text)
      },
      moveUp(index,e){
        console.log(index)
        console.log(e)
        this.$emit('moveUp',index)
      },
      moveDown(index,e){
        this.$emit('moveDown',index)
      },
      handleAvatarSuccess(res, file) {
        this.audio = URL.createObjectURL(file.raw);
      },
      del(){
        this.$emit('del',this.ind)
      },
      mouseOver(){
        this.active = 'display:flex'
      },
      mouseLeave(){
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
    font-size: 40px;
  }
  .btn-handle{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 38px;
    background: rgba(0,0,0,.7);
    padding: 0 10px;
    display: none;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  .icon-jt{
    color: #fff;
    font-size: 20px;
  }
  .down{
    margin-right: 4px;
  }
  .icon-jt i:hover{
    color: #1889ff;
    cursor: pointer;
  }
</style>
