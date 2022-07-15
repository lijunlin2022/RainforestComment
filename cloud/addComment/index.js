const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const {
    articleId,
    content,
    fromUserId,
    parentCommentId,
    rootCommentId,
    toUserId
  } = event
  const db = cloud.database().collection('comments')
  const createTime = Date.now()
  return db.add({
    data: {
      articleId,
      content,
      fromUserId,
      parentCommentId,
      rootCommentId,
      toUserId,
      createTime
    }
  })
}
