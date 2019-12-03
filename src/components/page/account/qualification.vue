<template>
  <div class="tcontent">
    <el-row>
      <el-col :span="24">
        <div class="box-card box-shadow">
          <h3 class="title">资质认证</h3>
          <div class="hint">根据《中华人民共和国网络安全法》第二十四条的相关规定，使用我司服务需先进行实名认证。</div>
          <el-form ref="form" :model="form" label-width="150px" style="width: 350px">
            <el-form-item label="公司名称" :rules="[{required:true,message:'请输入公司名称',trigger:'blur'}]">
              <el-input v-model="form.name" size="small" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名" :rules="[{required:true,message:'请输入法人姓名',trigger:'blur'}]">
              <el-input v-model="form.legal_person" size="small" placeholder="请输入法人姓名"></el-input>
            </el-form-item>
            <el-form-item label="公司地址" :rules="[{required:true,message:'请输入公司地址',trigger:'blur'}]">
              <el-input v-model="form.company_name" size="small" placeholder="请输入公司地址"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :rules="[{required:true,message:'请输入联系电话',trigger:'blur'}]">
              <el-input v-model="form.phone" size="small" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="上传证件" class="is-required">
              <el-upload class="avatar-uploader" action="" :http-request="uploadImg" accept=".jpeg,.jpg,.png,.gif,.psd,.bmp" :show-file-list="false"  :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p class="up-hint">1、请上传营业执照照片</p>
              <p class="up-hint">2、大小不超过2M</p>
              <p class="up-hint">3、上传照片请保持文字清晰可见</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">提交</el-button>
              <!--<el-button >取消</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vCard from '../../component/card'
  import options from '../../../assets/js/options'
  import type from '../../../assets/js/type'

  export default {
    data() {
      return {
        form:{},
        bread: '资质认证',
        imageUrl:''
      }
    },
    components: {
      vCard
    },
    mounted() {
      this.setBread()
      this.getProvinceCity()
      this.emit()
      console.log(options)
      this.company = options
      this.ruleType.entity_responsible_person_identity_types.option = type
    },
    methods: {
      beforeAvatarUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      uploadImg(file){
        let that = this
        let formData = new FormData()
        formData.append('image',file.file)
        that.$request({
          url:'upload/uploadfile',
          data:formData,
          success(res){
            that.imageUrl = res.image_path
          }
        })
      },
      getType() {
        let id = parseInt(this.companyId)
        let company = this.company
        let typeArr = []
        for (let i = 0; i < company.length; i++) {
          if (id === parseInt(company[i].id)) {
            typeArr = company[i].son
          }
        }
        this.companyType = typeArr
      },
      emit: function () {
        this.$emit('getBread', this.bread)
      },
      submit: function (data) {
        data.ruleForm.province_id = this.proId
        data.ruleForm.city_id = this.cityId
        data.ruleForm.county_id = this.districtId
        data.ruleForm.company_type = this.companyId
        data.ruleForm.company_certificate_type = this.companyTypeId
        let that = this
        that.$request({
          url: 'user/recordUserQualification',
          data: data.ruleForm,
          form: 1,
          success(res) {
            that.ruleForm = {}
            that.proId = ''
            that.cityId = ''
            that.districtId = ''
          }
        })
      },
      getVal(data) {
        console.log(data)

      },
      setBread() {
        this.$globalData.bread = '账户资质提交'
      },

      getProvince() {
        console.log(this.proId)
        let id = this.proId
        let that = this
        that.$request({
          url: 'provinces/getCity',
          data: {provinceId: id},
          success(res) {
            that.city = res.data
          }
        })
      },
      getCity() {
        let id = this.cityId
        let that = this
        that.$request({
          url: 'provinces/getArea',
          data: {cityId: id},
          success(res) {
            that.district = res.data
          }
        })
      },
      //获取省
      getProvinceCity: function () {
        let that = this
        that.$request({
          url: 'provinces/getProvinceCity',
          success(res) {
            that.disProv(res.data)
          }
        })
      },
      disProv(data) {
        for (let i = 0; i < data.length; i++) {
          this.province.push({
            value: data[i].id,
            label: data[i].area_name
          })
        }
      }

    }
  }
</script>

<style scoped>
  .area {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hint{
    width: 100%;
    padding: 8px 48px 8px 16px;
    font-size: 12px;
    border: 1px solid #abdcff;
    background-color: #f0faff;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 15px 0 20px 0;
  }
  .avatar-uploader  {
    width: 160px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .el-upload{
    display: block!important;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }
  .up-hint{
    font-size: 12px;
    line-height: 25px;
  }
</style>
