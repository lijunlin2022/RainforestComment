const MAX_LIMIT = 10
Page({
  getList () {
    wx.showLoading({ title: 'loading...' })
    wx.cloud.callFunction({
      name: 'getCommentsAndReplies',
      data: {
        articleId: this.data.articleId,
        start: this.data.list.length,
        count: MAX_LIMIT
      }
    }).then(res => {
      const { result: { data, total } } = res
      this.setData({
        list: this.data.list.concat(data),
        total
      })
      wx.hideLoading()
    })
  },
  data: {
    modalShow: false,
    articleId: '',
    authorId: '',
    fromUserId: '',
    content: '',
    total: 0,
    list: []
  },
  onLoad (options) {
    const { articleId, authorId } = options
    const { _id: fromUserId } = getApp().globalData.userInfo
    this.setData({
      articleId,
      authorId,
      fromUserId
    })
    this.getList()
  },
  onReachBottom () {
    if (this.data.list.length < this.data.total) {
      this.getList()
    }
  },
  async addComment (obj) {
    return wx.cloud.callFunction({
      name: 'addComment',
      data: obj
    })
  },
  activeModal () {
    if (getApp().globalData.hasUserInfo) {
      this.setData({
        modalShow: true
      })
    } else {
      wx.showModal({
        title: '请登录',
        content: '只有登陆后才可以评论',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#2a9147',
        success: (result) => {
          const { articleId, authorId } = this.data
          if(result.confirm){
            wx.switchTab({
              url: `/pages/mine/index`
            })
            getApp().globalData.fromUrl = `/pages/comment/index?articleId=${articleId}&authorId=${authorId}`
          }
        }
      })
    }
  },
  jumpReply (e) {
    const { commentId, articleId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../reply/index?commentId=${commentId}&articleId=${articleId}`,
    })
  },
  onChange (e) {
    this.setData({
      content: e.detail.value
    })
  },
  onSend () {
    const obj = {
      articleId: this.data.articleId,
      content: this.data.content,
      fromUserId: this.data.fromUserId,
      parentCommentId: null,
      rootCommentId: null,
      toUserId: this.data.authorId
    }
    this.addComment(obj).then(res => {
      this.getList()
      this.setData({
        modalShow: false
      })
    })
  }
})
