<template>
  <div>
    <el-table :data="product" style="width: 100%">
      <el-table-column prop="business_name" label="产品类型" width="180"></el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-input style="width:100px" size="small" v-model="scope.row.son_price"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="赠送条数">
        <template slot-scope="scope">
          <el-input style="width:100px" size="small" v-model="scope.row.gift_num"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="submit(scope.row)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "setService",
    props:['nickName'],
    data() {
      return {
        service: [],
        checkAll: false,
        checked: false,
        isIndeterminate: false,
        product: [],
        business: {},
        marketing: {},
        status: false,
        price:'',
        gift_num:'',
        name:''
      }
    },
    watch:{
      nickName:{
        handler(val){
          this.name = val
        },
        deep:true
      }
    },
    mounted() {
      this.getService()
    },
    methods: {
      submit(data){
        console.log(data)
      },
      handleCheckAllChange(val) {
        console.log(val)
        this.status = true
        this.isIndeterminate = false;
      },
      selected(k) {
        console.log(k)
      },
      //获取当前账户有的服务
      getService() {
        let that = this
        that.$request({
          url: 'user/getUserEquitises',
          success(res) {
            that.product = that.disService(res.userEquities)
          }
        })
      },
      disService(data) {
        for (let i = 0; i < data.length; i++) {
          data[i].son_price = ''
          data[i].gift_num = ''
        }
        return data
      }
    }
  }
</script>

<style scoped>
  .ul {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }

  .li {
    margin-bottom: 10px;
  }

  .mt {
    margin-top: 30px;
  }

  .line {
    width: 100%;
    height: 1px;
    background: #cfcfcf;
    margin: 18px 0;
  }
</style>
