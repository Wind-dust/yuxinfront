<template>
  <div class="item text" @mouseover="mouseOver"
       @mouseleave="mouseLeave" @click="selectCard(ind)">

   <p @click="showcard = true" class="value">{{text?text:'添加文字'}}</p>
    <div class="btn-handle" :style="active">
      <div class="icon-jt jt-left">
        <i class="icon iconfont icon-tuodong down"></i>
      </div>
      <div class="icon-jt jt-right">
        <i class="el-icon-delete" @click="del"></i>
      </div>
    </div>
    <el-dialog :visible.sync="showcard" draggable="false">
      <el-card >
        <el-input v-model="text" size="small" placeholder="请输入彩信内容，不超过500个字符" type="textarea" :rows="6"
                  style="width: 100%;height: 100%" :maxlength="500"></el-input>
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-button type="primary" size="small" plain @click="showcard = false">取消</el-button>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "vText",
    props: ['selected', 'ind', 'arr'],
    data() {
      return {
        active: '',
        draggable: false,
        fromDom: null,
        idx: -1,
        inactive: false,
        selectStatus: 0,
        index: 0,
        text: '',
        showcard:false
      }
    },
    watch: {
      //没有触发，也就是不是值改变的
      text(val) {
        this.content = val
      },
      arr(val){
        console.log(val)
      }
    },
    mounted() {

    },

    methods: {
      save(){
        this.showcard = false
        this.$emit('getText',{value:this.text,type:'text'})
      },
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
        this.index = idx
        this.selectStatus = selected
        this.$emit('getInd',idx)
      }

    }
  }
</script>

<style scoped>
  @import '../../../../../assets/font/iconfont.css';

  .el-textarea__inner {
    height: 100% !important;
  }

  .ic {
    font-size: 40px;
  }

  .iconfont {
    font-size: 24px;
  }

  ._active {
    box-shadow: none;
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
