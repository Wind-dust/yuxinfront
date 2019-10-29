<template>
  <div class="tcontent">
    <v-card width="180" name="账户资质" :card-status="cardStatus" :rules="rules" :rule-form="ruleForm" :rule-type="ruleType"
            @submit="submit" @hideCard="">
      <template slot="province">
        <div class="area">
          <el-form-item  label-width="80px" label="省" :rules="[{ required: true, message: '请选择省份', trigger: 'blur' }]">
            <el-select @change="getProvince" v-model="proId">
              <el-option v-for="item in province" :key="item.id" :label="item.label || ''" :value="item.value || ''">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="80px" label="市" :rules="[{ required: true, message: '请选择城市', trigger: 'blur' }]">
            <el-select @change="getCity" v-model="cityId">
              <el-option v-for="item in city" :key="item.id" :label="item.area_name || ''" :value="item.id || ''">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="80px" label="区" :rules="[{ required: true, message: '请选择区', trigger: 'blur' }]">
            <el-select v-model="districtId">
              <el-option v-for="item in district" :key="item.id" :label="item.area_name || ''" :value="item.id || ''">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </template>
    </v-card>
  </div>
</template>

<script>
  import vCard from '../../component/card'

  export default {
    data() {
      return {
        cardStatus: true,
        rules: ['company_name', 'company_type', 'company_certificate_type', 'company_certificate_num',
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
          'company_type': {
            type: 'select',
            label: '主办单位性质',
            placeholder: '请选择',
            option: [
              {
                value: 1,
                label: '国防机构'
              },
              {
                value: 2,
                label: '政府机关'
              }, {
                value: 3,
                label: '事业单位'
              },
              {
                value: 4,
                label: '企业'
              }, {
                value: 5,
                label: '个人'
              },
              {
                value: 6,
                label: '社会团体'
              }, {
                value: 7,
                label: '民办非企业单位'
              },
              {
                value: 8,
                label: '基金会'
              },
              {
                value: 9,
                label: '律师执业机构'
              }, {
                value: 10,
                label: '外国在华文化中心'
              }, {
                value: 11,
                label: '群众性团体组织'
              }, {
                value: 12,
                label: '司法鉴定机构'
              },
              {
                value: 13,
                label: '宗教团体'
              }, {
                value: 14,
                label: '境外机构'
              }, {
                value: 15,
                label: '医疗机构'
              }, {
                value: 16,
                label: '公证机构'
              }
            ]
          },
          'company_certificate_type': {
            type: 'select',
            label: '主办单位证件类型',
            placeholder: '请选择',
            option: [{
              value: 1,
              label: '营业执照'
            }, {
              value: 3,
              label: '组织机构代码'
            }, {
              value: 4,
              label: '事业单位法人证书'
            }, {
              value: 5,
              label: '部队代号'
            }, {
              value: 9,
              label: '组织机构代码证'
            }, {
              value: 12,
              label: '组织机构代码证'
            }, {
              value: 13,
              label: '统一社会信用代码证'
            }, {
              value: 23,
              label: '军队单位对外有偿服务许可证'
            }, {
              value: 27,
              label: '外国企业常驻代表机构登记证'
            }]
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
            option: [{
              value: 1,
              label: '营业执照'
            }, {
              value: 3,
              label: '组织机构代码'
            }, {
              value: 4,
              label: '事业单位法人证书'
            }, {
              value: 5,
              label: '部队代号'
            }, {
              value: 9,
              label: '组织机构代码证'
            }, {
              value: 12,
              label: '组织机构代码证'
            }, {
              value: 13,
              label: '统一社会信用代码证'
            }, {
              value: 23,
              label: '军队单位对外有偿服务许可证'
            }, {
              value: 27,
              label: '外国企业常驻代表机构登记证'
            }]
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
        districtId: ''

      }
    },
    components: {
      vCard
    },
    mounted() {
      this.setBread()
      this.getProvinceCity()
    },
    methods: {
      submit: function (data) {
        data.ruleForm.province_id = this.proId
        data.ruleForm.city_id = this.cityId
        data.ruleForm.county_id = this.districtId
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
  .area{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
