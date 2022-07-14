const MAX_LIMIT = 10
Page({
  async getCommentList () {
    return wx.cloud.callFunction({
      name: 'getComments',
      data: { _id: this.data.rootCommentId }
    }).then(res => {
      this.setData({
        commentList: res.result.data
      })
    })
  },
  async getReplyList () {
    return wx.cloud.callFunction({
      name: 'getComments',
      data: {
        rootCommentId: this.data.rootCommentId,
        start: this.data.replyList.length,
        count: MAX_LIMIT
      }
    }).then(res => {
      const { result: { data, total } } = res
      this.setData({
        replyList: this.data.replyList.concat(data),
        replyTotal: total
      })
    })
  },
  getList () {
    wx.showLoading({ title: 'loading...' })
    this.getCommentList().then(res => {
      this.getReplyList().then(res => {
        wx.hideLoading()
      })
    })
  },
  onLoad (options) {
    const { commentId: rootCommentId, articleId } = options
    const { _id: fromUserId } = getApp().globalData.userInfo
    this.setData({
      rootCommentId,
      articleId,
      fromUserId
    })
    this.getList()
  },
  data: {
    articleId: '',
    rootCommentId: '',
    commentList: [],
    replyList: [],
    replyTotal: 0,
    modalShow: false,
    content: '',
    // 每次点击评论都会重新设置 toUserId 和 parentCommentId
    toUserId: '',
    parentCommentId: ''
  },
  showModal (e) {
    if (getApp().globalData.hasUserInfo) {
      this.setData({
        modalShow: true,
        toUserId: e.detail.fromUserId,
        parentCommentId: e.detail._id
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
          const { rootCommentId, articleId } = this.data
          if(result.confirm){
            wx.switchTab({
              url: `/pages/mine/index`
            })
            getApp().globalData.fromUrl = `/pages/reply/index?commentId=${rootCommentId}&authorId=${articleId}`
          }
        }
      })
    }
  },
  onChange (e) {
    this.setData({
      content: e.detail.value
    })
  },
  async addReply (obj) {
    wx.cloud.callFunction({
      name: 'addComment',
      data: obj
    })
  },
  onSend () {
    const reply = {
      articleId: this.data.articleId,
      content: this.data.content,
      fromUserId: this.data.fromUserId,
      parentCommentId: this.data.parentCommentId,
      rootCommentId: this.data.rootCommentId,
      toUserId: this.data.toUserId
    }
    this.addReply(reply).then(res => {
      this.getList()
      this.setData({
        modalShow: false
      })
    })
  }
})