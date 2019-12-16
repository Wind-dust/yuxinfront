<template>
  <div class="item img" draggable="true" :class="selected === 5 ? 'active' : ''" @mouseover="mouseOver"
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
</template>

<script>
  export default {
    name: "vVideo",
    props: ['selected', 'ind'],
    data() {
      return {
        active: ''
      }
    },
    methods: {
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
