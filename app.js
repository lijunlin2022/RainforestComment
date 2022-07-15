const { DEV_ENV_ID, PROD_ENV_ID } = require('./config.js')
App({
  async initUserInfo () {
    return wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(res => {
      const { result: { data } } = res
      if (data.length > 0) {
        Object.assign(this.globalData, {
          hasUserInfo: true,
          userInfo: data[0]
        })
      }
    })
  },
  initCloud () {
    wx.cloud.init({
      env: DEV_ENV_ID, 
      // env: PROD_ENV_ID,
      traceUser: true
    })
  },
  onLaunch() {
    this.initCloud()
    this.initUserInfo()
  },
  globalData: {
    hasUserInfo: false,
    userInfo: {
      openid: '',
      _id: '',
      nickname: '',
      avatarUrl: '',
      mail: ''
    },
    fromUrl: ''
  }
})
