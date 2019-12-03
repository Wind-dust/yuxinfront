<template>
  <!--<div>-->
    <!--<ul class="ul mt">-->
      <!--<li class="li">-->
        <!--&lt;!&ndash;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>&ndash;&gt;-->
        <!--短信产品-->
      <!--</li>-->
      <!--<li class="li">价格</li>-->
      <!--<li class="li">赠送条数</li>-->
    <!--</ul>-->
    <!--<div class="line"></div>-->

    <!--<ul class="ul " v-for="(v,k) in product" :key="k">-->
      <!--<li class="li">-->
        <!--<el-checkbox @change="selected(v.business_id)" :checked=" status ? status:v.status">{{v.business_name}}-->
        <!--</el-checkbox>-->
      <!--</li>-->
      <!--<li class="li">-->
        <!--<el-input style="width: 80px;" v-model="v.son_price" size="mini"></el-input>-->
      <!--</li>-->
      <!--<li class="li">-->
        <!--<el-input style="width: 80px" v-model="v.num" size="mini"></el-input>-->
      <!--</li>-->
    <!--</ul>-->
    <!--<el-button size="small" type="primary" @click="submit()">保存</el-button>-->
  <!--</div>-->
  <div>
    <el-table :data="product" style="width: 100%">
      <el-table-column prop="business_name" label="产品类型" width="180"></el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-input style="width:100px" v-model="scope.row.son_price"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="赠送条数">
        <template slot-scope="scope">
          <el-input style="width:100px" v-model="scope.row.gift_num"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="赠送条数">
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
        gift_num:''
      }
    },
    mounted() {
      this.getService()
    },
    methods: {
      submit(id){
        console.log(id)
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
