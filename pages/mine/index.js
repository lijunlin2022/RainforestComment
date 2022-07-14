Page({
  async addUser (obj) {
    return wx.cloud.callFunction({
      name: 'addUser',
      data: obj
    })
  },
  data: {
    userInfo: {
      nickname: '',
      avatarUrl: ''
    },
    hasUserInfo: false,
    loginShow: false
  },
  initUserInfo () {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      hasUserInfo: getApp().globalData.hasUserInfo
    })
  },
  onLoad () {
    this.initUserInfo()
  },
  activeLogin () {
    this.setData({
      loginShow: true
    })
  },
  onLoginSuccess (e) {
    wx.showLoading({ title: '登陆中' })
    const { detail: { avatarUrl, nickName: nickname } } = e
    this.addUser({ avatarUrl, nickname }).then(res => {
      const appInst = getApp()
      appInst.initUserInfo().then(res => {
        this.setData({
          loginShow: false
        })
        this.initUserInfo()
        wx.hideLoading()
        // 如果 fromUrl 有值, 证明是从其他页面跳转过来登录的, 需要再跳转回去
        if (appInst.globalData.fromUrl !== '') {
          wx.navigateTo({
            url: appInst.globalData.fromUrl
          })
          appInst.globalData.fromUrl = ''
        }
      })
    })
  },
  onLoginFail () {
    wx.showModal({
      title: '请授权',
      content: '授权后才能发表评论'
    })
  }
})