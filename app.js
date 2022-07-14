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
      env: 'cloud1-7gnlpcr621a268bf',
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
