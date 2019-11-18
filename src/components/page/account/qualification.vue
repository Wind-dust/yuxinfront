<template>
  <div class="tcontent">
    <v-card width="180" name="账户资质" :card-status="cardStatus" :rules="rules" :rule-form="ruleForm" :rule-type="ruleType"
            @submit="submit" @hideCard="">
      <template slot="province">
        <div class="area">
          <el-form-item label-width="80px" label="省" :rules="[{ required: true, message: '请选择省份', trigger: 'change' }]">
            <el-select @change="getProvince" v-model="proId">
              <el-option v-for="item in province" :key="item.id" :label="item.label || ''" :value="item.value || ''">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="80px" label="市" :rules="[{ required: true, message: '请选择城市', trigger: 'change' }]">
            <el-select @change="getCity" v-model="cityId">
              <el-option v-for="item in city" :key="item.id" :label="item.area_name || ''" :value="item.id || ''">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="80px" label="区" :rules="[{ required: true, message: '请选择区', trigger: 'change' }]">
            <el-select v-model="districtId">
              <el-option v-for="item in district" :key="item.id" :label="item.area_name || ''" :value="item.id || ''">
              </el-option>
            </el-select>
          </el-form-item>

        </div>

          <el-form-item label-width="150px" label="主办单位性质" :rules="[{ required: true, message: '请选择单位性质', trigger: 'change' }]">
            <el-select v-model="companyId" @change="getType">
              <el-option v-for="item in company" :key="item.id" :label="item.name || ''" :value="item.id || ''">
              </el-option>
            </el-select>
          </el-form-item>



          <el-form-item label-width="150px" label="主办单位证件类型" :rules="[{ required: true, message: '请选择证件类型', trigger: 'change' }]">
            <el-select v-model="companyTypeId" @change="getType">
              <el-option v-for="item in companyType" :key="item.id" :label="item.name || ''" :value="item.id || ''">
              </el-option>
            </el-select>
          </el-form-item>

      </template>
    </v-card>
  </div>
</template>

<script>
  import vCard from '../../component/card'
  import options from '../../../assets/js/options'
  import type from '../../../assets/js/type'

  export default {
    data() {
      return {
        company: [],
        companyId: '',
        companyType:[],
        companyTypeId:'',
        cardStatus: true,
        rules: ['company_name', 'company_certificate_num',
          'organizers_name', 'identity_address', 'mailingAddress_address', 'user_supp_address', 'investor', 'entity_responsible_person_name',
          'entity_responsible_person_identity_types', 'entity_responsible_person_identity_num', 'entity_responsible_person_mobile_phone',
          'entity_responsible_person_phone', 'entity_responsible_person_msn',
          'entity_responsible_person_email'
        ],
        ruleType: {
          'company_name': {
            type: 'input',
            label: '主办单位或主办人全称',
            placeholder: '请输入主办单位或主办人全称'
          },
          'company_certificate_num': {
            type: 'input',
            label: '主办单位证件号码',
            placeholder: '请输入'
          },
          'organizers_name': {
            type: 'input',
            label: '主办单位或主办人名称',
            placeholder: '请输入'
          },
          'identity_address': {
            type: 'input',
            label: '主办单位证件住所',
            placeholder: '请输入'
          },
          'mailingAddress_address': {
            type: 'input',
            label: '主办单位通讯地址',
            placeholder: '地区级'
          },
          'user_supp_address': {
            type: 'input',
            label: "主办单位通讯地址",
            placeholder: '街道门牌号级'
          },
          'investor': {
            type: 'input',
            label: '投资人或主管单位',
            placeholder: '请输入'
          },
          'entity_responsible_person_name': {
            type: 'input',
            label: '负责人姓名',
            placeholder: '请输入'
          },
          'entity_responsible_person_identity_types': {
            type: 'select',
            label: '负责人证件类型',
            placeholder: '请选择',
            option: []
          },
          'entity_responsible_person_identity_num': {
            type: 'input',
            label: '负责人证件号码',
            placeholder: '请输入'
          },
          'entity_responsible_person_mobile_phone': {
            type: 'input',
            placeholder: '请输入',
            label: '联系方式1'
          },
          'entity_responsible_person_phone': {
            type: 'input',
            placeholder: '请输入',
            label: '联系方式2'
          },
          'entity_responsible_person_msn': {
            type: 'input',
            placeholder: '请输入',
            label: '应急联系电话'
          },
          'entity_responsible_person_email': {
            type: 'input',
            label: '电子邮件',
            placeholder: '请输入'
          },
          'entity_remark': {
            type: 'input',
            inpType: 'textarea',
            label: '留言'
          }
        },
        ruleForm: {},
        province: [],
        city: [],
        district: [],
        proId: '',
        cityId: '',
        districtId: '',
        bread: '账户资质'
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
</style>
