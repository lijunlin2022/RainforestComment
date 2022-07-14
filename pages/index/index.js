const MAX_LIMIT = 10
Page({
  getList () {
    wx.showLoading({ title: 'loading...' })
    wx.cloud.callFunction({
      name: 'getArticles',
      data: {
        start: this.data.list.length,
        count: MAX_LIMIT
      }
    }).then(res => {
      const { result: { data, total } } = res
      this.setData({
        total,
        list: this.data.list.concat(data)
      })
      wx.hideLoading()
    })
  },
  data: {
    list: [],
    total: 0,
  },
  onLoad () {
    this.getList()
  },
  onReachBottom () {
    if (this.data.list.length < this.data.total) {
      this.getList()
    }
  }
})