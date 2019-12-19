<template>
  <div class="box-card box-shadow">
    <h3 @click="back" class="title"><i class="el-icon-arrow-left"></i>返回模板管理</h3>
    <div class="content-content">
      <div class="left">
        <div class="preview">

          <div class="pr-head box-shadow">
            <p>预计文件大小：0KB</p>
            <el-button size="mini" type="primary" @click="mask = true">预览</el-button>
          </div>
          <div class="ov-auto">
            <div class="item pre-title" :class="selected === 1?'active':''" @click="selected = 1" v-if="form.title">
              {{form.title}}
            </div>
            <div class="item pre-title" @click="selected = 1" :class="selected === 1?'active':''" v-else>添加主题</div>
            <div class="item pre-title" @click="selected = 2" :class="selected === 2?'active':''">添加签名</div>
            <draggable v-model="dom"
                       :options="{ group: 'people',animation:150,scroll:true,scrollSensitivity:200,}"
                       @start="drag = true" @end="drag = false">
              <component  v-for="(v,k) in dom" :key="k" :is="v" :selected="selected" @del="del" :ind="k"
                          :text="text" @getText="getText" :arr="arr"></component >
            </draggable>
          </div>
          <div>
            <el-checkbox v-model="checked">退订回T</el-checkbox>
          </div>
        </div>
        <div class="btn-icon">
          <p>添加素材</p>
          <p @click="add('vText',3)"><i class="icon iconfont icon-wenzixiaoguo fz"></i></p>
          <p @click="add('vImg',4)"><i class="icon iconfont icon-tupian"></i></p>
          <p @click="add('vVideo',5)"><i class="icon iconfont icon-shipin fz"></i></p>
          <p @click="add('vAudio',6)"><i class="icon iconfont icon-dilanxianxingiconyihuifu_huabanfuben"></i></p>
        </div>
      </div>
      <div class="right">
        <el-card class="card">
          <!--<div slot="header" style="border: none">-->
          <!--<el-button style="float: right; padding: 3px 0" type="text" @click="mask = false">关闭</el-button>-->
          <!--</div>-->
          <div>
            <div class="pre">
              <div class="inner">
                <div class="sms-text">
                  <p style="color: #848a9f;font-weight: bold"></p>
                  <div>
                    <p><img class="img" src="" alt=""></p>
                    <p></p>
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="mask" v-if="mask">
      <el-card class="card">
        <!--<div slot="header" style="border: none">-->
        <el-button style="float: right; padding: 3px 0" type="text" @click="mask = false">关闭</el-button>
        <!--</div>-->
        <div>
          <div class="pre">
            <div class="inner">
              <div class="sms-text">
                <p style="color: #848a9f;font-weight: bold"></p>
                <div>
                  <p><img class="img" src="" alt=""></p>
                  <p></p>
                </div>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import vText from './components/compon/vText'
  import vImg from './components/compon/vImg'
  import vVideo from './components/compon/vVideo'
  import vAudio from './components/compon/vAudio'
  import draggable from 'vuedraggable'
  import com from './com'

  export default {
    components: {
      vText,
      vImg,
      vVideo,
      vAudio,
      draggable,
      com
    },
    name: "createVideoTemp",
    data() {
      return {
        checked: true,
        selected: 1,
        form: {
          title: ''
        },
        mask: false,
        dom: [],
        dragging: null,
        text: '',
        imgs: '',
        audio: '',
        video: '',
        oldval:'',
        //点击当前的卡片，找到对应这个卡片下标的form（arr）里面的内容
        arr: [],
        num:0,
        s:[],
      }
    },
    computed: {},
    //点击卡片把值传给输入框，输入框值改变就传给卡片，双向绑定
    watch: {
      text(val,oldval){
        console.log(val)
      },
      dom(val,old){
        console.log(val,old)
      }
    },
    mounted() {
    },
    methods: {
      //现在需要考虑的是怎么把输入框的值传给卡片
      getText(val){
        this.text = val
      },
      getNowCard() {
        //点击其中一个卡片，比如是下标是2，
        //或者说右边输入框永远都只有一个，当输入的时候，就把值存进某个数据，
      },
      del(idx) {
        this.dom.splice(idx, 1)
      },
      back() {
        this.$router.go(-1)
      },
      add(type, num) {
        this.dom.push(type)
        let s = this.s
        this.$set(this.form,type+s,'')
        this.s++
        this.selected = num
        console.log(this)
      },

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
    padding-top: 14px;
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

</style>
