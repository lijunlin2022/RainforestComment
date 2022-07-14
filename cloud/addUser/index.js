const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const { avatarUrl, nickname } = event
  const db = cloud.database().collection('users')
  return db.add({
    data: {
      openid,
      avatarUrl,
      nickname
    }
  })
}
