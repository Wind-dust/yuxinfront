import {Message} from 'element-ui';

let errCollect = {
  user: {
    sendvercode: {
      3001: '手机格式错误',
      3002: '发送类型错误',
      3003: '一分钟内不能重复发送',
      3004: '发送失败'
    },
    apportionSonUser: {
      3000: '用户不存在',
      3001: '手机号错误',
      3002: '缺少con_id',
      3003: 'con_id错误',
      3005: '请设置密码',
      3006: '该手机号已注册'
    },
    quicklogin: {
      3001: '手机号错误'
    },
    userRegistered: {
      3000: '手机号错误',
      3002: '密码强度不够',
      3003: '邮箱格式错误',
      3004: '验证码错误',
      3005: '手机号已注册',
      3006: '用户类型错误',
      3007: '用户名不能为空'
    },
    seetingUserEquities: {
      3001: '手机号错误',
      3002: '代理价格格式错误',
      3003: '母账户无该项服务',
      3004: '代理价格不能低于服务商价格',
      3005: '该项服务已添加过',
      3006: '子账户服务无法设置',
      3007: '服务不存在',
      3008: '该账户不是本账户的子账户'
    },
    login: {
      3001: '手机号错误',
      3002: '账号不存在',
      3003: '密码错误',
      3004: '登陆失败',
      3005: '密码强度不够'
    },
    recordUserQualification: {},
    getUser: {
      3000: '用户不存在',
      3001: 'con_id长度错误',
      3002: '缺少con_id',
      3003: 'con_id错误'
    },
    resetpassword: {
      3001: '手机格式错误',
      3002: '手机号未注册',
      3003: '更新失败',
      3004: '验证码错误',
      3005: '密码强度不够',
      3006: '验证码错误'
    }
  },
  send: {
    getSmsBuiness: {
      3000: '用户名或密码错误',
      3001: '手机号码错误',
      3002: '短信内容为空或者短信内容超出500字',
      3003: '签名长度为2~8个字',
      3004: '该账户已被停用',
      3005: '该账户没有此项服务',
      3006: '余额不足',
      3009: '系统错误'
    },
    getSmsMarketingTask: {
      3000: '用户名或密码错误',
      3001: '手机号格式错误',
      3002: '单批次手机号不能超过一千个',
      3003: '发送时间格式错误',
      3004: '预约发送时间不能小于当前时间',
      3005: '短信内容为空或超出500字',
      3006: '签名长度只能是2~8个字符',
      3007: '短信标题不能为空'
    }
  },
  upload: {
    uploadUserExcel: {
      3001: '上传文件不能为空',
      3002: '上传失败'
    }
  }
}

function msgHint(code, url = '') {
  if (!url) throw new Error('url未传入');
  let port = url.split('/');
  let text = '';
  if (errCollect[port[0]] && errCollect[port[0]][port[1]] && errCollect[port[0]][port[1]][code]) {
    text = errCollect[port[0]][port[1]][code]
  } else {
    text = '错误码：' + code
  }
  Message({message: text, type: 'error'});
}

export {
  msgHint
}
