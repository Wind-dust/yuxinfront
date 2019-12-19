<template>
  <div>
    <div class="item text" @mouseover="mouseOver"
         @mouseleave="mouseLeave" @click="selectCard(ind,selected)">
      <p class="p-text" v-if="text">{{text}}</p>
      <p v-else>添加文字</p>
      <div class="btn-handle" :style="active">
        <div class="icon-jt jt-left">
          <i class="icon iconfont icon-tuodong down"></i>
        </div>
        <div class="icon-jt jt-right">
          <i class="el-icon-delete" @click="del"></i>
        </div>
      </div>
    </div>
    <div class="item img" @mouseover="mouseOver"
         @mouseleave="mouseLeave" @click="selected = 4">
      <i class="icon iconfont icon-tupian ic"></i>
      <p>添加图片</p>
      <div class="btn-handle" :style="active">
        <div class="icon-jt jt-left">
          <i class="icon iconfont icon-tuodong down"></i>
        </div>
        <div class="icon-jt jt-right">
          <i class="el-icon-delete" @click="del"></i>
        </div>
      </div>
    </div>
    <div class="item img"  @mouseover="mouseOver"
         @mouseleave="mouseLeave">
      <i class="icon iconfont icon-shipin ic"></i>
      <p>添加视频</p>
      <div class="btn-handle" :style="active">
        <div class="icon-jt jt-left">
          <i class="icon iconfont icon-tuodong down"></i>
        </div>
        <div class="icon-jt jt-right">
          <i class="el-icon-delete" @click="del"></i>
        </div>
      </div>
    </div>
    <div class="item img"   @mouseover="mouseOver"
         @mouseleave="mouseLeave">
      <i class="icon iconfont icon-dilanxianxingiconyihuifu_huabanfuben ic"></i>
      <p>添加音频</p>
      <div class="btn-handle" :style="active">
        <div class="icon-jt jt-left">
          <i class=" icon iconfont icon-tuodong down" ></i>
        </div>
        <div class="icon-jt jt-right">
          <i class="el-icon-delete" @click="del"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vText from './components/compon/vText'
  import vImg from './components/compon/vImg'
  import vVideo from './components/compon/vVideo'
  import vAudio from './components/compon/vAudio'
  import draggable from 'vuedraggable'

  export default {
    props: ['selected'],
    name: "com",
    components: {
      vAudio,
      vVideo,
      vImg,
      vText,
      draggable
    },
    data(){
      return{
        text:'',
        ind:0,
        select:0,
        active:''
      }
    },
    watch:{
      //组件内部进行操作
      selected(val){
        console.log(val)
      }
    },
    mounted(){

    },
    methods:{
      del() {
        this.$emit('del', this.ind)
      },
      mouseOver() {
        this.active = 'display:flex;'
      },
      mouseLeave() {
        this.active = 'display:none'
      },
      selectCard(idx, selected) {
        this.index = -1
        console.log(idx,selected)
        this.index = idx
        this.selectStatus = selected


        //点击当前卡片，如果下标，和
        //点击卡片获取卡片内容，这里没问题
        // this.inactive = idx === this.ind;
        // let dom = document.getElementsByClassName('p-text')[idx]
        // let text = dom.innerHTML
        // console.log(text)
        // this.$emit('getText', text)
      }
    }
  }
</script>

<style scoped>
  @import '../../../assets/font/iconfont.css';
  .el-checkbox {
    float: left;
  }

  .title {
    cursor: pointer;
    display: inline-block;
  }

  .el-card__header {
    border: none !important;
  }

  .box-card {
    position: relative;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
  }

  .card {
    width: 500px;
    height: 640px;
    overflow: auto;
    background: none;
    border: none;
    box-shadow: none;
  }

  .title:hover {
    color: #1889ff;
  }

  .content-content {
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: left;
  }

  .left {
    width: 34%;
    display: flex;
    justify-content: flex-start;
    margin-left: 100px;
  }

  .preview {
    width: 300px;
    height: 590px;
    background: #f5f5f8;
    border: 1px solid #dee3e8;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-alert {
    padding: 0 16px;
  }

  .pr-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    border-radius: 4px;
    background: #FFFFFF;
  }


  .item {
    width: 280px;
    border-radius: 4px;
    border: 1px solid #dee3e8;
    background: #fff;
    margin: 0 auto 8px;
    text-align: center;
    font-size: 14px;
    position: relative;
  }

  .item i {
    font-size: 40px;
  }

  .active {
    border-color: #3b92fb;
    box-shadow: 0 0 5px rgba(45, 140, 240, .5);
  }

  .pre-title {
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
  }

  .btn-icon {
    width: 50px;
    height: 178px;
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px dashed #eee;
    padding: 5px;
    text-align: center;
    justify-content: space-around;
    cursor: pointer;
  }

  .ov-auto {
    width: 100%;
    height: 88%;
    overflow: auto;
  }

  .iconfont {
    font-size: 20px;
  }

  .fz {
    font-size: 26px;
  }

  .img {
    height: 120px;
    text-align: center;
    padding-top: 30px;
    box-sizing: border-box;
  }

  .text {
    height: 120px;
    text-align: center;
    line-height: 120px;
  }

  .right {
    width: 40%;
  }

  .hint {
    width: 440px;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 30px;
    background: #f8f8f8;
    border: 1px solid #e3e3e3;
    padding: 8px;
    border-radius: 4px;
    line-height: 24px;
  }

  .hint span {
    color: #1889ff;
  }

  .pre {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-size: 300px 615px;
    background-repeat: no-repeat;
    height: 620px;
    width: 300px;
    /*background-position-x: 150px;*/
  }

  .inner {
    width: 100%;
    margin: 0px 20px 0 30px;
    padding-top: 100px;
    max-height: 430px;
  }

  .sms-text {
    margin-bottom: 5px;
    background: #e5e4e9;
    border-radius: 16px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    padding: 15px;
    width: 200px;
    min-height: 10px;
    word-break: break-all;
    max-height: 435px;
    overflow: auto;
  }
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
