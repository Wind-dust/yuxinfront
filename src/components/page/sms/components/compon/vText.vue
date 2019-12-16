<template>
  <div class="item text" :class="inactive ? 'active':''" @mouseover="mouseOver"
       @mouseleave="mouseLeave" @click="selectCard(ind)">
    <p>添加文字</p>
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
    name: "vText",
    props: ['selected', 'ind', 'dom'],
    data() {
      return {
        active: '',
        draggable: false,
        fromDom: null,
        idx: -1,
        inactive:false
      }
    },
    watch: {

    },
    mounted() {

    },
    methods: {
      del() {
        this.$emit('del', this.ind)
      },
      mouseOver() {
        this.active = 'display:flex;'
      },
      mouseLeave() {
        this.active = 'display:none'
      },
      selectCard(idx) {

        this.inactive = idx === this.ind;
      }

    }
  }
</script>

<style scoped>
  @import '../../../../../assets/font/iconfont.css';

  .ic {
    font-size: 40px;
  }

  .iconfont {
    font-size: 24px;
  }
  ._active{
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
