<template>
  <div class="tcontent">
    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="ID" width="100"></el-table-column>
      <el-table-column prop="business_name" label="名称"></el-table-column>
      <el-table-column prop="agency_price" label="代理价格"></el-table-column>
      <el-table-column prop="price" label="服务价格"></el-table-column>
      <el-table-column prop="num_balance" label="剩余条数"></el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page="page"></v-pagination>

    <v-card name='添加' width="110" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
            @sumbit="sumbit" @hideCard="hideCard"></v-card>

  </div>
</template>

<script>
  import vScreen from '../../component/screen'
  import vPagination from '../../component/pagination'
  import vCard from '../../component/card'

  export default {
    data() {
      return {
        list: [],
        num: 1,
        cardStatus: false,
        ruleForm: {},
        rules: ['title', 'image_path','content'],
        ruleType: {
          'title': {
            type: 'input',
            label: '标题',
            placeholder: '请输入标题'
          },
          'jump_content': {
            type: 'input',
            label: '跳转内容',
            placeholder: '跳转内容'
          },
          'order': {
            type: 'input',
            label: '排序',
            placeholder: '排序'
          },
          'image_path': {
            type: 'image',
            label: '图片',
            placeholder: '请上传图片'
          },
          'content': {
            type: 'input',
            label: '简介',
            inpType: 'textarea',
            placeholder: "请输入简介"
          }
        },
        screen: {
          page: 1,
          page_num: 10
        },
        page: 1,
        total: 0,
        bread:'我的服务'
      }
    },
    components: {
      vScreen,
      vPagination,
      vCard
    },
    mounted() {
      this.emit()
      console.log(this.$root)
      this.screen.page = parseInt(localStorage.getItem("goodList")) || 1
      this.page = this.screen.page
      this.getAboutus()
    },
    methods: {
      emit:function(){
        this.$emit('getBread',this.bread)
      },
      getAboutus() {
        let that = this
        that.$request({
          url: 'user/getUserEquitises',
          success(res) {
            that.list = res.userEquities
          }
        })
      },

      showCard() {
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        this.ruleForm.id ? this.edit(data) : this.add(data)
      },
      add(data) {
        let that = this
        that.$request({
          url: 'aboutus/addaboutus',
          data: data.ruleForm,
          form: 1,
          success(res) {
            that.cardStatus = false
            that.ruleForm = {}
            that.getAboutus()
          }
        })
      },
      edit(data) {
        let that = this
        that.$request({
          url: 'aboutus/updateaboutus',
          data: data.ruleForm,
          form: 3,
          success(res) {
            that.ruleForm = {}
            that.getAboutus()
            that.cardStatus = false
          }
        })
      },
      pageChange(obj) {
        this.screen.page = obj.page
      },
    }
  }
</script>

<style scoped>

</style>
