<template>
  <div class="tcontent">
    <!--<el-select size="small" v-model="status" placeholder="状态">-->
      <!--<el-option label="全部" value=""></el-option>-->
      <!--<el-option label="审核中" value="1"></el-option>-->
      <!--<el-option label="通过" value="2"></el-option>-->
      <!--<el-option label="拒绝" value="3"></el-option>-->
    <!--</el-select>-->
    <!--<el-input size="small" style="width: 150px" v-model="name" placeholder="模板ID/名称/标题"></el-input>-->
    <!--<el-button size="mini" type="primary" @click="check">查询</el-button>-->
    <div class="float-right" style="float: right;margin: 20px 0">
      <el-button plain size="mini" type="primary" @click="createMms">新建模板</el-button>
    </div>
    <el-table :data="list" style="width: 99%" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="模板名称" prop="name"></el-table-column>
      <el-table-column prop="title" label="彩信标题"></el-table-column>
      <el-table-column  label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.multimedia_frame[0].image_path" alt="" style="object-fit: contain;max-height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="multimedia_frame[0].content" :width="550" label="内容"></el-table-column>
      <el-table-column prop="create_time" label="	创建时间"></el-table-column>
      <el-table-column prop="_status" label="审核状态"></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="review(scope.row)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="30%">
      <div class="preview">
        <div class="inner">
          <div class="sms-text" >
            <p class="title">{{viewTitle}}</p>
            <div v-for="v,k in viewContent">
              <img class="img" :src="v.image_path" alt="">
              <pre>{{v.content}}</pre>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-pagination  :total="total" :page-size="10" @current-change="changePage"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: "videoTemplate",
    data() {
      return {
        list: [],
        total: 0,
        page: 1,
        status: '',
        name: '',
        viewContent:'',
        dialogVisible:false,
        layout:'pre,next',
        viewTitle:''
      }
    },
    mounted() {
      this.getSmsTemplate()
    },
    methods: {
      review(data){
        console.log(data)
        this.dialogVisible = true
        this.viewTitle = data.title
        this.viewContent = data.multimedia_frame
      },
      changePage(page){
        this.screen.page = page
        this.getSmsTemplate()
      },
      getSmsTemplate() {
        let that = this
        that.$request({
          url: 'user/getUserMultimediaTemplate',
          data: {
            business_id: 8
          },
          success(res) {
            that.list = that.disList(res.result)
            that.total = res.total
          }
        })
      },
      disList(data) {
        for (let i = 0; i < data.length; i++) {
          switch (parseInt(data[i].status)) {
            case 1:
              data[i]._status = '待审核';
              break;
            case 2:
              data[i]._status = '通过';
              break;
            case 3:
              data[i]._status = '不通过';
              break;
          }
        }
        return data
      },
      check() {

      },
      createMms() {
        this.$router.push({path: '/createMms'})
      }
    }
  }
</script>

<style scoped>
  .preview {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-size: 300px 615px;
    background-repeat: no-repeat;
    height: 615px;
    width: 300px;
    /*background-position-x: 150px;*/
  }

  .inner {
    width: 100%;
    margin: 0px 20px 0 30px;
    padding-top: 100px;
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
  }
  .title{
    font-size: 14px;
    font-weight: bold;
    color: grey;
    margin-bottom: 20px;
  }
  .img {
    width: 90%;
    margin: 10px auto;
    object-fit: contain;
  }
  .right {
    width: 50%;
    height: 615px;
    float: right;
    padding-left: 150px;
    box-sizing: border-box;
  }

  .preview {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-size: 300px 615px;
    background-repeat: no-repeat;
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
