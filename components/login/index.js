Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    modalShow: {
      type: Boolean
    }
  },
  methods: {
    onGetUserInfo (event) {
      wx.getUserProfile({
        desc: '用于发布信息时获取头像与昵称',
        success: (res) => {
          this.triggerEvent('loginSuccess', res.userInfo)
        },
        fail: (err) => {
          this.triggerEvent('loginFail')
        }
      })
    }
  }
})