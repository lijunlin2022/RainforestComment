Page({
  data: {
    msg: '',
    msgList: [
      'xxx',
      'xxx'
    ]
  },
  onLoad () {
    wx.getUserProfile()
  },
  getUserInfo () {
    console.log('xxx')
    wx.getUserProfile({
      desc: '本程序获取用户信息仅用于展示留言, 不做其他用途',
      success (res) {
        console.log('userInfo', res)
      }
    })
  },
  leaveMsg () {
    this.setData({
      msgList: [...this.data.msgList, this.data.msg]
    })
    this.setData({
      msg: ''
    })
  }
})
