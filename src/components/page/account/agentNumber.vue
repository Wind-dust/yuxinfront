<template>
  <div class="tcontent">
    <v-card width="150" name="分配条数" :card-status="cardStatus" :rules="rules" :rule-form="ruleForm" :rule-type="ruleType"
            @submit="submit" @hideCard=""></v-card>
  </div>
</template>

<script>
  import vCard from '../../component/card'

  export default {
    data() {
      return {
        cardStatus: true,
        rules: [],
        ruleType: {
          'nick_name': {
            type: 'input',
            label: '账户名',
            placeholder: '需要设置的账户名'
          },
          'business_id': {
            type: 'select',
            label: '服务',
            placeholder: '请选择服务',
            option: []
          },
          'agency_price': {
            type: 'input',
            label: '代理价格',
            placeholder: '默认统一代理商服务价格'
          }
        },
        ruleForm: {},
        bread:'子账户服务设置'

      }
    },
    components: {
      vCard
    },
    mounted() {
      this.setBread()
      this.getService()
      this.emit()
    },
    methods: {
      emit(){
        this.$emit('getBread',this.bread)
      },
      submit: function (data) {
        let that = this
        that.$request({
          url: 'user/seetingUserEquities',
          data: data.ruleForm,
          form: 1,
          success(res) {
            that.ruleForm = {}
          }
        })
      },
      setBread() {
        this.$globalData.bread = '子账户设置'
      },
      getService() {
        let that = this
        that.$request({
          url: 'user/getUserEquitises',
          success(res) {
            that.disService(res.userEquities)
          }
        })
      },
      disService(data) {
        for (let i = 0; i < data.length; i++) {
          this.ruleType.business_id.option.push({
            value:data[i].business_id,
            label:data[i].business_name
          })
        }
      },

    }
  }
</script>

<style scoped>
</style>
