Component({
  properties: {
    article: {
      type: Object
    }
  },
  methods: {
    copyId () {
      wx.setClipboardData({
        data: this.properties.article._id,
        success () {
          wx.showToast({ title: '复制成功' })
        }
      })
    },
    jumpComments () {
      const { _id: articleId, authorId } = this.properties.article
      wx.navigateTo({
        url: `/pages/comment/index?articleId=${articleId}&authorId=${authorId}`
      })
    }
  }
})
